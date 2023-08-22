import { useState } from "react";

// this is the 
const ContactController = (exampleContacts) => {
    /* declaring the contacts as the data from the exampleContacts from the Content.js file */
  const [contacts, setContacts] = useState([...exampleContacts]);

  /* funtion to add new contact to the list of contacts and then update it in state */
  const getAllContacts = () => {
    return contacts;
  };

  /* function to get a contact by its ID */
  const getContactById = (id) => {
    return contacts.find((contact) => contact.id === id);
  };

  /* function to add a new contact */
  const addContact = (newContact) => {
    const id = contacts.length + 1;
    setContacts([...contacts, { ...newContact, id }]);
    return id;
  };

  /* function to update an existing contact */
  const updateContact = (id, updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...updatedContact, id } : contact
    );
    setContacts(updatedContacts);
  };

  /* function to delete a contact */
  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  /* return an object containing all functions above */
  return {
    getAllContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact,
  };
};

export default ContactController;
