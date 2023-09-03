import React, { useEffect, useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import ContactCard from './ContactCard';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalContext';


function ContactList() {
  const { contacts } = useContext(GlobalContext);
  const pageSize = 12; // Number of cards to display per page
  const [currentPage, setCurrentPage] = useState(1);
  // const [visibleContacts, setVisibleContacts] = useState(contacts);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the contacts array to show only the cards for the current page
  // const visibleContacts = contacts.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // useEffect(() => {
  //   axios
  //     .get(`https://localhost:44305/api/Contact/GetAll?page=${currentPage}&pagesize=12`)
  //     .then((response) => {
  //       onUpdate();
  //       // setVisibleContacts(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }, [currentPage]); // Add currentPage as a dependency to trigger the effect on page change

  return (
    <>
        <Container>
            <Grid container spacing={3} style={{ marginBottom: '60px' }}>
              {contacts.map((contact, index) => (
                <Grid item key={index} xs={12} md={6} lg={4}>
                  <ContactCard contact={contact}/>
                </Grid>
              ))}
            </Grid>
        </Container>
        <Grid container justifyContent="center" style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 1, backgroundColor: 'white', height: '50px', padding: '10px 0' }}>
          <Pagination
              count={84} // Calculate the total number of pagesMath.ceil(contacts.length / pageSize)
              page={currentPage}
              onChange={handlePageChange}
              showFirstButton showLastButton
              
          />
        </Grid>
    </>

  )
}

export default ContactList
