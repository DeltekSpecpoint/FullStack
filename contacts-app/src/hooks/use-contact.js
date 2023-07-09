import { useEffect, useState } from "react"
import { useContactsContext } from "."
import { gql, useQuery } from "@apollo/client"

export const GET_CONTACT = gql`
  query getContactById($contactId: Int){
    contact(where: { id: { eq: $contactId }}) {
      nodes {
        id
        name
        mobileNumber
      }
    }
  }
`



function useContact(contactId) {
  const { loading, error, data} = useQuery(GET_CONTACT, { variables: { contactId: Number(contactId) }})

  return {
    loading,
    contact: data ? data.contact.nodes[0] : null
  }
}

// function useContact(id) {
//   const { state: data, update, remove, create } = useContactsContext()
//   const [contact, setContact] = useState()
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (data.items[id]) {
//       setContact(data.items[id])
//       setLoading(false)
//     }
//   }, [id, data])

//   return {
//     loading,
//     contact,
//     update,
//     remove,
//     create
//   }
// }

export default useContact