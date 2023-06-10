import * as React from "react"
import { IContact } from "../store/Contact"

type Props = {
  saveContact: (contact: IContact | any) => void
}

export const AddContact: React.FC<Props> = ({ saveContact }) => {
  const [contact, setContact] = React.useState<IContact | {}>()

  const handleContact = (e: React.FormEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const addNewContact = (e: React.FormEvent) => {
    e.preventDefault()
    saveContact(contact)
  }

  return (
    <form onSubmit={addNewContact} className="Add-contact">
      <input
        type="text"
        id="firstName"
        placeholder="First Name"
        onChange={handleContact}
      />
      <input
        type="text"
        id="middleName"
        placeholder="Middle Name"
        onChange={handleContact}
      />
      <input
        type="text"
        id="lastName"
        placeholder="Last Name"
        onChange={handleContact}
      />
      <input
        type="text"
        id="contactNumber"
        placeholder="Contact Number"
        onChange={handleContact}
      />
      <input
        type="text"
        id="address"
        placeholder="Address"
        onChange={handleContact}
      />
      <button className="btn btn-primary">Add Contact</button>
    </form>
  )
}
