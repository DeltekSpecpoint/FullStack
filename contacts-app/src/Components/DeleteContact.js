import { DialogActions, DialogContent, DialogContentText, Dialog, DialogTitle } from '@material-ui/core';
import axios from 'axios';
import React , { useState }from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

export default function DeleteContact({ id, contact, onUpdate }) {
    const [closeModal, setCloseModal] = useState(false);
    const handleCloseModal = () => {
        setCloseModal(!closeModal);
    }

    const handleDeleteContact =  (id) => {
        console.log("deleteID: " + id)
    
        axios({
          method: 'DELETE',
          url: `https://localhost:44305/api/Contact/DeleteContact/${id}`
        })
          .then((res) => {
            setCloseModal(true);
            console.log(res.data);
            onUpdate();
          })
          .catch((err) => console.error(err));
    
        // try {
        //   const response = await updateData(contact?.id, updatedValue);
        //   console.log('Data updated successfully:', response);
        //   handleCloseModal();
        // } catch (error) {
        //   console.error('Failed to update data:', error);
        // }
      };

  return (
    <div>
      <Dialog open = {!closeModal} onClose = {handleCloseModal} fullWidth maxWidth= "sm">
        <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
                <DialogContentText>{`You are deleting ${contact.FirstName} ${contact.LastName} permanently. Continue?`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size = "medium" onClick = {handleCloseModal}>Cancel</Button>
                <Button color = "error" variant="outlined" startIcon={<DeleteIcon /> } onClick = {() => handleDeleteContact(contact.Id)}>
                    Delete
                </Button>

            </DialogActions>
      </Dialog>
    </div>
  )
}
