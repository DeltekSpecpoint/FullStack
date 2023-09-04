import React from "react";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toggleAffirmationModal, handleShouldReload } from "../contactReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

export default function DeleteContact() {
  const dispatch = useDispatch();
  const isAffirmationModalOpen = useSelector(
    (state) => state.contactReducer.isAffirmationModalOpen
  );
  const currentContact = useSelector(
    (state) => state.contactReducer.currentContact
  );

  const handleDeleteContact = () => {
    console.log("deleteID: " + currentContact.Id);

    axios({
      method: "DELETE",
      url: `https://localhost:44305/api/Contact/DeleteContact/${currentContact.Id}`,
    })
      .then(() => {
        dispatch(toggleAffirmationModal(false));
        dispatch(handleShouldReload(true));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Dialog
        open={isAffirmationModalOpen}
        onClose={() => dispatch(toggleAffirmationModal(false))}
        fullWidth
        maxWidth="sm">
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>{`You are deleting ${currentContact.FirstName} ${currentContact.LastName} permanently. Continue?`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="medium"
            onClick={() => dispatch(toggleAffirmationModal(false))}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteContact}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
