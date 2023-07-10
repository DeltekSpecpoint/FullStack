import { useEffect, useState } from "react"
import { useContactsContext } from "."
import { gql, useQuery } from "@apollo/client"
import { GET_CONTACT } from "../api/graphql"

function useContact(contactId) {
  const { loading, error, data} = useQuery(GET_CONTACT, { variables: { contactId: Number(contactId) }})

  return {
    loading,
    contact: data ? data.contact.nodes[0] : null
  }
}

function useContactRest(id) {
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