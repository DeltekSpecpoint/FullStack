import React, { useState, useEffect } from 'react';
import Form from '../form/Form';
import { editContact, getContacts } from '../../service/Api';
import { useNavigate, useParams } from 'react-router-dom';

const EditContact = () => {
  const [contact, setContact] = useState({});
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

  const editContactDetails = async() => {
    await editContact(id, contact);
    navigate('/');
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
    />
  )
}

export default EditContact