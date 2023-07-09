import React, {useState, useEffect} from 'react';
import ContactList from './Contacts/ContactList';
import AddContact from './Contacts/AddContact';
import './App.css';

function App() {

  const contactList = [
    {
      id: 1,
      name: 'John Doe',
      phone: '+1 222 2222',
      email: 'johndoe@gmail.com'
    },
    {
      id: 2,
      name: 'Jane Doe',
      phone: '+1 552 2222',
      email: 'janedoe@gmail.com'
    },
  ]


  const [contacts, setContacts] = useState([...contactList]);

  const handleAddContacts = (contact) => {
    console.log('contact', contact)
    setContacts([...contacts, {id: contacts.length+1, ...contact}]);
    console.log('contacts', contacts)
  }

  const handleDelete = (contact) => {
    console.log('deleting', contact)

    const newList = contacts.filter(c => c.id !== contact.id);
    setContacts([...newList]);
  }
  


  return (
    <div className="App">
      <AddContact handleAddContacts={handleAddContacts}></AddContact>
      <ContactList contactList={contacts} handleDelete={handleDelete}></ContactList>
    </div>
  );
}

export default App;

