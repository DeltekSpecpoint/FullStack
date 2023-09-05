import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateContactsList, handleShouldReload } from "../contactReducer";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import ContactCard from "./ContactCard";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

function ContactList() {
  const dispatch = useDispatch();
  const { contactsList, shouldReload, searchTerm } = useSelector(
    (state) => state.contactReducer
  );

  const getContacts = async () => {
    await axios
      .get(
        `https://localhost:44305/api/Contact/GetAll?page=1&pagesize=12&searchQuery=${searchTerm}`
      )
      .then((response) => {
        console.log("s: ", searchTerm);
        dispatch(updateContactsList(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const pageSize = 12; // Number of cards to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getContacts();
    dispatch(handleShouldReload(false));
  }, [shouldReload]);

  return (
    <>
      <Container>
        <Grid container spacing={3} style={{ marginBottom: "60px" }}>
          {contactsList != null &&
            contactsList.map((contact, index) => (
              <Grid item key={index} xs={12} md={6} lg={4}>
                <ContactCard contact={contact} />
              </Grid>
            ))}
        </Grid>
      </Container>
      <Grid
        container
        justifyContent="center"
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          backgroundColor: "white",
          height: "50px",
          padding: "10px 0",
        }}>
        {/* <Pagination
          count={84} // Calculate the total number of pagesMath.ceil(contacts.length / pageSize)
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        /> */}
      </Grid>
    </>
  );
}

export default ContactList;
