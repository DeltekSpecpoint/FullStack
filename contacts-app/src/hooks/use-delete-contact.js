import { useMutation } from "@apollo/client"
import { DELETE_CONTACT, GET_CONTACTS } from "../api/graphql"

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