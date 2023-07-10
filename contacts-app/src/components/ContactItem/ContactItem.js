import React from 'react'
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const ContactItem = ({
  contact,
  selected,
  onClick,
  onDelete,
  onEdit,
  onToggleStarred,
}) => {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={selected}
          onClick={(event) => onClick(event, contact.id)}
        />
      </TableCell>
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
        <IconButton
          aria-label="starred"
          onClick={() => onToggleStarred(contact.id)}
        >
          {contact.starred ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ContactItem
