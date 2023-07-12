import React, {useState, useEffect} from 'react';
import './styles/ContactList.css';
import Contact from './Contact';



function ContactList(props) {

  const {contactList, handleDelete, handleUpdate} = props;

  return (
    <div className="contactList">
      <h1>Contact List</h1>
      <form className="contactListControls">
        <div>
          <label for="Search">Search:</label>
          <input 
                type="text" 
                id="name" 
                name="search"
                aria-label="Search Input"
          />
        </div>
        <div>
          <label for="sort">Sort by:</label>
          <select id="sort" name="sort">
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </form>  
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
