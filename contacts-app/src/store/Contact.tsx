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
    isFetching: boolean,
    isFetchingDetail: boolean,
    contact: IContact,
    isNew: boolean,
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