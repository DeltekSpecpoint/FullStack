import React, { useState , useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from '@material-ui/core';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@material-ui/core/Grid';
import AddEditContact from '../Components/AddEditContact';
import DeleteContact from '../Components/DeleteContact';
// import { useNavigate } from 'react-router-dom';


function ContactCard ({ contact , onUpdate }) {
    // const navigate = useNavigate();
    const [openAddEditModal, setOpenAddEditModal] = useState(false);
    const [openAffirmationModal, setOpenAffirmationModal] = useState(false);

    const toggleAddEditModal = (contact) => {
        console.log(onUpdate);

        setOpenAddEditModal(!openAddEditModal);
        // navigate(`/update/${contact.Id}`);
        console.log("Contact" + contact);
    };

    const toggleAffirmationModal = () => {
        setOpenAffirmationModal(!openAffirmationModal);


    };

  return (
    <div>
        <Card style={{ margin: '10px' }}>
            <CardHeader
                action = {
                    <>
                        <IconButton onClick = {() => toggleAddEditModal(contact)}>
                            <EditOutlinedIcon />
                        </IconButton>
                        <IconButton onClick = {() => toggleAffirmationModal()}>
                            <DeleteIcon />
                        </IconButton>
                    </>

                }
                title = {`${contact.FirstName} ${contact.LastName}`}
            />
            <CardContent>
                <Typography>
                    {`Contact Number: ${contact.ContactNumber}`}
                </Typography>
                <Typography>
                    {`Email: ${contact.Email}`}
                </Typography>
            </CardContent>
        </Card>
        {
            openAddEditModal ? (<AddEditContact contact = {contact} onUpdate={onUpdate}/>) : null
        }
        {
            openAffirmationModal ? (<DeleteContact id = {contact.Id} contact = {contact} onUpdate={onUpdate}/>) : null
        }
    </div>
  )
}

export default ContactCard
