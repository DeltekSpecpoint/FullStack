import React from 'react'
import Form from '../form/Form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addContact } from '../../service/Api';

const initialValue = {
  fullname: "",
  number: "",
  emailAddress: ""
}

const CreateNewContact = () => {
  const [contact, setContact] = useState(initialValue);
  const { fullName, number, emailAddress } = contact;

  let navigate = useNavigate();

  const onValueChange = (e) => {
    setContact({...contact, [e.target.name]: e.target.value});
  };

  const addNewContact = async() => {
    await addContact(contact);
    navigate('/');
  }
  return (
    <Form
      title="Create New Contact"
      onChange={(e) => onValueChange(e)}
      fullName={fullName}
      number={number}
      emailAddress={emailAddress}
      onClick={() => addNewContact()}
      buttonName='Edit Contact'
    />
  )
}

export default CreateNewContact