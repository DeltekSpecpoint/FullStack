import * as React from "react"
import { IContact } from "../store/Contact"

type Props = {
  searchContact: (contact: IContact | any) => void
}


export const SearchContact: React.FC<Props> = ({ searchContact }) => {
    const [contact, setContact] = React.useState<IContact | {}>()
  
    const handleContact = (e: React.FormEvent<HTMLInputElement>) => {
      setContact({
        ...contact,
        [e.currentTarget.id]: e.currentTarget.value,
      })
    }
  
    const browseContact = (e: React.FormEvent) => {
      e.preventDefault()
      searchContact(contact)
    }
  
    return (
      <form className="Add-contact" onSubmit={browseContact}>
        <input
          type="text"
          id="firstName"
          placeholder="First Name Only"
          onChange={handleContact}
        />
        <button className="btn btn-primary">Search</button>
      </form>
    )
  }