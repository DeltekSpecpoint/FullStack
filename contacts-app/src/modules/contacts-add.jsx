import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import ContactForm from "../components/contact-form"
import { useContacts } from "./contacts-context"

function ContactsAdd({
  value,
  onSubmit,
  onCancel
}) {
  return (
    <div>
      Add Contact
      <ContactForm value={value} onSubmit={onSubmit}>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>cancel</button>
      </ContactForm>
    </div>
  )
}

function ContactsAddContainer() {
  const navigate = useNavigate()
  const params = useParams()
  const { list, onAdd, onEdit } = useContacts()

  const handleSubmit = (value) => {
    if (params && params.id) {
      onEdit(params.id, value)
    } else {
      onAdd(value)
    }
    navigate(-1)
  }

  const defaultValue = {
    name: ""
  }

  if (params && params.id) {
    const contact = list.find(c => c.id === params.id)
    defaultValue.name = contact.name
  }

  return (
    <ContactsAdd
      value={defaultValue}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      />
  )
}

export default ContactsAddContainer