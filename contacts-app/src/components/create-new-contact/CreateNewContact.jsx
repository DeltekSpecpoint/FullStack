import React from 'react'
import Form from '../form/Form'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addContact } from '../../service/Api';

const initialValue = {
  name: "",
  number: 0,
  email: "",
  address: ""
}

const CreateNewContact = () => {
  const [contact, setContact] = useState(initialValue);
  const { name, number, email, address } = contact;

  let navigate = useNavigate();

  const onValueChange = (e) => {
    e.preventDefault();
    setContact({...contact, [e.target.name]: e.target.value}); 
  };

  const handleSubmit = () => {
    addContact(contact);
    navigate('/');
  };

  return (
    <Form
      title="Create New Contact"
      onChange={(e) => onValueChange(e)}
      name={name}
      number={number}
      email={email}
      address={address}
      hiddenLabel={false}
      finishSubmit={() => handleSubmit()}
    />
  )
}

export default CreateNewContact