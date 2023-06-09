import { ActionTypes, ContactAction, ContactState, IContact } from "./Contact";
import { Guid } from "guid-typescript";

const initialState: ContactState = {
        contacts: [{ contactId: Guid.create().toString(), firstName: "test1", middleName:"test1", lastName: "test1", contactNumber: "1234567", address: "test 1" },
                   { contactId: Guid.create().toString(), firstName: "test2", middleName:"test2", lastName: "test2", contactNumber: "1234567", address: "test 2" },
                   { contactId: Guid.create().toString(), firstName: "test3", middleName:"test3", lastName: "test3", contactNumber: "8764123", address: "adress 3" },
                   { contactId: Guid.create().toString(), firstName: "test4", middleName:"test4", lastName: "test4", contactNumber: "8764123", address: "adress 4" },
                   { contactId: Guid.create().toString(), firstName: "test5", middleName:"test5", lastName: "test5", contactNumber: "8764123", address: "adress 5" }],
        isFetching: false,
        isFetchingDetail: false,
        contact: { contactId: Guid.createEmpty().toString(), firstName: "", middleName:"", lastName: "", contactNumber: "", address: "" },
        isNew: false
  };


  const reducer = (state: ContactState = initialState, action: ContactAction): ContactState => {
    switch (action.type) 
    {
      case ActionTypes.INSERT_CONTACT:
        const newContact: IContact = {
          contactId: Guid.create().toString(),
          firstName: action.contact.firstName,
          middleName: action.contact.middleName,
          lastName: action.contact.lastName,
          contactNumber: action.contact.contactNumber,
          address: action.contact.address
        }
        return {
          ...state,
          contacts: state.contacts.concat(newContact),
        }
        case ActionTypes.REMOVE_CONTACT:
            const updatedContacts: IContact[] = state.contacts.filter(
              contact => contact.contactId !== action.contact.contactId
            )
            return {
              ...state,
              contacts: updatedContacts,
            }
        case ActionTypes.SEARCH_CONTACT:
            const searchContacts: IContact[] = state.contacts.filter(
                contact => contact.firstName === action.contact.firstName
            )
            return {
                ...state,
                contacts: searchContacts
            }
    }

    return state
  }
  
  export default reducer