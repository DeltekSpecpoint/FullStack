import React, {useState, useEffect} from 'react';
import './styles/ContactList.css';
import Contact from './Contact';



function ContactList(props) {

  const {contactList, handleDelete, handleUpdate} = props;


  return (
    <div className="contactList">
      <h1>Contact List</h1>  
        {
          contactList.map(contact=> {
            return (
              <Contact
                key={contact.id} 
                contact={contact}
                onHandleDelete={handleDelete}
                onHandleUpdate={handleUpdate}
              >
              </Contact>
            )
          })
        }       
    </div>
  );
}

export default ContactList;
