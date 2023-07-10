import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, CircularProgress } from '@mui/material'
import { validate } from '../utils'

const ContactForm = ({ onSubmit, initialValues, onCancel }) => {
  const [contact, setContact] = useState(initialValues || {})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

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
  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(contact)

    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true)
      try {
        await onSubmit(contact, contact.id)
      } finally {
        setSubmitting(false)
      }
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          name="name"
          label="Name"
          value={contact.name || ''}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={contact.phoneNumber || ''}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <TextField
          name="email"
          label="Email"
          value={contact.email || ''}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              `${contact.id ? 'Update' : 'Add'} Contact`
            )}
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
