import { TContactInformation, TContactInformationPayload, TContactListResult } from "../types/TContacts";

export default interface IContactService {
    getContacts(searchQuery: string, page: number, limit: number, isFavoriteSelected: boolean, sortAscending: boolean ): Promise<TContactListResult>;
    getContact(id: number): Promise<TContactInformation>;
    addContact(contactInfo: TContactInformationPayload): Promise<string>;
    updateContact(id: number, contactInfo: TContactInformationPayload): Promise<string>;
    deleteContact(id: number): Promise<string>;
}