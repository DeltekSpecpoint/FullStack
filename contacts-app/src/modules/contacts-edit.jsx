import { useNavigate, useParams, useLoaderData } from 'react-router-dom'
import { getContactById, updateContact } from '../api'
import ContactsAddEdit from "../components/contact-addedit"

export async function loader({ params }) {
  const contact = await getContactById(params.id)
  
  return { contact }
}

function ContactsEdit() {
  const navigate = useNavigate()
  const params = useParams()
  const { contact } = useLoaderData()

  const handleSubmit = (value) => {
    updateContact(params.id, value)
    navigate('/')
  }

  const defaultValue = {
    name: ""
  }

  if (params && params.id && contact) {
    defaultValue.name = contact.name
    defaultValue.mobileNumber = contact.mobileNumber
  }

  return (
    <ContactsAddEdit
      value={defaultValue}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      />
  )
}

export default ContactsEdit