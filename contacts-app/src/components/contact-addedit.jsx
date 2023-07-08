import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContactForm from "./contact-form"

function ContactsAddEdit({
  value,
  onSubmit,
  onCancel
}) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={onCancel}
            >
            <ArrowBackIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add Contact
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <ContactForm value={value} onSubmit={onSubmit}>
          <div>
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={onCancel}>Cancel</Button>
          </div>
        </ContactForm>
      </Container>
    </Box>
  )
}

export default ContactsAddEdit