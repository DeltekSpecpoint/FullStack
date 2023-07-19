import React from 'react';
import "./ContactList.css";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';

// use mock data initially
const contactList = [
  {
    id: 1,
    fullName: "Jon Snow",
    number: +639154985517,
    emailAddress: "Jon@gmail.com",
  },
  {
    id: 2,
    fullName: "Arya Stark",
    number: +639154985517,
    emailAddress: "Cersei@gmail.com",
  }
];

const ContactList = () => {

  const handleDelete = async (id) => {
    alert("Contact deleted successfully!");
  }
  
  return (
    <Table className='tbl'>
      <TableHead>
        <TableRow>
          <TableCell className='tbl-cell'>Id</TableCell>
          <TableCell className='tbl-cell'>Contact Name</TableCell>
          <TableCell className='tbl-cell'>Contact Number</TableCell>
          <TableCell className='tbl-cell'>Email Address</TableCell>
          <TableCell className='tbl-cell'></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contactList.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell>{contact.id}</TableCell>
            <TableCell>{contact.fullName}</TableCell>
            <TableCell>{contact.number}</TableCell>
            <TableCell>{contact.emailAddress}</TableCell>
            <TableCell>
              <Button 
                color='primary'
                variant='contained'
                style={{marginRight: 10}}
                startIcon={<Edit />}
                component={Link}
                to={`/edit/${contact.id}`}              
              >
                Edit
              </Button>
              <Button 
                color='primary'
                variant='contained'
                style={{marginRight: 10}}
                startIcon={<Delete />}
                onClick={() => handleDelete(contact.id)}            
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ContactList