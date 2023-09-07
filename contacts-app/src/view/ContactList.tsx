import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { IconButton, ListItemIcon, Tooltip, Typography, Stack, Pagination } from '@mui/material';
import { DeleteOutline, ModeEditOutline, Star }  from '@mui/icons-material';
import { useNavigate  } from "react-router-dom";
import { Dispatch, SetStateAction } from 'react';

interface Props {
  contacts: Array<{
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    contactNumber: string,
    email: string,
    isStared: boolean
  }>,
  deleteContact: (id: number) => void,
  page: number,
  limit: number,
  count: number,
  setPage: Dispatch<SetStateAction<number>>
}

const ContactList: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    const nameArray = name.split(' ');
    return nameArray
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  const changeViewToUpdate = (id: number) => {
    navigate(`/updateContact/${id}`);
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    props.setPage(value);
  }

  return (
    <>
      <List>
        {props.contacts.map((contact, index) => (
          <ListItem 
            key={index}
            className="c-flex c-flex-wrap"
            secondaryAction={
              <div>
                <Tooltip title="Edit Contact">
                  <IconButton aria-label="edit" onClick={() => changeViewToUpdate(contact.id)}>
                    <ModeEditOutline/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Contact">
                  <IconButton aria-label="delete" onClick={() => props.deleteContact(contact.id)} >
                    <DeleteOutline />
                  </IconButton>
                </Tooltip>
              </div>
            }
          >
            {contact.isStared && 
              <Tooltip title="Added contact as favorite">
                <ListItemIcon>
                  <Star className="c-color-blue2"/>
                </ListItemIcon>
              </Tooltip>
            }
            <ListItemAvatar>
              <Avatar className="c-background-blue c-fs-m">
                {getInitials(contact.firstName + " " + contact.lastName)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText className='c-pr-8'
              primary={
                <Typography className="c-fw-6 c-flex c-flex-wrap">
                  { contact.firstName + " " + contact.middleName + " " + contact.lastName } 
                </Typography>
              }
              secondary={
                <>
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    {contact.contactNumber}
                  </Typography>
                  <Typography>{contact.email}</Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <Stack spacing={2} justifyContent="center">
        <Pagination
          count={props.count/props.limit}
          page={props.page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </>
  )
}

export default ContactList;