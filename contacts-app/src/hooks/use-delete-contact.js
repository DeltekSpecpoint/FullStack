import { gql, useMutation } from "@apollo/client"
import { GET_CONTACTS } from "./use-contacts"

const DELETE_CONTACT = gql`
  mutation deleteContact($id: Int!){
    deleteContact(input: { id: $id }) {
      id
    }
  }
`

function useRemoveContact() {
  const [remove, { data, loading, error }] = useMutation(DELETE_CONTACT, {
    refetchQueries: [
      GET_CONTACTS
    ]
  })

  const handleDelete = (id) => {
    return remove({ variables: { id: Number(id) } })
  }

  return {
    remove: handleDelete, data, loading, error
  }
}

export default useRemoveContact