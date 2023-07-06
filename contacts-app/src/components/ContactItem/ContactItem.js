import React from 'react'
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import './ContactItem.css'

const ContactItem = ({ contact, onDelete, onEdit }) => {
  return (
    <ListItem ContainerComponent="div">
      <ListItemText
        primary={contact.name}
        secondary={`${contact.email} - ${contact.phoneNumber} - ${contact.company} - ${contact.title} - ${contact.group}`}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => onEdit(contact)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(contact.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default ContactItem
