import React, { useState } from "react";
import Lang from "../utils";
import './Contact.css';
// import '../Main/Main.css';

const Contact = ({ contact, updateContact, deleteContact, addContact }) => { 
    /* state variables for edit, add, and edited field values */
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editedName, setEditedName] = useState(contact.name);
  const [editedEmail, setEditedEmail] = useState(contact.email);
  const [editedPhone, setEditedPhone] = useState(contact.phone);

  /* function to handle saving edited contact */
  const handleSaveEdit = () => {
    const updatedContact = {
      ...contact,
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
    };
    updateContact(contact.id, updatedContact);
    setEditedName(updatedContact.name);
    setEditedEmail(updatedContact.email);
    setEditedPhone(updatedContact.phone);
    setIsEditing(false);
  };

  /* function to add a contact */
  const handleAdd = () => {
    setIsAdding(true);
  };

  /* function to save a new contact */
  const handleSaveAdd = () => {
    const newContact = {
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
    };
    addContact(newContact);
    setIsAdding(false);
  };

  /* function to delete contact */
  const handleDelete = () => {
    /* setting the values to null or empty so that if you delete it, it will not be shown in the screen */
    const updatedContact = {
      ...contact,
      name: "",
      email: "",
      phone: "",
    };
    /*  */
    updateContact(contact.id, updatedContact);
    setEditedName("");
    setEditedEmail("");
    setEditedPhone("");
  };

  return (
    <div className="contact">
      {isEditing || isAdding ? (
        <div className="contact-edit-form">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
          <input
            type="text"
            value={editedPhone}
            onChange={(e) => setEditedPhone(e.target.value)}
          />
          {isEditing ? (
            <button onClick={handleSaveEdit}>
              <span>{Lang.LBL_SAVE}</span>
              <div class="framed-top"></div>
              <div class="framed-bottom"></div>
            </button>
          ) : (
            <button onClick={handleSaveAdd}>
              <span>{Lang.LBL_ADD}</span>
              <div class="framed-top"></div>
              <div class="framed-bottom"></div>
            </button>            
          )}
        </div>
      ) : (
        <div>
            <div className="contact-details-buttons">
                <button onClick={handleAdd}>
                  <span>{Lang.LBL_ADD}</span>
                  <div class="framed-top"></div>
                  <div class="framed-bottom"></div>
                </button>
                <button onClick={() => setIsEditing(true)}>
                  <span>{Lang.LBL_EDIT}</span>
                  <div class="framed-top"></div>
                  <div class="framed-bottom"></div>
                </button>
                <button onClick={handleDelete}>
                  <span>{Lang.LBL_DELETE}</span>
                  <div class="framed-top"></div>
                  <div class="framed-bottom"></div>
                </button>
            </div>
            <div className="contact-details">
                <div className="contact-div">{Lang.LBL_NAME} {contact.name}</div>
                <div className="contact-div">{Lang.LBL_EMAIL} {contact.email}</div>
                <div className="contact-div">{Lang.LBL_PHONE} {contact.phone}</div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
