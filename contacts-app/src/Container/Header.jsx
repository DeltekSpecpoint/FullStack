import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFormDetails,
  toggleAddEditModal,
  updateCurrentContact,
} from "../contactReducer";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import SortIcon from "@mui/icons-material/Sort";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Header() {
  const dispatch = useDispatch();
  const handleSort = () => {};

  const handleCreateClick = () => {
    const currentContact = {
      Id: "",
      FirstName: "",
      LastName: "",
      ContactNumber: "",
      Email: "",
    };
    const formDetails = {
      formTitle: "Create Contact",
      formType: "Create",
    };
    dispatch(updateFormDetails(formDetails));
    dispatch(updateCurrentContact(currentContact));
    dispatch(toggleAddEditModal(true));
  };
  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button endIcon={<AddCircleIcon />} onClick={handleCreateClick}>
              Create New
            </Button>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <Button endIcon={<SortIcon />} onClick={handleSort}>
              Sort
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
