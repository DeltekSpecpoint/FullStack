import { useNavigate } from "react-router-dom"
import ContactForm from "../components/contact-form"

function ContactsAdd({
  onSubmit,
  onCancel
}) {
  return (
    <div>
      Add Contact
      <ContactForm onSubmit={onSubmit}>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>cancel</button>
      </ContactForm>
    </div>
  )
}

function ContactsAddContainer() {
  const navigate = useNavigate()

  const handleSubmit = (value) => {
    console.log('submitted', value)
  }

  return (
    <ContactsAdd
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      />
  )
}

export default ContactsAddContainer