import React, { useState, useEffect } from 'react';
import Form from '../form/Form';
import { editContact, getContacts } from '../../service/Api';
import { useNavigate, useParams } from 'react-router-dom';

const EditContact = () => {
  const [contact, setContact] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false)
  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    loadContactDetails();
  }, []);

  
  const loadContactDetails = async () => {
    const response = await getContacts(id);
    setContact(response.data);
  };
  
  const onValueChange = (e) => {
    e.preventDefault();
    setContact({...contact, [e.target.name]: e.target.value});
  };
  
  const editContactDetails = () => {
    setFormErrors(validate(contact));
    setIsSubmit(true);
  }
  
  const finishSubmit = () => {
    editContact(id, contact);
    navigate('/');
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [formErrors]);
  
  const validate = (contact) => {
    let errors = {};
    const nameRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    const numberRegex = /((\+|00)?[1-9]{2}|0)[1-9]([0-9]){8}/;

    if (!contact.name){
      errors.name = "Name is required!";
    }
    if (!contact.number){
      errors.number = "Number is required!";
    } else if(!numberRegex.test(contact.number)){
      errors.number = "This is not a valid phone number!";
    }
    if (!contact.email){
      errors.email = "Email is required!";
    } else if(!nameRegex.test(contact.email)){
      errors.email = "This is not a valid email format!";
    }
    if (!contact.address){
      errors.address = "Address is required!";
    }
    return errors;
  }

  return (
    <Form
      title="Edit Contact Details"
      onChange={(e) => onValueChange(e)}
      name={contact.name}
      number={contact.number}
      email={contact.email}
      address={contact.address}
      onClick={() => editContactDetails()}
      nameError={Boolean(formErrors.name)}
      nameErrorText={formErrors.name}
      numberError={Boolean(formErrors.number)}
      numberErrorText={formErrors.number}
      emailError={Boolean(formErrors.email)}
      emailErrorText={formErrors.email}
      addressError={Boolean(formErrors.address)}
      addressErrorText={formErrors.address}
      hiddenLabel={true}
    />
  )
}

export default EditContact