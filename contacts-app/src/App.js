import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/header/Header';
import Contacts from './pages/contacts/Contacts';
import ContactDetails from './pages/contactDetails/contactDetails';
import CreateContact from './pages/createContact/CreateContact';
import EditContact from './pages/editContact/EditContact';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const apiUrl = "https://localhost:44305/api/Contact";

  useEffect(() => {
    const getContacts = async () => {
      axios
        .get(`${apiUrl}/getAllContacts`)
        .then(res => {
          setContacts(res.data.sort(sortComparison));
        })
        .catch(err => console.log(err));
    }

    getContacts()
  }, []);

  const sortComparison = (a, b) => {
    const aProp = a.firstName;
    const bProp = b.firstName;
      
    if (aProp < bProp) return -1;
    if (aProp > bProp) return 1;
    return 0;
  }

  const createContact = async (contact) => {
    axios
        .post(`${apiUrl}/createContact`, contact)
        .then(res => {
          setContacts([...contacts, contact].sort(sortComparison)); 
        })
        .catch(err => console.log(err));
  }

  const updateContact = async (contact) => {
    axios
        .put(`${apiUrl}/updateContact/${contact.id}`, contact)
        .then(res => {
          console.log('update api', res);
          let contactsCopy = [...contacts];
          contactsCopy = contactsCopy.map((c) => {
            if (c.id === contact.id) {
              return contact;
            } else {
              return c;
            }
          });
          setContacts(contactsCopy.sort(sortComparison)); 
        })
        .catch(err => console.log(err));
  }

  const deleteContact = async (contactId) => {
    axios
        .delete(`${apiUrl}/deleteContact/${contactId}`)
        .then(res => {
          console.log('delete api', res);
          let contactsCopy = [...contacts];
          contactsCopy = contactsCopy.filter((c) => c.id !== contactId);
          setContacts(contactsCopy.sort(sortComparison)); 
        })
        .catch(err => console.log(err));
  }

  const searchContact = (searchKeyword) => {
    if (searchKeyword !== "") {
      setFilteredContacts(contacts.filter((c) => {
        return `${c.firstName} ${c.middleName ? `${c.middleName.charAt(0)}. ` : ""}${c.lastName}`.toLowerCase().includes(searchKeyword);
      }));
    } else {
      setFilteredContacts(null);
    }
  } 

  return (
    <Router>
      <div className="app">
        <Header searchContact={searchContact} />
        <Routes>
          <Route path='/' element={<Contacts contacts={filteredContacts ? filteredContacts : contacts} setSelectedContact={setSelectedContact} deleteContact={deleteContact} />} />
          <Route path='/createcontact' element={<CreateContact createContact={createContact} />} />
          <Route path='/editcontact' element={<EditContact selectedContact={selectedContact} setSelectedContact={setSelectedContact} updateContact={updateContact} />} />
          <Route path='/details' element={<ContactDetails selectedContact={selectedContact} setSelectedContact={setSelectedContact} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
