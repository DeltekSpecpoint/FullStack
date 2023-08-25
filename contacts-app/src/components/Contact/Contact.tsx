import '@/assets/modules/Contact.css'
import { BusyIndicator, ContactList, MenubarContainer, Modal } from '@/components'
import useContact from '@/hooks/useContact'
import { useState } from 'react'
import ContactForm from './ContactForm'
import { CONTACT_CONST } from '@/constants'

type TActions = 'Add' | 'Edit' | 'Open'
export function Contact() {
	const {
		contacts,
		cachedContacts,
		status,
		loading,
		openContact,
		setOpenContact,
		sync,
		commitChanges,
		handleSearch,
		contactsCount,
		toggleBookmark,
	} = useContact()

	const [isOpenModalForm, setIsOpenModalForm] = useState(false)
	const [formAction, serFormAction] = useState<TActions>('Add')

	// open: Modal form for Add/Edit/Delete function or View Card with contact info
	// close: close state, clear the current selected Contact
	// sync: fetch updates from cloud
	const modalActions = {
		open: (id?: string, isUpdate = false) => {
			if (isUpdate) serFormAction('Edit')

			const selectedContact = cachedContacts.find(selected => selected.id === id)
			if (id && selectedContact && !isUpdate) {
				setOpenContact(selectedContact)
				setIsOpenModalForm(true)
			} else if (id && selectedContact) {
				setOpenContact(selectedContact)
				setIsOpenModalForm(true)
			} else {
				serFormAction('Add')
				setOpenContact(CONTACT_CONST.INIT_CONTACT)

				setIsOpenModalForm(true)
			}
		},
		close: () => {
			setIsOpenModalForm(false)
		},
		commitChanges,
		sync,
	}

	// process indicator
	if (loading) return <BusyIndicator title="Please wait..." />

	return (
		<div className="contact-container">
			<Modal
				isOpen={isOpenModalForm}
				hideCloseIcon={true}
				clickBackdropToClose={false}
				onClose={modalActions.close}
			>
				<ContactForm
					formAction={formAction}
					modalActions={modalActions}
					{...{ openContact, setOpenContact, toggleBookmark }}
				/>
			</Modal>

			<MenubarContainer
				contactsCount={contactsCount}
				actionHandler={modalActions}
			/>

			<ContactList
				modalActions={modalActions}
				searchCallback={handleSearch}
				toggleBookmark={toggleBookmark}
				{...{ contacts, contactsCount, openContact, setOpenContact, status }}
			/>
		</div>
	)
}
