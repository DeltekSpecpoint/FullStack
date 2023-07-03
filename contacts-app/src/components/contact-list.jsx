function ContactList({ items, onDelete }) {

  const handleDelete = (value) => {
    if (onDelete) onDelete(value)
  }

  return (
    <ul>
      {items.map(item => <ContactListItem value={item} onDelete={value => handleDelete(value)}/>)}
    </ul>
  )
}

function ContactListItem({ value, onDelete }) {

  const handleDelete = () => {
    if (onDelete) onDelete(value)
  }

  return (
    <li>
      {/* render values here */}
      <button onClick={handleDelete}>x</button>
    </li>
  )
}

ContactList.Item = ContactListItem

export default ContactList