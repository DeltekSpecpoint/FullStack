import React, {useState, useEffect} from 'react';
import userIcon from '../user-icon.svg';
import phone from '../phone.svg';
import mail from '../mail.svg';
import './styles/Contact.css';


function Contact(props) {

  

  const {contact, onHandleDelete} = props;
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(contact.name);
  const [editContactNo, setEditContactNo] = useState(contact.phone);
  const [editEmail, setEditEmail] = useState(contact.email);

  const handleDelete = () => {
    onHandleDelete(contact);
  }

  const handleSetEdit = () => {
    setEditMode(true);
  }

  const handleCancelSetEdit = () => {
    setEditMode(false);
  }

  const handleSaveChanges = () => {

  }
 
  

  return (
    <div className="contact">
      <div className="contactName">
          <img src={userIcon} width="100" height="100" alt="user" />
          {
            editMode ? 
            <div className="editField">
              <label for="editName">Name:</label>
                <input 
                type="text" 
                id="editName" 
                name="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div> : 
            <span>{contact.name}</span>
          }
      </div>
      <div className="contactDetails">
          <div className="contactInfo">
              <img src={phone} width="40" height="40" alt="phone" />
              {
                editMode ? 
                <div className="editField">
                  <label for="editContactNo">Contact No:</label>
                    <input 
                    type="text" 
                    id="editContactNo" 
                    name="editContactNo"
                    value={editContactNo}
                    onChange={(e) => setEditContactNo(e.target.value)}
                  />
                </div> : 
                <span>{contact.phone}</span>
              }
          </div>
          <div className="contactInfo">
              <img src={mail} width="40" height="40" alt="email" />
              {
                editMode ? 
                <div className="editField">
                  <label for="editEmail">Email:</label>
                    <input 
                    type="text" 
                    id="editEmail" 
                    name="editEmail"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </div> : 
                <span>{contact.email}</span>
              }
          </div>      
      </div>
      <div className="actions">
          {editMode ? <button onClick={handleCancelSetEdit}>Cancel</button> : <button onClick={handleSetEdit}>Edit</button>} 
          {editMode && <button onClick={handleSaveChanges}>Save</button>}
          <button onClick={handleDelete}>Delete</button>  
      </div>
    </div>
  );
}

export default Contact;
