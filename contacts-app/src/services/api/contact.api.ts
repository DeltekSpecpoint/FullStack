import { TContact } from '@/types'
import { AxiosInstance } from '@/utils'

async function createOne(newContact: TContact): Promise<TContact> {
	return await AxiosInstance.post('/contacts', newContact)
}

async function getAll(): Promise<TContact[]> {
	return AxiosInstance.get('/contacts')
}

async function getById(id: string): Promise<TContact> {
	return await AxiosInstance.get(`/contacts/${id}`)
}

async function updateOne(updateContact: TContact): Promise<TContact> {
	return await AxiosInstance.put(`/contacts/${updateContact.id}`, updateContact)
}

async function deleteById(id: string): Promise<TContact> {
	return await AxiosInstance.delete(`/contacts/${id}`)
}

export const ContactService = {
	getAll,
	getById,
	createOne,
	updateOne,
	deleteById,
}
