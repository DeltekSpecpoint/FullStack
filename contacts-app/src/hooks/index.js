import React from 'react'
import { ContactsContext } from "../contexts/contacts-context";

export const useContactsContext = () => {
  return React.useContext(ContactsContext)
}