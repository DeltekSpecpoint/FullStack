import { useNavigate } from "react-router-dom"
import { createContact } from "../api"
import ContactsAddEdit from '../components/contact-addedit'

function ContactsAdd() {
  const navigate = useNavigate()

  const handleSubmit = (value) => {
    createContact(value)
    navigate(-1)
  }

  return (
    <ContactsAddEdit
      value={{ name : "" }}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      />
  )
}

export default ContactsAdd