import React, { useEffect, useState } from 'react';
import "./ContactList.css";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { deleteContact, getContactList } from '../../service/Api';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, []);
  
  const handleDelete = async (id) => {
    await deleteContact(id);
    getAllContacts();
  }
  
  const getAllContacts = async () => {
    let response = await getContactList();
    setContacts(response.data);
  }
  return (
    <Table className='tbl'>
      <TableHead>
        <TableRow>
          <TableCell className='tbl-cell'>Contact Name</TableCell>
          <TableCell className='tbl-cell'>Contact Number</TableCell>
          <TableCell className='tbl-cell'>Email Address</TableCell>
          <TableCell className='tbl-cell'>Home Address</TableCell>
          <TableCell className='tbl-cell'></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell>{contact.name}</TableCell>
            <TableCell>{contact.number}</TableCell>
            <TableCell>{contact.email}</TableCell>
            <TableCell>{contact.address}</TableCell>
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