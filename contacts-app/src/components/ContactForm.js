import React, { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material'

const ContactForm = ({ onSubmit, initialValues, onCancel }) => {
  const [contact, setContact] = useState(initialValues || {})

  useEffect(() => {
    setContact(initialValues || {})
  }, [initialValues])

  const handleChange = (e) => {
    const { name, value } = e.target
    const propertyName = name.charAt(0).toLowerCase() + name.slice(1) // Convert the name attribute to camelCase
    const parsedValue =
      propertyName === 'phoneNumber' ? parseInt(value, 10) : value
    setContact({ ...contact, [propertyName]: parsedValue })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(contact, contact.id)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          name="Name"
          label="Name"
          value={contact.name || ''}
          onChange={handleChange}
        />
        <TextField
          name="Email"
          label="Email"
          value={contact.email || ''}
          onChange={handleChange}
        />
        <TextField
          name="PhoneNumber"
          label="Phone Number"
          value={contact.phoneNumber || ''}
          onChange={handleChange}
        />
        <TextField
          name="Company"
          label="Company"
          value={contact.company || ''}
          onChange={handleChange}
        />
        <TextField
          name="Title"
          label="Title"
          value={contact.title || ''}
          onChange={handleChange}
        />
        <TextField
          name="Group"
          label="Group"
          value={contact.group || ''}
          onChange={handleChange}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            {contact.id ? 'Update' : 'Add'} Contact
          </Button>
          {contact.id && (
            <Button onClick={onCancel} variant="outlined" color="secondary">
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </form>
  )
}

export default ContactForm
