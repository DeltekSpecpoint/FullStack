import { useLayoutEffect, useRef, useState } from 'react'
import { TContact, TPartialEntity, TStatus } from '@/types'
import { ContactService } from '@/services/api'
import { CreateError, IsEmpty } from '@/utils'
import { CONTACT_CONST } from '@/constants'
import { useContactController } from './useContactController'

const { EMPTY_CONTACT } = CONTACT_CONST

export default function useContact() {
	const [contacts, setContacts] = useState<TContact[]>([])
	const [cachedContacts, setCachedContacts] = useState<TContact[]>([])
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState<TStatus>({
		success: false,
		message: '',
	})
	const contactsCountRef = useRef(0)
	const timerIdRef = useRef<NodeJS.Timeout>()
	const [currentContact, setCurrentContact] = useState<TContact>(EMPTY_CONTACT)
	const { ContactList: CachedContactList, filterContacts } = useContactController(cachedContacts)

	const mutateCurrentContact = (contact: TPartialEntity<TContact>) =>
		setCurrentContact(prev => ({ ...prev, ...contact }))

	// reset/clear status notification
	const startCountdownReset = () => {
		if (timerIdRef) {
			timerIdRef.current = setTimeout(() => {
				setStatus({ success: false, message: '' })
				clearTimeout(timerIdRef.current)
				timerIdRef.current = undefined
			}, 5000)
		}
	}

	const updateStatus = (status: TStatus) => {
		setStatus(status)
		startCountdownReset()
	}

	// update Contacts state
	// set cache to local storage
	const hydrateLocalStates = (contactsUpdate: TContact[]) => {
		setContacts(contactsUpdate)
		setCachedContacts(contactsUpdate)
		// track record count
		contactsCountRef.current = contactsUpdate.length
		localStorage.setItem('contacts', JSON.stringify(contactsUpdate))
	}

	// fetch Contacts from Cloud and update localStorage/cache, then hydrate
	const sync = async () => {
		setLoading(true)

		try {
			hydrateLocalStates(await ContactService.getAll())
			setLoading(false)

			updateStatus({
				success: true,
				message: 'Contacts are now up to date.',
			})
		} catch (error) {
			setLoading(false)

			updateStatus({
				success: false,
				message: CreateError(error).message,
			})
		}
	}

	// get cached Contacts if there's any, fetch to the cloud otherwise
	const getLocalStorageContacts = () => {
		let cachedList: TContact[] = []
		const localStorageContacts = localStorage.getItem('contacts')

		if (localStorageContacts) {
			try {
				cachedList = JSON.parse(localStorageContacts)
				hydrateLocalStates(cachedList)
			} catch (error) {
				console.error(CreateError(error).message)
				updateStatus({
					success: false,
					message: "We can't access offline copy of your Contacts right now. Try the Sync button.",
				})
			}
		} else {
			sync()
		}

		return cachedList
	}
	const getLocalStorageContactsRef = useRef(getLocalStorageContacts)

	// side-effect to fetch Contacts from Cached or to Cloud
	useLayoutEffect(() => {
		getLocalStorageContactsRef.current()
	}, [])

	// create a new copy of Contacts with the updates
	const createContactsUpdate = (updatedContacts: TContact[]) => {
		for (const itemUpdate of updatedContacts) {
			if (CachedContactList.getById(itemUpdate.id)) {
				// update existing
				CachedContactList.updateOne(itemUpdate)
			} else {
				// add one to beginning of the list
				CachedContactList.addOne(itemUpdate)
			}
		}
		return CachedContactList.getAll()
	}

	// filter Contact list using Cached memory or local storage
	const handleSearch = (searchKey = '', isStarred = false) => {
		searchKey = searchKey ? searchKey : localStorage.getItem('contact_searchkey') || ''
		isStarred = isStarred ? isStarred : localStorage.getItem('contact_bookmark') === 'true'

		const isCached = !IsEmpty(cachedContacts)
		const searchResult = filterContacts({
			searchKey,
			isStarred,
			contacts: isCached ? cachedContacts : getLocalStorageContacts(),
		})
		setContacts(searchResult)

		return searchResult.length
	}

	// toggle bookmark (isStarred)
	const toggleBookmark = async (id: string) => {
		try {
			const bookMarked = CachedContactList.getById(id)
			if (bookMarked) {
				bookMarked.isStarred = !bookMarked.isStarred
				hydrateLocalStates(createContactsUpdate([bookMarked]))

				// to update the ContactList view
				handleSearch()

				// commit changes to cloud
				await ContactService.updateOne(bookMarked)
			}
			// to update current opened contact
			mutateCurrentContact({ isStarred: !currentContact.isStarred })
		} catch (error) {
			updateStatus({
				success: false,
				message: 'Something went wrong persist to cloud update.',
			})
		}
	}

	// Add/Edit Contact handlers
	const commitChanges = async (contactChanges: TContact) => {
		try {
			hydrateLocalStates(createContactsUpdate([contactChanges]))
			// searchKey available? then, update ContactList
			handleSearch(localStorage.getItem('contact_searchkey') ?? '')

			// commit changes to cloud
			if (!IsEmpty(contactChanges.id) && CachedContactList.getById(contactChanges.id)) {
				// UPDATE ACTION
				await ContactService.updateOne(contactChanges)
			} else {
				// ADD ACTION
				await ContactService.createOne(contactChanges)

				// run sync to fetch the IDs from Cloud
				await sync()
			}
		} catch (error) {
			updateStatus({
				success: false,
				message: 'Something went wrong persist to cloud update.',
			})
		}
	}

	// Delete Contact
	const remove = async (id: string) => {
		try {
			if (CachedContactList.getById(id)) {
				hydrateLocalStates(CachedContactList.getAllExcludingId(id))

				// to update the ContactList view
				handleSearch(localStorage.getItem('contact_searchkey') ?? '')

				// commit changes to cloud
				await ContactService.deleteById(id)
			}
		} catch (error) {
			updateStatus({
				success: false,
				message: 'Something went wrong persist to cloud update.',
			})
		}
	}

	return {
		contacts,
		cachedContacts,
		status,
		loading,
		currentContact,
		mutateCurrentContact,
		sync,
		remove,
		commitChanges,
		handleSearch,
		contactsCount: contactsCountRef.current,
		toggleBookmark,
	}
}
