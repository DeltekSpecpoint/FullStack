import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { IContact } from "../store/Contact"

type Props = {
  contact: IContact
  removeContact: (contact: IContact) => void
}

export const Contact: React.FC<Props> = ({ contact, removeContact }) => {
  const dispatch: Dispatch<any> = useDispatch()

  const deleteContact = React.useCallback(
    (contact: IContact) => dispatch(removeContact(contact)),
    [dispatch, removeContact]
  )

  return (
    <tr id="tr-id-1" className="tr-class-1" data-index="0" data-object="{&quot;key&quot;:&quot;value&quot;}"
        data-title="bootstrap table">
        <td>{contact.firstName}</td>
        <td>{contact.middleName}</td>
        <td>{contact.lastName}</td>
        <td>{contact.contactNumber}</td>
        <td>{contact.address}</td>
        <td><button className="btn btn-primary" onClick={() => deleteContact(contact)}>Delete</button></td>
      </tr>
  )
}
