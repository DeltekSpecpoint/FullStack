import React, {useState, useEffect} from 'react';
import ContactList from './Contacts/ContactList';
import AddContact from './Contacts/AddContact';
import './App.css';

function App() {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/Contact`).then(results => {
      return results.json();
    }).then(data => {
      setContacts(data);
    })
  }, []);

  const handleAddContacts = (contact) => {
    console.log('contact to add', contact)
    //setContacts([...contacts, {id: contacts.length+1, ...contact}]);
    //console.log('contacts', contacts)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          Id: `${contacts.length + 1}`,
          Name: contact.name,
          Phone: contact.phone,
          Email: contact.email
        })
    };
    fetch('http://localhost:5000/api/Contact/', requestOptions).then(results => {
      return results.json();
    }).then(data => {
      setContacts(data);
    });
  }

  const handleDelete = (contact) => {
    console.log('deleting', contact)

    fetch(`http://localhost:5000/api/Contact/${contact.id}`, { method: 'DELETE' }).then(results => {
      return results.json();
    }).then(data => {
      
      setContacts(data);
    });

  }

  const handleUpdate = (contact) => {
    console.log('update', contact)

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          Id: contact.id,
          Name: contact.name,
          Phone: contact.phone,
          Email: contact.email
        })
    };
    fetch('http://localhost:5000/api/Contact/', requestOptions).then(results => {
      return results.json();
    }).then(data => {
      setContacts(data);
    });

  }
  


  return (
    <div className="App">
      <AddContact handleAddContacts={handleAddContacts}></AddContact>
      <ContactList contactList={contacts} handleDelete={handleDelete} handleUpdate={handleUpdate}></ContactList>
 
    </div>
  );
}

export default App;

