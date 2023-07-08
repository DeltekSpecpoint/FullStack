import { useEffect, useState } from "react"
import { getContactById, updateContact, deleteContact } from "../api"
import { useContactsContext } from "."

function useContact(id) {
  const { state: data, update, remove, create } = useContactsContext()
  const [contact, setContact] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data.items[id]) {
      setContact(data.items[id])
      setLoading(false)
    }
  }, [id, data])

  return {
    loading,
    contact,
    update,
    remove,
    create
  }
}

export default useContact