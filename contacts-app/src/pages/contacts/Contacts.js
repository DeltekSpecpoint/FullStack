import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import ContactList from "../../components/contactList/ContactList";
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Contacts({ contacts, setSelectedContact, deleteContact}) {
  return (
    <div>
      <Grid container sx={{ mt: 3 }} >
        <Grid item xs={6} sx={{ mt: 0.5 }} >
          <Typography>Contacts ({contacts.length})</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Link to="/createcontact">
              <Button
                type="button"
                variant="contained"
              >
                <AddIcon />Create
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
      <ContactList
        contacts={contacts}
        setSelectedContact={setSelectedContact}
        deleteContact={deleteContact}
      />
    </div>
  );
}

export default Contacts;
