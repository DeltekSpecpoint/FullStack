
import { ActionTypes, ContactAction, ContactState, DispatchType, IContact } from "./Contact"

export const addContact = (contact: IContact) => async (dispatch: DispatchType) =>
{
    await _saveContact(contact, dispatch);
}

const _saveContact = async (contact: IContact, dispatch: DispatchType) =>
{
    const action: ContactAction = {
      type: ActionTypes.INSERT_CONTACT,
      contact
    };

    const method = "POST";
    const href = "http://localhost:5000/api/Contact/";
    const data = JSON.stringify(contact);

    const response = await fetch(href, { 
      	method: 'POST', 
      	body: data,
      	headers: {
      		'Accept': 'application/json',
      		'Content-Type': 'application/json'
      	  }
      }).then(() => { dispatch(action); });
}

export function removeContact(contact: IContact) {
    const action: ContactAction = {
      type: ActionTypes.REMOVE_CONTACT,
      contact
    }
   
    return dispatchAction(action)  
  }

export function searchContact(contact: IContact) {
    const action: ContactAction = {
      type: ActionTypes.SEARCH_CONTACT,
      contact,
    }
    return dispatchAction(action)
}


export function dispatchAction(action: ContactAction) {
  return (dispatch: DispatchType) => {
      dispatch(action)
  }
}
