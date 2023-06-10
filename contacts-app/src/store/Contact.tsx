export interface IContact {
    contactId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    contactNumber: string;
    address: string;
}

export type ContactState = {
    contacts: any[],
    contact: IContact
  }

export enum ActionTypes
{
    INSERT_CONTACT = "INSERT_CONTACT",
    REMOVE_CONTACT = "REMOVE_CONTACT",
    SEARCH_CONTACT = "SEARCH_CONTACT"
}

export type ContactAction = {
    type: string
    contact: IContact
  }

export type DispatchType = (args: ContactAction) => ContactAction