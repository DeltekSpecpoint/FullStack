import React, { useState } from "react";
import Contact from "./Contact";

interface AddContactProps {
    contacts: Contact[];
    addContactHandler: (contact: Contact) => void;
}

const AddContact = ({ addContactHandler, contacts }: AddContactProps) => {
    const [inputText, setInputText] = useState({
        id: contacts.length + 1,
        name: "",
        phone: "",
        email: ""
    });

    const addContact = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputText.name === "") {
            alert("Name cannot be empty");
            return
        }
        addContactHandler(inputText);
        setInputText({
            id: contacts.length + 1,
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
                <h2 className="contact-form-title">Add Contact</h2>
                <form onSubmit={addContact}>
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
                    <button type="submit" className="submit">Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddContact;
