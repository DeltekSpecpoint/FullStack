import React, { useEffect } from 'react'
import ContactList from "../components/contact-list";
import ContactSearchForm from "../components/contact-search-form";
import { NavLink, redirect, useLoaderData } from 'react-router-dom';
import { useContacts } from './contacts-context'
import { deleteContact, getContacts } from '../api';
import { Button, Fab, Link } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
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
      <ContactSearchForm onSubmit={handleSearchSubmit}/>
      <ContactList items={items} onDelete={onDelete}/>
      <Fab component={NavLink} to='add' sx={{ position: "absolute", bottom: 16, right: 16 }} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
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

  let filteredItems = contacts.data

  if (query) {
    filteredItems = filteredItems.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
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