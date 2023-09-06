import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateContactsList,
  handleShouldReload,
} from "../Redux/contactReducer";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import ContactCard from "./ContactCard";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

function ContactList() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { contactsList, shouldReload, searchTerm, sortField, isDesc } =
    useSelector((state) => state.contactReducer);

  const getContacts = async () => {
    const sortOrder = isDesc ? "desc" : "asc";

    await axios
      .get(
        `https://localhost:44305/api/Contact/GetAll?page=${currentPage}&pagesize=12&searchQuery=${searchTerm}&sortField=${sortField}&sortOrder=${sortOrder}`
      )
      .then((response) => {
        dispatch(updateContactsList(response.data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    dispatch(handleShouldReload(true));
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
        <Pagination
          count={84} // Calculate the total number of pagesMath.ceil(contactsList.length / pageSize)
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </Grid>
    </>
  );
}

export default ContactList;
