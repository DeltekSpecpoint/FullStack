import { useEffect, useState } from "react"
import { useContactsContext } from "."
import { useQuery } from "@apollo/client"
import { GET_CONTACTS } from "../api/graphql"

function useContacts() {
  const { loading, data} = useQuery(GET_CONTACTS)

  return {
    loading,
    data : {
      items :data ? data.contact.nodes : []
    }
  }
}

export function useContactsRest() {
  const { state: data, loadContacts } = useContactsContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContacts().then(() => {
      setLoading(false)
    })
  }, [])

  return {
    loading,
    data
  }
}

export default useContacts