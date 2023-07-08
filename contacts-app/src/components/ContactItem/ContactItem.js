import React from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ContactItem = ({ contact, onDelete, onEdit }) => {
  return (
    <TableRow>
      <TableCell>{contact.name}</TableCell>
      <TableCell>{contact.email}</TableCell>
      <TableCell>{contact.phoneNumber}</TableCell>
      <TableCell>{contact.company}</TableCell>
      <TableCell>{contact.title}</TableCell>
      <TableCell>{contact.group}</TableCell>
      <TableCell>
        <IconButton aria-label="edit" onClick={() => onEdit(contact)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => onDelete(contact.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ContactItem
