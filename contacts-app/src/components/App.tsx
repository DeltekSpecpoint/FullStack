import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import Heading from "./Heading";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import Contact from "./Contact";
import ContactDetail from "./ContactDetails";
import EditContact from "./EditContact";
import contactsList from "../dataset/contacts";
// import axios from "axios";

const App = () => {
  // const LOCAL_STORAGE_KEY = "contacts"
  const [contacts, setContacts] = useState<Contact[]>(contactsList);
  let navigate = useNavigate();
  let location = useLocation();
 
  const routeChange = (path: string) => {
    navigate(path)
  }

  const addContact = (contact: Contact) => {
    setContacts((prevContacts) => {
      return [...prevContacts, contact ];
    });
    routeChange("/");
  }

  const deleteContact = (id: string) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id.toString() !== id;     
    })
    setContacts(newContactList);
  }

  const updateContact = (contactToUpdate: Contact) => {
    const newContactList = contacts.map((contact) => {
      if (contactToUpdate.id === contact.id) {
       return {...contact, name: contactToUpdate.name, phone: contactToUpdate.phone, email: contactToUpdate.email}
      }
      return contact;
    });
    setContacts(newContactList);
    location.state.data = contactToUpdate;
    routeChange(`/contact/${contactToUpdate.id}`);
  }
  
  return (  
    <div>
      <Heading />
      <Routes>
        <Route 
          path="/" 
          element={<ContactList contacts={contacts} deleteContactHandler={deleteContact} />}/>
        <Route 
          path="/add"
          element={<AddContact addContactHandler={addContact} contacts={contacts}/>}/>
        <Route 
          path="/contact/:id" 
          element={<ContactDetail contact={location.state?.data ? location.state.data : {}} />} />
        <Route 
          path="/edit/:id" 
          element={<EditContact updateContactHandler={updateContact} contact={location.state ? location.state : {}}/>} />
      </Routes>
    </div>
  );
}

export default App;
