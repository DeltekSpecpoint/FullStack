import { useEffect, useState } from "react"
import { useContactsContext } from "."

function useContacts() {
  const { state: data, loadContacts } = useContactsContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContacts().then(() => {
      setLoading(false)
    })
  }, [loadContacts])

  return {
    loading,
    data
  }
}

export default useContacts