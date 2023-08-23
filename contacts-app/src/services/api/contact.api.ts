import { TContact } from '@/types'
import { AxiosInstance } from '@/utils'

export async function addContactService(
	newContact: Omit<TContact, 'id' | 'modified'>
): Promise<TContact> {
	return AxiosInstance.post('/contacts', newContact)
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}

export async function getContactsService(): Promise<TContact[]> {
	return AxiosInstance.get('/contacts')
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}

export async function getContactByIdService(id: string): Promise<TContact> {
	return AxiosInstance.get(`/contacts/${id}`)
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}

export async function updateContactService(
	updateContact: Omit<TContact, 'modified'>
): Promise<TContact> {
	return AxiosInstance.put(`/contacts/${updateContact.id}`, updateContact)
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}

export async function deleteContactByIdService(id: string): Promise<TContact> {
	return AxiosInstance.delete(`/contacts/${id}}`)
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}
