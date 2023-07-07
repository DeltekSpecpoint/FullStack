import ContactForm from "./contact-form"

function ContactsAddEdit({
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

export default ContactsAddEdit