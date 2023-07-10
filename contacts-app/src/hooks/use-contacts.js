import { useEffect, useState } from "react"
import { useContactsContext } from "."
import { useQuery } from "@apollo/client"
import { GET_CONTACTS } from "../api/graphql"

function useContacts() {
  const { loading, data, fetchMore, } = useQuery(GET_CONTACTS)
  
  const handleFetchMore = () => {
    if (data) {
      const endCursor = data.contact.pageInfo.endCursor
      
      fetchMore({
        variables: {
          cursor: endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          fetchMoreResult.contact.nodes = [
            ...prev.contact.nodes,
            ...fetchMoreResult.contact.nodes
          ]
          return fetchMoreResult
        }
      });
    }
  }
  return {
    loading,
    data : {
      items :data ? data.contact.nodes : [],
      hasNextPage: data ? data.contact.pageInfo.hasNextPage : false
    },
    fetchMore : handleFetchMore
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