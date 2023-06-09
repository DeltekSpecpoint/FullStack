import * as React from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { ContactState, IContact } from "../store/Contact"
import { AddContact } from "./AddContact"
import { addContact, removeContact, searchContact } from "../store/actions"
import { Contact } from "./Contact"
import "../index.css";
import ColumnHeader from "./ColumnHeader"
import { SearchContact } from "./SearchContact"

const App: React.FC = () => {
  const contacts: readonly IContact[] = useSelector(
    (state: ContactState) => state.contacts,
    shallowEqual
  )

  const dispatch: Dispatch<any> = useDispatch()

  const saveContact = React.useCallback(
    (contact: IContact) => dispatch(addContact(contact)),
    [dispatch]
  )

  const browseContact = React.useCallback(
    (contact: IContact) => dispatch(searchContact(contact)),
    [dispatch]
  )

  return (
    <main>
      <h1>Contact App</h1>
      <AddContact saveContact={saveContact} />
      <SearchContact searchContact={browseContact} />
      <ColumnHeader children={ contacts.map((contact: IContact) => (
        <Contact
          key={contact.contactId}
          contact={contact}
          removeContact={removeContact}
        />
      ))} />
    </main>
  )
}

export default App