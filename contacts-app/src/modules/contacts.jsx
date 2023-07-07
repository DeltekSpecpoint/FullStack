import React, { useEffect } from 'react'
import ContactList from "../components/contact-list";
import ContactSearchForm from "../components/contact-search-form";
import { NavLink, redirect, useLoaderData } from 'react-router-dom';
import { useContacts } from './contacts-context'
import { deleteContact, getContacts } from '../api';
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

export async function loader() {
  const contacts = await getContacts()
  
  return { contacts }
}

function ContactsMaintenance() {
  // const { list: items, onDelete } = useContacts()
  const [query, setQuery] = React.useState("")
  const { contacts } = useLoaderData()

  const handleOnSearch = (q) => {
    setQuery(q)
  }

  const handleDelete = (value) => {
    // onDelete(id)
    deleteContact(value.id)
  }

  let filteredItems = contacts

  if (query) {
    filteredItems = contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
  }

  return (
    <Contacts 
      items={contacts.data} 
      onSearch={handleOnSearch}
      onDelete={handleDelete}
      />
  )
}

export default ContactsMaintenance