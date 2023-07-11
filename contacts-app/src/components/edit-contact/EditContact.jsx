import React, { useState, useEffect } from 'react';
import Form from '../form/Form';
import { editContact, getContacts } from '../../service/Api';
import { useNavigate, useParams } from 'react-router-dom';

const initialValue = {
  fullname: "",
  number: "",
  emailAddress: ""
}

const EditContact = () => {
  const [contact, setContact] = useState(initialValue);
  const { fullName, number, emailAddress } = contact;
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
    setContact({...contact, [e.target.name]: e.target.value});
  };

  const editContactDetails = async() => {
    const response = await editContact(id, contact);
    navigate('/');
  }

  return (
    <Form
      title="Edit Contact Details"
      onChange={(e) => onValueChange(e)}
      fullName={fullName}
      number={number}
      emailAddress={emailAddress}
      onClick={() => editContactDetails()}
      buttonName='Edit Contact'
    />
  )
}

export default EditContact