import React from 'react'
import ContactList from "../components/contact-list";
import ContactSearchForm from "../components/contact-search-form";
import { NavLink, redirect } from 'react-router-dom';
import { useContacts } from './contacts-context'
function Contacts({
  items,
  onSearch,
  onDelete
}) {

  const handleSearchSubmit = (query) => {
    if (onSearch) onSearch(query)
  }

  return (
    <div>
      <h1>Contacts</h1>
      <div>
        <NavLink to={`add`}>Add</NavLink>
      </div>
      <ContactSearchForm onSubmit={handleSearchSubmit}/>
      <ContactList items={items} onDelete={onDelete}/>
    </div>
  )
}

function ContactsMaintenance() {
  const { list: items, onDelete } = useContacts()
  const [query, setQuery] = React.useState("")

  const handleOnSearch = (q) => {
    setQuery(q)
  }

  const handleDelete = (id) => {
    onDelete(id)
  }

  let filteredItems = items

  if (query) {
    filteredItems = items.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
  }

  return (
    <Contacts 
      items={filteredItems} 
      onSearch={handleOnSearch}
      onDelete={handleDelete}
      />
  )
}

export default ContactsMaintenance