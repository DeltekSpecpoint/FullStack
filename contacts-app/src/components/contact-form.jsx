import React from 'react'
import usePersistForm from '../hooks/use-persist-form'
import InputGroup from './input-group'

function ContactForm({ value, onSubmit, children }) {
  const { handleSubmit, register } = usePersistForm({ formValues: value })

  const onFormSubmit = (data) => {
    if (onSubmit) onSubmit(data)
  }

  return (
    <form id="frmContact" onSubmit={handleSubmit(onFormSubmit)}>
      <InputGroup label="Full Name" {...register('name')} />
      <InputGroup label="Mobile Number" {...register('mobileNumber')} />
      {children}
    </form>
  )
}

export default ContactForm