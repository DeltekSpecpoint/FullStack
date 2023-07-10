import { useMutation } from "@apollo/client"
import { GET_CONTACT, GET_CONTACTS, UPDATE_CONTACT } from "../api/graphql"

function useUpdateContact() {
  const [update, { data, loading, error }] = useMutation(UPDATE_CONTACT, {
    refetchQueries: [
      GET_CONTACTS,
      GET_CONTACT
    ]
  })

  const handleUpdate = (value) => {
    return update({ variables: value })
  }

  return {
    update: handleUpdate, data, loading, error
  }
}

export default useUpdateContact