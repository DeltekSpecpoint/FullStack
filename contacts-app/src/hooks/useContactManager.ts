import { TContact } from '@/types'
import { IsEmpty } from '@/utils'

type TContactKey = keyof TContact
interface IFilterContacts {
	searchKey: string
	isStarred?: boolean
	contacts: TContact[]
	ignoredProps?: TContactKey[]
}
export function useContactManager(contactsArray: TContact[]) {
	const ContactsManager = () => {
		const _contacts = contactsArray.slice()

		const equalId = (contacts: TContact, id: string) => contacts.id === id
		const notEqualId = (contacts: TContact, id: string) => contacts.id !== id

		return {
			getAll: () => _contacts,
			getAllExcludingId: (id: string) => _contacts.filter(contact => notEqualId(contact, id)),
			getById: (id: string) => _contacts.find(contact => equalId(contact, id)),
			getIndexById: (id: string) => _contacts.findIndex(contact => equalId(contact, id)),
			addOne: (addContact: TContact) => {
				// TODO: assign temp id for offline transaction: this should be UID
				addContact.id = addContact.id ? addContact.id : Math.floor(Math.random() * 16).toString(16)
				_contacts.unshift(addContact)
				return addContact
			},
			updateOne: (contactUpdate: TContact) => {
				contactUpdate.modified = new Date()
				const idx = _contacts.findIndex(contact => equalId(contact, contactUpdate.id))
				if (idx !== -1) {
					_contacts.splice(idx, 1, contactUpdate)
					return contactUpdate
				}

				throw new Error('Contact id not found.')
			},
			deleteOne: (id: string) => {
				const idx = _contacts.findIndex(contact => equalId(contact, id))
				if (idx !== -1) {
					_contacts.splice(idx, 1)
					return _contacts.find(contact => equalId(contact, id))
				}
				throw new Error('Contact id not found.')
			},
		}
	}

	/* 
	filter by matching Contact's keys/props of type String,
	AND using "ignoredProps" to ignore further matching
	include starred filter criteria if available
	*/
	const filterContacts = ({
		searchKey,
		isStarred = false,
		contacts,
		ignoredProps = ['id', 'modified', 'isStarred'],
	}: IFilterContacts): TContact[] => {
		if (IsEmpty(contacts)) return []

		if (isStarred && IsEmpty(searchKey)) return contacts.filter(item => item.isStarred)

		if (IsEmpty(searchKey)) return contacts

		const searchTerm = searchKey.trim().toLowerCase()

		const filterBySearchTerm = (currContact: TContact) => {
			// filter true if we found search term(s) on each Contact,
			// filter out, otherwise
			return Object.keys(currContact).some(key => {
				const attribute = key as TContactKey

				// skip filter using "ignoredProps"
				if (ignoredProps.includes(attribute)) return false

				const currAttributeValue = currContact[attribute]

				// look for "string" types only beyond this block
				if (typeof currAttributeValue === 'string') {
					const attributeValue = currAttributeValue.toLowerCase()
					const searchTerms = searchTerm
						.split(' ')
						.map(term => term.trim().toLowerCase())
						.filter(term => term !== '')

					// match each word of searchTerm
					if (searchTerms.length > 1) return searchTerms.some(term => attributeValue.includes(term))
					// exact searchTerm
					return attributeValue.includes(searchTerm)
				}
			})
		}

		return contacts.filter(filterItem =>
			isStarred
				? filterItem.isStarred && filterBySearchTerm(filterItem)
					? true
					: false
				: filterBySearchTerm(filterItem)
		)
	}

	return {
		ContactList: ContactsManager(),
		filterContacts,
	}
}
