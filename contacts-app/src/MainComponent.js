import React, { useState, useEffect } from 'react';
import { GetContacts, GetContact, DeleteContact, AddContactPerson, UpdateContactPerson } from './apiCall';
import ContactTable from './Pages/ContactTable';
import Header from './Pages/Header';
import AddContact from './Pages/AddContact';
import UpdateContact from './Pages/UpdateContact';
import Pagination from './Pages/Pagination';

function MainComponent() {
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState([]);
    const [addContactvisibility, setAddContactVisibility] = useState(false);
    const [updateContactvisibility, setUpdateContactVisibility] = useState(false);
    const [mainContactVisibility, setMainContactVisibility] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    //Get Contacts Per Page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = contacts.slice(indexOfFirstPost, indexOfLastPost);

    //Change Page Number
    let paginate = pageNumber => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        GetContacts().then(
            result => {
                setContacts(result)
            },
        )
    }, []);

    let handleSearch = event => {
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

    let handleDelete = contactId => {
        DeleteContact(contactId).then(
            GetContacts().then(
                result => {
                    setContacts(result)
                },
            )
        )
    };

    let handleAddContact = json => {
        AddContactPerson(json).then(_ => {
            setAddContactVisibility(false)
            setMainContactVisibility(true);
            GetContacts().then(result => { setContacts(result) })
        })
    };

    let handleUpdateContact = (contactId, json) => {
        UpdateContactPerson(contactId, json).then(_ => {
            setAddContactVisibility(false)
            setUpdateContactVisibility(false)
            setMainContactVisibility(true);
            GetContacts().then(result => { setContacts(result) })
        })
    };

    let handleAddContactVisibility = _ => {
        setAddContactVisibility(true);
        setUpdateContactVisibility(false);
        setMainContactVisibility(false);
    };

    let handleUpdateContactVisibility = contactId => {
        setContact(contacts.find(x => x.contactId == contactId))

        setUpdateContactVisibility(true);
        setAddContactVisibility(false);
        setMainContactVisibility(false);
    };

    let handleBackButton = _ => {
        setAddContactVisibility(false);
        setUpdateContactVisibility(false);
        setMainContactVisibility(true);
    };

    return (
        <div>
            {mainContactVisibility == true &&
                <Header handleChange={handleSearch}
                    handleAdd={handleAddContactVisibility}
                />}

            {mainContactVisibility == true &&
                <ContactTable
                    contacts={currentPosts}
                    handleDelete={handleDelete}
                    handleUpdateContactVisibility={handleUpdateContactVisibility}
                />}

            {mainContactVisibility == true && <Pagination
                postsPerPage={postsPerPage}
                totalPosts={contacts.length}
                paginate={paginate}
            />}

            {addContactvisibility == true && updateContactvisibility == false &&
                <AddContact
                    handleBack={handleBackButton}
                    handleAddContact={handleAddContact}
                />}

            {addContactvisibility == false && updateContactvisibility == true &&
                <UpdateContact
                    handleBack={handleBackButton}
                    handleUpdateContact={handleUpdateContact}
                    contact={contact}
                />}
        </div>
    );
}

export default MainComponent;