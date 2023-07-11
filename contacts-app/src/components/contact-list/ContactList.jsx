import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "./ContactList.css";
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { deleteContact, getContacts } from '../../service/Api';

const contactList = [
  {
    id: 1,
    fullName: "Jon Snow",
    number: +639154985517,
    emailAddress: "Jon@gmail.com",
  },
  {
    id: 2,
    fullName: "Cersei Lannister",
    number: +639154985517,
    emailAddress: "Cersei@gmail.com",
  },
  {
    id: 3,
    fullName: "Jaime Lannister",
    number: +639154985517,
    emailAddress: "Jaime@gmail.com",
  },
  {
    id: 4,
    fullName: "Arya Stark",
    number: +639154985517,
    emailAddress: "Arya@gmail.com",
  },
  {
    id: 5,
    fullName: "Daenerys Targaryen",
    number: +639154985517,
    emailAddress: "Daenerys@gmail.com",
  },
  {
    id: 6,
    fullName: "Melisandre",
    number: +639154985517,
    emailAddress: "Melisandre@gmail.com",
  },
  {
    id: 7,
    fullName: "Ferrara Clifford",
    number: +639154985517,
    emailAddress: "Ferrara@gmail.com",
  },
  {
    id: 8,
    fullName: "Rossini Frances",
    number: +639154985517,
    emailAddress: "Rossini@gmail.com",
  },
  {
    id: 9,
    fullName: "Harvey Roxie",
    number: +639154985517,
    emailAddress: "Harvey@gmail.com",
  },
];

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
    let response = await getContacts();
    setContacts(response.data);
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