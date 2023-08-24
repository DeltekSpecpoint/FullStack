import { ComponentProps, useEffect, useRef, useState } from 'react'
import '@/assets/modules/Contact.css'
import { TContact, TStatus } from '@/types'
import {
	BusyIndicator,
	ContactCard,
	Header,
	Item,
	MenubarContainer,
	Modal,
	SearchBar,
} from '@/components'
import { getContactsService, updateContactService } from '@/services/api'
import { CardListContainer } from './Card'
import { CreateError, FilterContacts, IsEmpty } from '@/utils'
import { CONTACT_CONST } from '@/constants'

export function Contact() {
	const [contacts, setContacts] = useState<TContact[]>([])
	const [cachedContacts, setCachedContacts] = useState<TContact[]>([])
	const [isOpenModalForm, setIsOpenModalForm] = useState(false)
	const [loading, setLoading] = useState(false)
	const [{ success, message }, setStatus] = useState<TStatus>({
		success: false,
		message: '',
	})
	const contactsCountRef = useRef(0)
	const [openContact, setOpenContact] = useState<TContact>(CONTACT_CONST.INIT_CONTACT)

	// update Contacts state
	// set cache to local storage
	const hydrateLocalStates = (contactsUpdate: TContact[]) => {
		setContacts(contactsUpdate)
		setCachedContacts(contactsUpdate)
		// track record count
		contactsCountRef.current = contactsUpdate.length
		localStorage.setItem('contacts', JSON.stringify(contactsUpdate))
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	// open: Modal form for Add/Edit/Delete function or View Card with contact info
	// close: close state, clear the current selected Contact
	// sync: fetch Contacts from Cloud and update localStorage/cache, then hydrate
	const modalActions = {
		open: (id?: string) => {
			const selectedContact = cachedContacts.find(selected => selected.id === id)
			if (id && selectedContact) {
				setOpenContact(selectedContact)
			} else {
				// TODO: implement Add/Edit modal form here
				setIsOpenModalForm(true)
			}
		},
		close: () => {
			setIsOpenModalForm(false)
		},
		sync: async () => {
			setLoading(true)

			try {
				hydrateLocalStates(await getContactsService())
				setLoading(false)

				setStatus({
					success: true,
					message: 'Contacts are now up to date.',
				})
			} catch (error) {
				setLoading(false)

				setStatus({
					success: false,
					message: CreateError(error).message,
				})
			}
		},
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
				setStatus({
					success: false,
					message: "We can't access offline copy of your Contacts right now. Try the Sync button.",
				})
			}
		} else {
			modalActions.sync()
		}

		return cachedList
	}
	const getLocalStorageContactsRef = useRef(getLocalStorageContacts)

	// side-effect to fetch Contacts from Cached or to Cloud
	useEffect(() => {
		getLocalStorageContactsRef.current()
	}, [])

	// side-effect to reset/clear status notification
	useEffect(() => {
		setTimeout(() => {
			setStatus({ success: false, message: '' })
		}, 5000)
	}, [success, message])

	// map the updates by id
	const applyUpdates = (updatedContacts: TContact[]) => {
		return cachedContacts.map(existingContact => {
			return updatedContacts.find(item => item.id === existingContact.id) ?? existingContact
		})
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
	const bookMarkAction = async (id: string) => {
		try {
			const starredContact = contacts.find(contact => contact.id === id)
			if (starredContact) {
				starredContact.isStarred = !starredContact.isStarred
				hydrateLocalStates(applyUpdates([starredContact]))
				// to update the ContactList view
				handleSearch(localStorage.getItem('contact_searchkey') ?? '')

				// commit changes to cloud
				await updateContactService(starredContact)
			}
		} catch (error) {
			console.error(CreateError(error).message)
			setStatus({
				success: false,
				message: 'Something went wrong persist to cloud update.',
			})
		}
	}

	// process indicator
	if (loading) return <BusyIndicator title="Please wait..." />

	// add/provide for menu details here
	const menus: Partial<ComponentProps<typeof Item>>[] = [
		{
			title: 'Add Contact',
			iconName: 'fa fa-plus',
			animation: 'fa fa-beat-fade',
			animateOnLoad: contactsCountRef.current > 0 ? false : true,
			onClick: () => modalActions.open(),
		},
		{
			title: 'Sync Contacts',
			iconName: 'fa fa-arrows-rotate',
			animation: 'fa fa-spin',
			onClick: () => modalActions.sync(),
		},
	]

	return (
		<div className="contact-container">
			<Modal
				isOpen={isOpenModalForm}
				hideCloseIcon={false}
				clickBackdropToClose={false}
				onClose={modalActions.close}
			>
				<pre>{JSON.stringify(openContact, null, 2)}</pre>
			</Modal>

			<MenubarContainer {...{ menus }} />

			<section className="form-container">
				{contactsCountRef.current > 0 ? (
					<Header>
						<Header.Logo />
						<Header.Title title="Contacts" />
						<p className="small disabled scale-up">{`${contactsCountRef.current} saved Contacts.`}</p>
						<Header.Status status={{ success, message }} />
					</Header>
				) : (
					<Header>
						<Header.Title
							title="No Contacts"
							subTitle='click "+" to create one'
						/>
						{success || !message ? (
							// eslint-disable-next-line react/no-unescaped-entities
							<p className="x-small disabled scale-up">Contacts you've added will appear here.</p>
						) : (
							<Header.Status status={{ success, message }} />
						)}
					</Header>
				)}

				{!IsEmpty(openContact) ? (
					<ContactCard
						onOpen={() => setOpenContact(CONTACT_CONST.INIT_CONTACT)}
						onBookMark={bookMarkAction}
						{...openContact}
					/>
				) : (
					<>
						{contactsCountRef.current > 0 && <SearchBar searchCallback={handleSearch} />}
						<CardListContainer
							contacts={contacts}
							actionHandler={{
								onBookMark: bookMarkAction,
								onOpen: modalActions.open,
							}}
						/>
					</>
				)}
			</section>
		</div>
	)
}
