import { useEffect, useState } from "react"
import { useContactsContext } from "."
import { gql, useQuery } from "@apollo/client"

export const GET_CONTACTS = gql`
  query {
    contact {
      nodes {
        id
        name
      }
    }
  }
`

function useContacts() {
  const { loading, error, data} = useQuery(GET_CONTACTS)

  return {
    loading,
    data : {
      items :data ? data.contact.nodes : []
    }
  }
}

export default useContacts