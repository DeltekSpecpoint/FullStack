import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormDetails,
  toggleAddEditModal,
  updateCurrentContact,
  toggleDesc,
  handleShouldReload,
  updateSortField,
} from "../Redux/contactReducer";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import SortIcon from "@mui/icons-material/Sort";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Header() {
  const dispatch = useDispatch();
  const { isDesc, sortField } = useSelector((state) => state.contactReducer);

  const handleSort = () => {
    dispatch(updateSortField("LastName"));
    dispatch(toggleDesc(!isDesc));
    dispatch(handleShouldReload(true));
  };
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
            <Button
              endIcon={
                <>
                  <SortIcon />
                  {isDesc ? (
                    <SouthIcon style={{ fontSize: 19 }} />
                  ) : (
                    <NorthIcon style={{ fontSize: 19 }} />
                  )}
                </>
              }
              onClick={handleSort}></Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
