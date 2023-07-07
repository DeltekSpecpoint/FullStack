import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, IconButton, Badge, Icon } from "@mui/material"
import { NavLink } from "react-router-dom"

function ContactList({ items, onDelete }) {

  const handleDelete = (value) => {
    if (onDelete) onDelete(value)
  }

  return (
    <List>
      {items.map(item => <ContactListItem key={item.id} value={item} onDelete={value => handleDelete(value)}/>)}
    </List>
  )
}

function ContactListItem({ value, onDelete }) {

  const handleDelete = () => {
    if (onDelete) onDelete(value)
  }

  return (
    <ListItem alignItems="flex-start" secondaryAction={<IconButton edge="end" aria-label="delete">
    <MoreVertIcon />
  </IconButton>}>
      <ListItemAvatar>
        <Badge
          overlap='circular'
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          badgeContent={<Icon component={StarIcon} color='warning' fontSize='small'/>}
          >
          <Avatar 
            src="https://xsgames.co/randomusers/assets/avatars/female/20.jpg"
            />
        </Badge>
      </ListItemAvatar>
      <ListItemButton component={NavLink}
    to={`/edit/${value.id}`}>

      <ListItemText
        primary={value.name}
        secondary={value.mobileNumber}
        />
        </ListItemButton>
    </ListItem>
  )
}

ContactList.Item = ContactListItem

export default ContactList