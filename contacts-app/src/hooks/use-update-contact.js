import { gql, useMutation } from "@apollo/client"
import { GET_CONTACTS } from "./use-contacts"
import { GET_CONTACT } from "./use-contact"

const UPDATE_CONTACT = gql`
  mutation updateContact($id: Int!, $name: String!, $mobileNumber: String){
    updateContact(input: { id: $id, name: $name, mobileNumber: $mobileNumber }) {
      id
      name
      mobileNumber
    }
  }
`

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