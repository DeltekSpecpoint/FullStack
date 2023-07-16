import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ContactForm from '../../components/contactForm/ContactForm';

function EditContact({ selectedContact, setSelectedContact, updateContact }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedContact) {
      navigate("/");
    }
  }, []);
  
  return (
    <div>
      <Typography variant='h5'>Edit Contact</Typography>
      <ContactForm selectedContact={selectedContact} setSelectedContact={setSelectedContact} updateContact={updateContact} />
    </div>
  );
}

export default EditContact;
