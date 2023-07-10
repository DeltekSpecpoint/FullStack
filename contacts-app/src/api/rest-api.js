import axios from 'axios'

export async function getContacts() {
  var results = await axios.get('/contact')
  return results.data
}

export async function getContactById(id) {
  var results = await axios.get(`/contact/${id}`)
  return results.data
}

export async function createContact(model) {
  var response = await axios.post('/contact', model)
  return response.data
}

export async function updateContact(id, model) {
  var response = await axios.put(`/contact/${id}`, model)
  return response.data
}

export async function deleteContact(id) {
  var response = await axios.delete(`/contact/${id}`)
  return response
}