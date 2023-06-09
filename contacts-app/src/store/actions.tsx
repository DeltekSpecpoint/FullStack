
import { ActionTypes, ContactAction, DispatchType, IContact } from "./Contact"

export function addContact(contact: IContact) {
  const action: ContactAction = {
    type: ActionTypes.INSERT_CONTACT,
    contact
  }
  return dispatchAction(action)
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
