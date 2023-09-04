import React from "react";
import { useDispatch } from "react-redux";
import {
  updateFormDetails,
  toggleAddEditModal,
  updateCurrentContact,
  toggleAffirmationModal,
} from "../contactReducer";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IconButton, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import DeleteIcon from "@mui/icons-material/Delete";

function ContactCard({ contact }) {
  const dispatch = useDispatch();
  const handleEditClick = () => {
    const formDetails = {
      formTitle: "Edit Contact",
      formType: "Edit",
    };
    dispatch(updateFormDetails(formDetails));
    dispatch(updateCurrentContact(contact));
    dispatch(toggleAddEditModal(true));
  };

  const handleDeleteClick = () => {
    dispatch(updateCurrentContact(contact));
    dispatch(toggleAffirmationModal(true));
  };

  return (
    <div>
      <Card style={{ margin: "10px" }}>
        <CardHeader
          action={
            <>
              <IconButton onClick={handleEditClick}>
                <EditOutlinedIcon />
              </IconButton>
              <IconButton onClick={handleDeleteClick}>
                <DeleteIcon />
              </IconButton>
            </>
          }
          title={`${contact.FirstName} ${contact.LastName}`}
        />
        <CardContent>
          <Typography>{`Contact Number: ${contact.ContactNumber}`}</Typography>
          <Typography>{`Email: ${contact.Email}`}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ContactCard;
