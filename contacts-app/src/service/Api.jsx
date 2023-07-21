import axios from "axios";

const url = 'http://localhost:5185/api/Contact';

export const getContactList = async () => {
    try {
        return await axios.get(`${url}/GetContactList`);
    } catch (error) {
        console.log('Error while calling getContactList api ', error);
    }
}

export const getContacts = async (id) => {
    id = id || '';
    try {
        return await axios.get(`${url}/${id}`);
    } catch (error) {
        console.log('Error while calling getContact api ', error);
    }
}

export const addContact = async (contact) => {
    try {
        return await axios.post(`${url}`, contact);
    } catch (error) {
        console.log('Error while adding new contact', error);
    }
}

export const deleteContact = async (id) => {
    return await axios.delete(`${url}/${id}`);
}

export const editContact = async (id, contact) => {
    return await axios.put(`${url}/${id}`, contact)
}