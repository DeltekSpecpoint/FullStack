import React from 'react'

const ContactsContext = React.createContext()

export function ContactsProvider({ children }) {
  const [items, setItems] = React.useState([...contactsData])

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
    <ContactsContext.Provider value={{list: items, onAdd: handleAdd, onEdit: handleEdit, onDelete: handleDelete}}>
      {children}
    </ContactsContext.Provider>
  )
}

export function useContacts() {
  return React.useContext(ContactsContext)
}

const contactsData = [
  {
    id: crypto.randomUUID(),
    name: "Joel Manuel"
  },
  {
    id: crypto.randomUUID(),
    name: "Juan Dela Cruz"
  }
]