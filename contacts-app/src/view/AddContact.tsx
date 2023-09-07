import Form from "../components/Form";
import { Grid, Box, Typography } from "@mui/material";
import ContactService from "../services/ContactService";
import { TContactInformationPayload } from "../types/TContacts";
import { useNavigate  } from "react-router-dom";

const AddContact = () => {
  const contactService = new ContactService();
  const navigate = useNavigate();

  const submitForm = async (contact: TContactInformationPayload) => {
    const response: string = await contactService.addContact(contact);
    alert(response);
    navigate("/");
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="contact"
    >
      <Grid item xs={12} md={4}>
        <Box sx={{ p: 2 }}>
          <div className="c-background-blue c-color-white c-flex c-justify-sb c-p-5">
            <Typography variant="h4">
              Add Contact
            </Typography>
          </div>
          <div>
            <Form submitForm={submitForm}/>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}

export default AddContact;