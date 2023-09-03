import React , { useEffect, useState }from 'react';
import { DialogActions, DialogContent, Dialog, DialogTitle } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';


const AddEditContact = ({contact = null , onUpdate }) => {
    const isCreating = contact == null ? true : false;
    const [closeModal, setCloseModal] = useState(false);
    const [updatedValue, setUpdatedValue] = useState({
      FirstName: contact?.FirstName || '',
      LastName: contact?.LastName || '',
      ContactNumber: contact?.ContactNumber || '',
      Email: contact?.Email || '',
    });

    const updatedContactData = {
      ...updatedValue,
      ContactNumber: parseInt(updatedValue.ContactNumber, 10), // Parse as base-10 integer
    };

    const handleCloseModal = () => {
      setCloseModal(!closeModal);
    }

  const handleSendContact = (id = undefined) => {
      const method = isCreating ? 'POST' : 'PUT';
      const url = isCreating ? 'https://localhost:44305/api/Contact/AddContact' : `https://localhost:44305/api/Contact/UpdateContact/${id}`;
    axios({
      method: method,
      url: url,
      data: updatedContactData,
    })
      .then((res) => {
        setCloseModal(true);
        setUpdatedValue(updatedContactData);
        onUpdate();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Dialog open = {!closeModal} onClose = {handleCloseModal} fullWidth maxWidth= "sm">
      {isCreating ? <DialogTitle>Create Contact</DialogTitle> : <DialogTitle>Edit Contact</DialogTitle>}
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField variant = "outlined"
                        label = "First Name"
                        {...(isCreating ? { defaultValue: contact != null ? contact.FirstName : "" } : { value: updatedValue.FirstName })}
                        onChange={e => setUpdatedValue({...updatedValue, FirstName: e.target.value})}>
            </TextField>
            <TextField variant = "outlined"
                        label = "Last Name"
                        {...(isCreating ? { defaultValue: contact != null ? contact.LastName : "" } : { value: updatedValue.LastName })}
                        onChange={e => setUpdatedValue({...updatedValue, LastName: e.target.value})}>
            </TextField>
            <TextField variant = "outlined"
                        label = "Contact Number"
                        {...(isCreating ? { defaultValue: contact != null ? contact.ContactNumber : "" } : { value: updatedValue.ContactNumber })}
                        onChange={e => setUpdatedValue({...updatedValue, ContactNumber: e.target.value})}>              
            </TextField>
            <TextField variant = "outlined"
                        label = "Email"
                        {...(isCreating ? { defaultValue: contact != null ? contact.Email : "" } : { value: updatedValue.Email })}
                        onChange={e => setUpdatedValue({...updatedValue, Email: e.target.value})}>              
            </TextField>
          </Stack>
        </DialogContent>
      <DialogActions>
      <Button size = "medium" onClick = {handleCloseModal}>Cancel</Button>
      <Button variant="contained"
              endIcon={<SendIcon />}
              onClick={() => handleSendContact(contact?.Id)}>
          Submit
      </Button>

      </DialogActions>
    </Dialog>

  )
}

export default AddEditContact
