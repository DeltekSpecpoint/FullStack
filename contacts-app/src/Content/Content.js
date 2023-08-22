import React, { useState } from "react";
import Contact from "../Contact/Contact";
import ContactController from "../ContactController/ContactController";
import Lang from "../utils";
import "./Content.css";

/* so i created simple data that automatically has a value */
const exampleContacts = [
  {
    id: 1,
    name: "Donn Darryl Dimayuga",
    email: "dimayugadonndarryl@gmail.com",
    phone: "+639172446461",
  },
];

/* this is the start of the Content Component where it has a variables that came from the contact controller.js  */
const Content = () => {
  const {
    getAllContacts,
    addContact,
    updateContact,
    deleteContact,
  } = ContactController(exampleContacts);

  const contacts = getAllContacts();

  return (
    <div>
        
      <div id="section-home" className="section-home">  {/* this is the section-home id that im talking about in the navbar.js file */}
        <p className="section-list-home">{Lang.LBL_HOME}</p>
      </div>
      <div id="section-contact" className="section-contact"> {/* this is the section-contact id that im talking about in the navbar.js file */}
        <p className="contact-list">{Lang.LBL_CONTACT_LIST}</p>

        {/* so this is where you map the data of the contacts and declares the variables to use in contact.js */}
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            addContact={addContact}
            updateContact={updateContact}
            deleteContact={deleteContact}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
