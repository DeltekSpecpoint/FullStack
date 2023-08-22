import { TContact } from "@/types"
import { AxiosInstance } from "@/utils"

export async function addContactService(
	newContact: Omit<TContact, "id" | "modified">
): Promise<TContact> {
	return AxiosInstance.post("/contacts", newContact)
		.then((res) => res.data)
		.catch((error) => {
			throw error
		})
}

export async function getContactsService(): Promise<TContact[]> {
	try {
		return await AxiosInstance.get("/contacts")
	} catch (error) {
		throw error
	}
}

export async function getContactByIdService(id: string): Promise<TContact> {
	try {
		return await AxiosInstance.get(`/contacts/${id}`)
	} catch (error) {
		throw error
	}
}

export async function updateContactService(
	updateContact: Omit<TContact, "modified">
): Promise<TContact> {
	try {
		return AxiosInstance.put(`/contacts/${updateContact.id}`, updateContact)
	} catch (error) {
		throw error
	}
}

export async function deleteContactByIdService(id: string): Promise<TContact> {
	try {
		return await AxiosInstance.delete(`/contacts/${id}}`)
	} catch (error) {
		throw error
	}
}
