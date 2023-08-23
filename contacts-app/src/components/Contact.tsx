import { ComponentProps, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import '@/assets/modules/Contact.css'
import { TContact, TStatus } from '@/types'
import { BusyIndicator, Header, Item, MenubarContainer, Modal, SearchBar } from '@/components'
import { getContactsService, updateContactService } from '@/services/api'
import { ContactCardContainer } from './ContactCard'
import { CreateError, FilterContacts } from '@/utils'

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
	const [openContact, setOpenContact] = useState<TContact>()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const modalActions = {
		// open Modal form with contact info
		open: (id: string) => {
			const selectedContact = cachedContacts.find(selected => selected.id === id)
			if (selectedContact) setOpenContact(selectedContact)

			setIsOpenModalForm(true)
		},
		close: () => {
			setIsOpenModalForm(false)
		},
		sync: async () => {
			setLoading(true)

			try {
				const contactsFromCloud = await getContactsService()
				hydrateLocalStates(contactsFromCloud)
			} catch (error) {
				setStatus({
					success: false,
					message: CreateError(error).message,
				})
			} finally {
				setLoading(false)
			}
		},
	}

	const getCachedContacts = useCallback(() => {
		if (contactsCountRef.current > 0) return cachedContacts

		let cachedList: TContact[] = []
		const tempContacts = localStorage.getItem('contacts')

		if (tempContacts) {
			try {
				cachedList = JSON.parse(tempContacts)
				hydrateLocalStates(cachedList)
			} catch (error) {
				console.error(CreateError(error).message)
				setStatus({
					success: false,
					message: "We can't access your local copy of Contacts right now. Try the Sync button.",
				})
			}
		} else {
			modalActions.sync()
		}

		return cachedList
	}, [cachedContacts, modalActions])

	useLayoutEffect(() => {
		getCachedContacts()
	}, [getCachedContacts])

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

	const hydrateLocalStates = (contactsUpdate: TContact[]) => {
		// update local states
		setContacts(contactsUpdate)
		setCachedContacts(contactsUpdate)
		// track record count
		contactsCountRef.current = contactsUpdate.length
		// sync to local storage
		localStorage.setItem('contacts', JSON.stringify(contactsUpdate))
	}

	const bookMarkAction = async (id: string) => {
		try {
			const starredContact = contacts.find(contact => contact.id === id)
			if (starredContact) {
				// toggle bookmark (isStarred)
				starredContact.isStarred = !starredContact.isStarred

				hydrateLocalStates(applyUpdates([starredContact]))
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

	// filter Contact list using Cached (session storage) data
	const getSearchResult = (searchKey = '') => {
		const searchResult = searchKey
			? FilterContacts({ searchKey, contacts: cachedContacts })
			: getCachedContacts()
		setContacts(searchResult)

		return searchResult.length
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
			onClick: () => modalActions.open,
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

				<>
					{contactsCountRef.current > 0 && <SearchBar searchCallback={getSearchResult} />}
					<ContactCardContainer
						contacts={contacts}
						actionHandler={{
							bookMark: bookMarkAction,
							openCard: modalActions.open,
						}}
					/>
				</>
			</section>
		</div>
	)
}
