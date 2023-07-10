import React, {useState, useEffect} from 'react';
import './styles/ContactList.css';
import Contact from './Contact';



function ContactList(props) {

  const {contactList, handleDelete} = props;
  //const [contacts, setContacts] = useState([]);

  //setContacts(contactList)


  useEffect(() => {
    fetch(`https://localhost:5001/api/Contact`).then(results => {
      console.log('results', results)
      return results.json();
    }).then(data => {
      console.log('data', data)
      //setContacts(data);
    })
  }, []);

  return (
    <div className="contactList">
      <h1>Contact List</h1>
        {
          contactList.map(contact=> {
            return (
              <Contact
                key={contact.id} 
                contact={contact}
                onHandleDelete={handleDelete}>
              </Contact>
            )
          })
        }       
    </div>
  );
}

export default ContactList;
