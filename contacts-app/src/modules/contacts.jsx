import React from 'react'
import ContactList from "../components/contact-list";
import ContactSearchForm from "../components/contact-search-form";

const contactsData = [
  {
    id: 1,
    name: "Joel Manuel"
  },
  {
    id: 2,
    name: "Juan Dela Cruz"
  }
]

function Contacts({
  items,
  onAdd,
  onSearch
}) {

  const handleSearchSubmit = (query) => {
    if (onSearch) onSearch(query)
  }

  return (
    <div>
      <h1>Contacts</h1>
      <div>
        <button onClick={onAdd}>Add</button>
      </div>
      <ContactSearchForm onSubmit={handleSearchSubmit}/>
      <ContactList items={items}/>
    </div>
  )
}

function ContactsMaintenance() {
  const [items, setItems] = React.useState(contactsData)
  const [query, setQuery] = React.useState("")

  const handleOnSearch = (q) => {
    setQuery(q)
  }

  let filteredItems = items

  if (query) {
    filteredItems = items.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
  }

  return (
    <Contacts items={filteredItems} onSearch={handleOnSearch}/>
  )
}

export default ContactsMaintenance;