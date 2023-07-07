import React from 'react'
import usePersistForm from '../hooks/use-persist-form'

function ContactForm({ value, onSubmit, children }) {
  const { values, onChange, handleSubmit } = usePersistForm({ formValues: value })

  const onFormSubmit = (data) => {
    if (onSubmit) onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <input value={values.name} type="text" onChange={(e) => onChange('name', e.target.value)}/>
      <input value={values.mobileNumber} type="text" onChange={(e) => onChange('mobileNumber', e.target.value)}/>
      {children}
    </form>
  )
}

export default ContactForm