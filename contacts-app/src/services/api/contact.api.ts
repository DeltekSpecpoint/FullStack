import { TContact } from '@/types'
import { AxiosInstance } from '@/utils'

export async function addContactService(
	newContact: Omit<TContact, 'id' | 'modified'>
): Promise<TContact> {
	return await AxiosInstance.post('/contacts', newContact)
}

export async function getContactsService(): Promise<TContact[]> {
	return AxiosInstance.get('/contacts')
}

export async function getContactByIdService(id: string): Promise<TContact> {
	return await AxiosInstance.get(`/contacts/${id}`)
}

export async function updateContactService(
	updateContact: Omit<TContact, 'modified'>
): Promise<TContact> {
	return await AxiosInstance.put(`/contacts/${updateContact.id}`, updateContact)
}

export async function deleteContactByIdService(id: string): Promise<TContact> {
	return await AxiosInstance.delete(`/contacts/${id}}`)
}
