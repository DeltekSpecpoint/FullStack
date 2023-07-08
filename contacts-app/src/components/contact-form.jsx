import React from 'react'
import usePersistForm from '../hooks/use-persist-form'
import InputGroup from './input-group'

function ContactForm({ value, onSubmit, children }) {
  const { values, onChange, handleSubmit } = usePersistForm({ formValues: value })

  const onFormSubmit = (data) => {
    if (onSubmit) onSubmit(data)
  }

  return (
    <form id="frmContact" onSubmit={handleSubmit(onFormSubmit)}>
      <InputGroup label="Full Name"
        value={values.name}
        onChange={(e) => onChange('name', e.target.value)}
        />
      <InputGroup label="Mobile Number"
        value={values.mobileNumber}
        onChange={(e) => onChange('mobileNumber', e.target.value)}
        />
      {children}
    </form>
  )
}

export default ContactForm