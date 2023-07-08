import React from 'react'
import usePersistForm from '../hooks/use-persist-form'
import { TextField } from '@mui/material'

function ContactForm({ value, onSubmit, children }) {
  const { values, onChange, handleSubmit } = usePersistForm({ formValues: value })

  const onFormSubmit = (data) => {
    if (onSubmit) onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <TextField 
        label="Full Name"
        value={values.name}
        onChange={(e) => onChange('name', e.target.value)}/>
      <TextField 
        label="Mobile Number"
        value={values.mobileNumber}
        onChange={(e) => onChange('mobileNumber', e.target.value)}/>
      {children}
    </form>
  )
}

export default ContactForm