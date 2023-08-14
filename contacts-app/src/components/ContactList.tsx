import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Contact from "./Contact";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface ContactListProps {
    contacts: Contact[];
    deleteContactHandler: (id: string) => void;
}

const ContactList = ({ contacts, deleteContactHandler }: ContactListProps) => {

  const deleteContact = (id: string) => {
    deleteContactHandler(id);
  }

  return (
    <div className="contactlist-container">
      <Link to="/add">
        <div className="contactlist-add-card contactlist-card">
          <AddCircleIcon fontSize="large" color="primary"/>
        </div>
      </Link>
      {contacts.map((contact):any => {
        return <Card 
          contact={contact}
          deleteContactHandler={deleteContact}
        />})}
    </div>
  )
}

export default ContactList;
