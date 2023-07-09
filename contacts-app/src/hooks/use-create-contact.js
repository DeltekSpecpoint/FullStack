import { gql, useMutation } from "@apollo/client"
import { useContactsContext } from "."
import { GET_CONTACTS } from "./use-contacts"

const CREATE_CONTACT = gql`
  mutation createContact($name: String!, $mobileNumber: String!){
    createContact(input: { name: $name, mobileNumber: $mobileNumber }) {
      id
      name
      mobileNumber
    }
  }
`

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