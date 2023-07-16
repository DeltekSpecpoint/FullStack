import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar } from '@mui/material';

function ContactDetails({ selectedContact, setSelectedContact }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedContact) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Grid container>
        <Grid>
          <IconButton
            edge="end"
            onClick={() => {
              setSelectedContact(null);
              navigate("/");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid sx={{ ml: 2, mt: 0.5 }}>
          <Typography variant='h5'>Details</Typography>
        </Grid>
      </Grid>
      <Container component="main" maxWidth="xs">
        <Grid container justifyContent="center" spacing={2}>
          <Grid container justifyContent="center" xs={12}>
            <Avatar sx={{ width: 75, height: 75 }}>
              <Typography variant='h4'>{selectedContact?.firstName.charAt(0)+selectedContact?.lastName.charAt(0)}</Typography>
            </Avatar>
          </Grid>
          <Grid container justifyContent="center" xs={12} sx={{ mt: 1 }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{`${selectedContact?.firstName} ${selectedContact?.middleName ? `${selectedContact?.middleName.charAt(0)}. ` : ""}${selectedContact?.lastName}`}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Phone</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='h7'>{selectedContact?.phone}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Email</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='h7'>{selectedContact?.email}</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ContactDetails;
