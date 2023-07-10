import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, CircularProgress } from '@mui/material'
import { validate } from '../../utils'
import './ContactForm.css'

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
        setContact({})
        setErrors({})
      }
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gridColumnGap={2}
        gridRowGap={2}
        className="form-container"
      >
        <TextField
          name="name"
          label="Name"
          value={contact.name || ''}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          required
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={contact.phoneNumber || ''}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          required
        />
        <TextField
          name="email"
          label="Email"
          value={contact.email || ''}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          style={{ gridColumn: '1 / -1' }}
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
          style={{ gridColumn: '1 / -1' }}
        />
      </Box>
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
            `${contact.id ? 'Update' : 'Add new'} Contact`
          )}
        </Button>
        {contact.id && (
          <Button
            onClick={onCancel}
            variant="outlined"
            color="secondary"
            className="cancel-btn"
          >
            Cancel
          </Button>
        )}
      </Box>
    </form>
  )
}

export default ContactForm
