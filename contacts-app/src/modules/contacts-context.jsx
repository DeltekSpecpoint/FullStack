import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { getContacts } from '../api'
const ContactsContext = React.createContext()

export function ContactsProvider({ children }) {
  const [items, setItems] = React.useState([])

  const load = () => {
    getContacts().then(response => {
      console.log(response)
      setItems(response.data)
    })
  }

  const handleAdd = (value) => {
    const newId = crypto.randomUUID()
    setItems([
      ...items,
      {
        id: newId,
        ...value
      }
    ])
  }

  const handleEdit = (id, value) => {
    setItems(items.map(c => {
      if (c.id === id) {
        c.name = value.name
      }
      return c
    }))
  }

  const handleDelete = (value) => {
    setItems([...items.filter(c => c.id !== value.id)])
  }

  return (
    <ContactsContext.Provider value={{list: items, load: load, onAdd: handleAdd, onEdit: handleEdit, onDelete: handleDelete}}>
      {children}
    </ContactsContext.Provider>
  )
}

export function useContacts() {
  var contactsCtx = React.useContext(ContactsContext)

  useEffect(() => {
    contactsCtx.load()
  }, [])

  return {
    ...contactsCtx
  }
}