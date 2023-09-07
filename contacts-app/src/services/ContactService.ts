import IContactService from "../interfaces/IContactService";
import { TContactInformation, TContactInformationPayload, TContactListResult } from "../types/TContacts";
import axios, { AxiosResponse } from 'axios';

const apiUrl: string = 'https://localhost:44305/api/Contact';
  
class ContactService implements IContactService{

  async getContacts(searchQuery: string, page: number, limit: number, isFavoriteSelected: boolean, sortAscending: boolean): Promise<TContactListResult> {
    const response: AxiosResponse<TContactListResult> = await axios.get(`${apiUrl}/getContacts?searchQuery=${searchQuery}&page=${page}&limit=${limit}&isFavoriteSelected=${isFavoriteSelected}&sortAscending=${sortAscending}`);
    return response.data;
  }

  async getContact(id: number): Promise<TContactInformation> {
    const response: AxiosResponse<TContactInformation> = await axios.get(`${apiUrl}/getContact/${id}`);
    return response.data;
  }

  async addContact(contactInfo: TContactInformationPayload): Promise<string> {
    const response: AxiosResponse<string> = await axios.post(`${apiUrl}/addContact`, contactInfo);
    return response.data;
  }

  async updateContact(id: number, contactInfo: TContactInformationPayload): Promise<string> {
    const response: AxiosResponse<string> = await axios.put(`${apiUrl}/updateContact/${id}`, contactInfo);
    return response.data;
  }

  async deleteContact(id: number): Promise<string> {
    const response: AxiosResponse<string> = await axios.delete(`${apiUrl}/deleteContact/${id}`);
    return response.data;
  }

}

export default ContactService