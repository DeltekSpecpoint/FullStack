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
          <TableCell className='tc-head'>Contact Name</TableCell>
          <TableCell className='tc-head'>Contact Number</TableCell>
          <TableCell className='tc-head'>Email Address</TableCell>
          <TableCell className='tc-head'>Home Address</TableCell>
          <TableCell className='tc-head'></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell className='tbl-cell'>{contact.name}</TableCell>
            <TableCell className='tbl-cell'>{contact.number}</TableCell>
            <TableCell className='tbl-cell'>{contact.email}</TableCell>
            <TableCell className='tbl-cell'>{contact.address}</TableCell>
            <TableCell className='tbl-cell'>
              <Button 
                className='edit-btn'
                variant='contained'
                style={{marginRight: 10}}
                startIcon={<Edit />}
                component={Link}
                to={`/edit/${contact.id}`}              
              >
                Edit
              </Button>
              <Button 
                className='delete-btn'
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