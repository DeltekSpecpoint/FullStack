import React from "react";
import Contact from "./Contact";
import { Link } from "react-router-dom";

interface ContactDetailProps {
    contact: Contact;
}

const ContactDetails = ({ contact }: ContactDetailProps) => {
    const { id, name, phone, email, avatar } = contact;
    return (
        <div className="contact-details-container">
            <div className="contact-details">
                <div className="info">
                    <img src={avatar? avatar: "https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png"} alt="avatar" className="avatar-img"/>
                    <h2>{name}</h2>
                    <h3>{phone}</h3>
                    <h3>{email}</h3>
                </div>
                <div className="actions">
                    <Link to={`/edit/${id}`} state={{...contact}}>
                        <button className="submit">Edit</button>
                    </Link>
                    <Link to="/">
                        <button className="submit">Back to Contact List</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ContactDetails;
