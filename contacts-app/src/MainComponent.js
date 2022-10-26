import React, { useState, useEffect } from 'react';
import { GetContacts, GetContact, DeleteContact } from './apiCall';
import ContactTable from './Pages/ContactTable';
import Header from './Pages/Header';
import AddContact from './Pages/AddContact';


function MainComponent() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        GetContacts().then(
            result => {
                setContacts(result)
            },
        )
    }, []);

    let handleChange = event => {
        if (event.target.value.length == 0) {
            GetContacts().then(
                result => {
                    setContacts(result)
                },
            )
        }
        else {
            GetContact(event.target.value).then(
                result => {
                    setContacts([result])
                },
            )
        }
    };

    let handleDelete = event => {
        DeleteContact(event.currentTarget.attributes.contactId.value).then(
            result => {
                setContacts([result])
            },
        )
        GetContacts().then(
            result => {
                setContacts(result)
            },
        )
    };

    let handleAdd = event => {
        alert('hello');
        <div className="container-sm">
            <AddContact></AddContact>
        </div>
    };

    return (
        <div>
            <Header
                handleChange={handleChange}
                handleAdd={handleAdd}
            />

            <ContactTable
                contacts={contacts}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default MainComponent;