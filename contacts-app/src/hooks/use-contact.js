import { useEffect, useState } from "react"
import { getContactById } from "../api"

function useContact(id) {
  const [contact, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContactById(id).then(d => {
      setData(d)
      setLoading(false)
    })  
  }, [id])

  return {
    loading,
    contact
  }
}

export default useContact