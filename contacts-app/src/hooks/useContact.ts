import { CONTACT_CONST } from '@/constants'
import { addContactService, getContactsService, updateContactService } from '@/services/api'
import { TContact, TStatus } from '@/types'
import { CreateError, FilterContacts, IsEmpty } from '@/utils'
import { useEffect, useRef, useState } from 'react'

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
	const [openContact, setOpenContact] = useState<TContact>(CONTACT_CONST.INIT_CONTACT)

	const mutateOpenContact = (contact: Partial<TContact>) =>
		setOpenContact(prev => ({ ...prev, ...contact }))
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
			hydrateLocalStates(await getContactsService())
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
	useEffect(() => {
		getLocalStorageContactsRef.current()
	}, [])

	// map the updates by id
	const applyUpdates = (updatedContacts: TContact[]) => {
		// return cachedContacts.map(existingContact => {
		// 	return updatedContacts.find(item => item.id === existingContact.id) ?? existingContact
		// })
		updatedContacts.forEach(itemUpdate => {
			const existingContact = cachedContacts.findIndex(
				existingItem => existingItem.id === itemUpdate.id
			)

			if (existingContact !== -1) {
				// update existing
				cachedContacts.splice(existingContact, 1, itemUpdate)
			} else {
				// add
				cachedContacts.push(itemUpdate)
			}
		})

		return cachedContacts
	}

	// filter Contact list using Cached memory or local storage
	const handleSearch = (searchKey = '') => {
		const isCached = !IsEmpty(searchKey) && !IsEmpty(cachedContacts)
		const searchResult = FilterContacts({
			searchKey,
			contacts: isCached ? cachedContacts : getLocalStorageContacts(),
		})
		setContacts(searchResult)

		return searchResult.length
	}

	// toggle bookmark (isStarred)
	const toggleBookmark = async (id: string) => {
		try {
			const bookMarked = contacts.find(contact => contact.id === id)
			if (bookMarked) {
				bookMarked.isStarred = !bookMarked.isStarred
				bookMarked.modified = new Date()
				hydrateLocalStates(applyUpdates([bookMarked]))

				// to update current opened contact
				mutateOpenContact({ isStarred: !openContact.isStarred })

				// to update the ContactList view
				handleSearch(localStorage.getItem('contact_searchkey') ?? '')

				// commit changes to cloud
				await updateContactService(bookMarked)
			} else {
				// to update current opened contact
				mutateOpenContact({ isStarred: !openContact.isStarred })
			}
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
			const existingContact = contacts.find(contact => contact.id === contactChanges.id)

			// UPDATE ACTION
			if (existingContact) {
				hydrateLocalStates(applyUpdates([contactChanges]))
				// to update the ContactList view
				handleSearch(localStorage.getItem('contact_searchkey') ?? '')
				// commit changes to cloud
				await updateContactService(contactChanges)
			} else {
				// ADD ACTION
				hydrateLocalStates(applyUpdates([contactChanges]))
				handleSearch(localStorage.getItem('contact_searchkey') ?? '')
				await addContactService(contactChanges)
			}

			// run sync to fetch the IDs from Cloud
			sync()
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
		openContact,
		setOpenContact: mutateOpenContact,
		sync,
		commitChanges,
		handleSearch,
		contactsCount: contactsCountRef.current,
		toggleBookmark,
	}
}
