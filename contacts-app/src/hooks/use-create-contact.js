import { gql, useMutation } from "@apollo/client"
import { useContactsContext } from "."
import { CREATE_CONTACT, GET_CONTACTS } from "../api/graphql"

function useCreateContact() {
  const [create, { data, loading, error }] = useMutation(CREATE_CONTACT, {
    refetchQueries: [
      GET_CONTACTS
    ]
  })

  const handleCreate = (value) => {
    return create({ variables: value })
  }

  return {
    create: handleCreate, data, loading, error
  }
}

export default useCreateContact