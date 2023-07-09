import React, {useState, useEffect} from 'react';
import userIcon from '../user-icon.svg';
import phone from '../phone.svg';
import mail from '../mail.svg';
import './styles/Contact.css';


function Contact(props) {

  

  const {contact, onHandleDelete} = props;
  console.log('contact', contact)

  const handleDelete = () => {
    onHandleDelete(contact);
  }
 

  return (
    <div className="contact">
      <div className="contactName">
          <img src={userIcon} width="100" height="100" alt="user" />
          <span>{contact.name}</span>
      </div>
      <div className="contactDetails">
          <div className="contactInfo">
              <img src={phone} width="40" height="40" alt="phone" />
              <span>{contact.phone}</span>
          </div>
          <div className="contactInfo">
              <img src={mail} width="40" height="40" alt="email" />
              <span>{contact.email}</span>
          </div>      
      </div>
      <div className="actions">
          <button>Edit</button> 
          <button onClick={handleDelete}>Delete</button>  
      </div>
    </div>
  );
}

export default Contact;
