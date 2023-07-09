import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql/',
  cache: new InMemoryCache(),
});

export async function getContacts() {
  client
    .query({
      query: gql`
        query {
          contact {
            nodes {
              name
            }
          }
        }
      `
    })
    .then(response => {
      console.log(response)
    })
  return {

  }
}

export async function getContactById(id) {
  
  return {}
}

export async function createContact(model) {
  
  return {}
}

export async function updateContact(id, model) {
  
  return {}
}

export async function deleteContact(id) {
  
  return {}
}