import { Typography } from "@mui/material";
import ContactForm from "../../components/contactForm/ContactForm";

function CreateContact({ createContact }) {
  return (
    <div>
      <Typography variant='h5'>Create Contact</Typography>
      <ContactForm createContact={createContact}/>
    </div>
  );
}

export default CreateContact;
