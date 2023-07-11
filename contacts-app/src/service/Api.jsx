import axios from "axios";

const url = 'https://localhost:7195/api/Contact';

export const getContacts = async (id) => {
    id = id || '';
    try {
        return await axios.get(`${url}/${id}`);
    } catch (error) {
        console.log('Error while calling getContacts api ', error);
    }
}

export const addContact = async (contact) => {
    return await axios.post(`${url}`, contact);
}

export const deleteContact = async (id) => {
    return await axios.delete(`${url}/${id}`);
}

export const editContact = async (id, contact) => {
    return await axios.put(`${url}/${id}`, contact)
}