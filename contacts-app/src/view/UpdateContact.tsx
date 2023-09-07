import { Grid, Box, Typography} from "@mui/material";
import Form from "../components/Form";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import { TContactInformation, TContactInformationPayload } from "../types/TContacts";
import ContactService from "../services/ContactService";
import { useNavigate  } from "react-router-dom";

const UpdateContact: React.FC = () => {
  const [contact, setContact] = useState<TContactInformationPayload>({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    contactNumber: '',
    isStared: false,
  });
  const [id, setId] = useState<number>(0);
  const params = useParams();
  const contactService = new ContactService();
  const navigate = useNavigate();

  useEffect(() => {
    const getContact = async () => {
      const response: TContactInformation = await contactService.getContact(Number(params.id));
      setContact(response);
      setId(response.id);
    }
    
    getContact();

  },[])/* eslint-disable-line react-hooks/exhaustive-deps*/

  const submitForm = async (contact: TContactInformationPayload) => {
    const response: string = await contactService.updateContact(id, contact);
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
              Update Contact
            </Typography>
          </div>
          <div>
            <Form 
              id={id} 
              firstName={contact.firstName} 
              lastName={contact.lastName} 
              middleName={contact.middleName} 
              email={contact.email} 
              contactNumber={contact.contactNumber} 
              isStared={contact.isStared}
              submitForm={submitForm}
            />
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}

export default UpdateContact;