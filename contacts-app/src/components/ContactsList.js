import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import webApi from '../utils/WebApi';
import ContactForm from './ContactForm';
import Grid from './Grid';

const ContactsList = () => {
    const [contacts, setContacts] = useState([]);
    const [open, setOpen] = useState(false);
    const [contact, setContact] = useState({});
    useEffect(() => {
        fetchData();
    }
        , []);

    const handleOpen = () => setOpen(true);
    const handleOpenUpdate = (id, contact) => { setContact(contact); setOpen(true); };
    const handleClose = (event, reason) =>  {if (reason !== 'backdropClick') {setOpen(false);}}


    const handleSubmit = (contact) => {
        if (contact.id != null) updateData(contact.id, contact);
        else addData(contact);
        setOpen(false);
        setContact({});
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setOpen(false);
        setContact({});
    }
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?") == true)
            deleteData(id);
    }


    async function fetchData() {
        try {
            const response = await webApi.get().catch(error => console.log(error.message));
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }
    async function addData(contact) {
        try {
            const response = await webApi.post('/', contact).catch(error => console.log('Error adding contact: ' + error.message));
            if (response.data) alert("Added Succesfully");
            else alert("Error adding contact");
            fetchData();
        } catch (error) {
            console.error('Error adding contact:', error)
        }
    }
    async function updateData(id, contact) {
        try {
            const response = await webApi.put(`/${id}`, contact).catch(error => alert('Error updating contact: ' + error.message));
            if (response.data) alert("Updated Succesfully");
            else alert("Error updating contact");
            fetchData();
        } catch (error) {
            console.error('Error updating contact:', error)
        }
    }
    async function deleteData(id) {
        try {
            const response = await webApi.delete(id).catch(error => alert('Error deleting contact: ' + error.message));
            if (response.data) alert("Deleted Succesfully");
            else alert("Error deleting contact");
            fetchData();
        } catch (error) {
            console.error('Error deleting contact:', error)
        }
    }
    return (<div>
        <Button variant="outlined" startIcon={<Add />} onClick={handleOpen}>Add Contact</Button>
        <Grid contacts={contacts} onDelete={handleDelete} onEdit={handleOpenUpdate} />
        <ContactForm open={open} handleClose={handleClose} onSubmit={handleSubmit} onCancel={handleCancel} data={contact} />

    </div>);
}

export default ContactsList;