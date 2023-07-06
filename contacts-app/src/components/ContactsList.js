import React, { useState, useEffect } from 'react';
import webApi from '../utils/WebApi';
import Grid from './Grid';
import { Button } from '@mui/material';
import ContactForm from './ContactForm';
import { Add } from '@mui/icons-material';

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
    const handleClose = () => setOpen(false);


    const handleSubmit = (contact) => {
        if (contact.id != null) updateData(contact.id, contact);
        else addData(contact);
        setOpen(false);

    }
    const handleCancel = (e) => {
        e.preventDefault();
        setOpen(false);
    }
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?") == true)
            deleteData(id);
    }


    async function fetchData() {
        try {
            const response = await webApi.get();
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }
    async function addData(contact) {
        try {
            const response = await webApi.post('/', contact);
            if (response.data) alert("Added Succesfully");
            fetchData();
        } catch (error) {
            console.error('Error adding contact:', error)
        }
    }
    async function updateData(id, contact) {
        try {
            const response = await webApi.put(`/${id}`, contact);
            if (response.data) alert("Updated Succesfully");
            fetchData();
        } catch (error) {
            console.error('Error updating contact:', error)
        }
    }
    async function deleteData(id) {
        try {
            const response = await webApi.delete(id);
            if (response.data) alert("Deleted Succesfully");
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