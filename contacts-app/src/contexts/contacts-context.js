import { useContext, useState } from "react";
import { createContext } from "react";
import { deleteContact, getContacts, updateContact } from "../api";

export const ContactsContext = createContext()

const defaultState = {
  data: {
    items: { },
    currentPage: 1,
    pageSize: 10
  }
}

export function ContactsProvider({ children }) {
  const [data, setData] = useState(defaultState)

  const loadContacts = (page, pageSize, ) => {
    return getContacts().then(d => {

      let items = {};
      for (let item of d.data) {
        items[item.id] = item
      }

      setData({
        items,
        page: d.page,
        pageSize: d.pageSize,
        totalCount: d.totalRecordCount
      })
    })  
  }

  const update = (value) => {
    return updateContact(value.id, value)
      .then(d => {
        console.log(d)
        setData({
          ...data,
          items: {
            ...data.items,
            [value.id]: {
              ...d
            }
          }
        })
      })
  }

  const remove = (id) => {
    return deleteContact(id)
      .then(() => {
        const items = data.items
        delete items[id]

        setData({
          ...data,
          items: {
            ...items
          }
        })
      })
  }

  return (
    <ContactsContext.Provider value={{ state: data, loadContacts, update, remove }}>
      {children}
    </ContactsContext.Provider>
  )
}