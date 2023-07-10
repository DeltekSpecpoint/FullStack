import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql/',
  cache: new InMemoryCache(),
});

export const GET_CONTACTS = gql`
  query GetContacts($cursor: String) {
    contact(after: $cursor) {
      nodes {
        id
        name
        mobileNumber
      },
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

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

export const CREATE_CONTACT = gql`
  mutation createContact($name: String!, $mobileNumber: String!){
    createContact(input: { name: $name, mobileNumber: $mobileNumber }) {
      id
      name
      mobileNumber
    }
  }
`

export const DELETE_CONTACT = gql`
  mutation deleteContact($id: Int!){
    deleteContact(input: { id: $id }) {
      id
    }
  }
`

export const UPDATE_CONTACT = gql`
  mutation updateContact($id: Int!, $name: String!, $mobileNumber: String){
    updateContact(input: { id: $id, name: $name, mobileNumber: $mobileNumber }) {
      id
      name
      mobileNumber
    }
  }
`