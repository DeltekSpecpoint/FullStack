import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../form/Form';

const initialValue = {
  fullname: "",
  number: "",
  emailAddress: ""
}

const EditContact = () => {
  const [contact, setContact] = useState(initialValue);
  const { fullName, number, emailAddress } = contact;

  let navigate = useNavigate();

  const onValueChange = (e) => {
    setContact({...contact, [e.target.name]: e.target.value});
  };

  const editContactDetails = async() => {
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