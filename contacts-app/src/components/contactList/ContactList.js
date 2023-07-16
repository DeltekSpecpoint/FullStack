import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from "../confirmationDialog/confirmationDialog";


const ContactList = ({ contacts, setSelectedContact, deleteContact }) => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [contactId, setContactId] = useState();
  const navigate = useNavigate();

  const handleConfirm = () => {
    deleteContact(contactId)
  }

  return (
    <>
      <List>
        {contacts.map((contact) => (
          <ListItem
            key={contact.id}
            sx={{ pl: 0 }}
          >
            {/* <Checkbox /> */}
            <ListItemButton
              onClick={()=> {
                setSelectedContact(contact);
                navigate("/details");
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  {contact.firstName.charAt(0)+contact.lastName.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${contact.firstName} ${contact.middleName ? `${contact.middleName.charAt(0)}. ` : ""}${contact.lastName}`}
              />
            </ListItemButton>
            <IconButton
              edge="end"
              onClick={() => {
                setSelectedContact(contact);
                navigate("/editcontact");
              }}
            >
              <EditIcon />
            </IconButton>
            
            <IconButton
              edge="end"
              onClick={() => {
                setContactId(contact.id);
                setConfirmationDialogOpen(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <ConfirmationDialog open={confirmationDialogOpen} setOpen={setConfirmationDialogOpen} confirm={handleConfirm} />
    </>
  )
}

export default ContactList;