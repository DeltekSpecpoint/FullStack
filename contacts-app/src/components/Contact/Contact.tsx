import '@/assets/modules/Contact.css'
import { BusyIndicator, ContactList, MenubarContainer, Modal } from '@/components'
import useContact from '@/hooks/useContact'
import { useState } from 'react'
import ContactForm from './ContactForm'
import { CONTACT_CONST } from '@/constants'
import { TContact, TFormActions, TModalActions } from '@/types'
import { IsEmpty } from '@/utils'
import useModal from '@/hooks/useModal'

const { EMPTY_CONTACT } = CONTACT_CONST

export function Contact() {
	const {
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
		contactsCount,
		toggleBookmark,
	} = useContact()

	const { isOpen, ...modalProps } = useModal({
		hideCloseIcon: true,
		clickBackdropToClose: false,
	})

	const [formAction, serFormAction] = useState<TFormActions>('Add')

	// open: Modal form for Add/Edit/Delete function or View Card with contact info
	// close: close state, clear the current selected Contact
	// sync: fetch updates from cloud
	const modalActions: TModalActions = {
		open: (id?: string, isEdit = false) => {
			const selectedContact = cachedContacts.find(selected => selected.id === id)

			if (IsEmpty(selectedContact)) {
				// Add
				serFormAction('Add')
				mutateCurrentContact(EMPTY_CONTACT)
				modalProps.openModal()
			} else if (id && selectedContact) {
				// Edit
				serFormAction('Edit')
				mutateCurrentContact(selectedContact)
				if (isEdit) {
					modalProps.openModal()
				}
			}
		},
		close: () => {
			modalProps.closeModal()
			mutateCurrentContact(EMPTY_CONTACT)
		},
		remove,
		commitChanges: (contactUpdate: TContact) => {
			commitChanges(contactUpdate)
			modalProps.closeModal()
		},
		sync,
	}

	// process indicator
	if (loading) return <BusyIndicator title="Please wait..." />

	return (
		<div className="contact-container">
			{isOpen && (
				<Modal {...modalProps}>
					<ContactForm
						formAction={formAction}
						modalActions={modalActions}
						{...{ currentContact, mutateCurrentContact, toggleBookmark }}
					/>
				</Modal>
			)}

			<MenubarContainer
				contactsCount={contactsCount}
				actionHandler={modalActions}
			/>

			<ContactList
				modalActions={modalActions}
				searchCallback={handleSearch}
				toggleBookmark={toggleBookmark}
				{...{ contacts, contactsCount, currentContact, mutateCurrentContact, status }}
			/>
		</div>
	)
}
