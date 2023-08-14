import React, { useState } from "react";
import Contact from "./Contact";

interface EditContactProps {
    contact: Contact;
    updateContactHandler: (contact: Contact) => void;
}

const EditContact = ({ contact, updateContactHandler }: EditContactProps) => {
    const [inputText, setInputText] = useState({
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        email: contact.email
    });

    const updateContact = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputText.name === "") {
            alert("Name cannot be empty");
            return
        }
        updateContactHandler(inputText);
        setInputText({
            id: 0,
            name: "",
            phone: "",
            email: ""
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputText((prevValue) => {
            return {
              ...prevValue,
              [name]: value
            };
          });
        event.preventDefault();
    }

    return (
        <div className="contact-form-container">
            <div className="contact-form">
                <h2 className="contact-form-title">Edit Contact</h2>
                <form onSubmit={updateContact}>
                    <div className="input-container">
                        <input id="name" type="text" name="name" className="input" placeholder=" " onChange={handleChange} value={inputText.name}/>
                        <div className="cut"></div>
                        <label htmlFor="name" className="placeholder">Name</label>
                    </div>
                    <div className="input-container">
                        <input id="phone" type="text" name="phone" className="input" placeholder=" " onChange={handleChange} value={inputText.phone}/>
                        <div className="cut"></div>
                        <label htmlFor="phone" className="placeholder">Phone</label>
                    </div>
                    <div className="input-container">
                        <input id="email" type="text" name="email" className="input" placeholder=" " onChange={handleChange} value={inputText.email}/>
                        <div className="cut"></div>
                        <label htmlFor="email" className="placeholder">Email</label>
                    </div>
                    <button type="submit" className="submit">Update</button>
                </form>
            </div>
        </div>
    )
}

export default EditContact;
