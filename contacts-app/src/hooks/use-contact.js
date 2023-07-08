import { useEffect, useState } from "react"
import { getContactById, updateContact, deleteContact } from "../api"

function useContact(id) {
  const [contact, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContactById(id)
      .then(d => {
        setData(d)
        setLoading(false)
      })  
  }, [id])

  const update = (data) => {
    updateContact(data.id, data)
      .then(d => setData(d))
  }

  return {
    loading,
    contact,
    update
  }
}

export default useContact