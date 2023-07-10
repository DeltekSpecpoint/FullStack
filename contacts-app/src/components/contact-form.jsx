import React from 'react'
import usePersistForm from '../hooks/use-persist-form'
import InputGroup from './input-group'
import Alert from './alert'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

function ContactForm({ value, onSubmit, children }) {
  const { handleSubmit, register, errors, loaded } = usePersistForm({ formValues: value })

  const onFormSubmit = (data) => {
    if (onSubmit) onSubmit(data)
  }

  return (
    <form id="frmContact" onSubmit={handleSubmit(onFormSubmit)}>
      {loaded
        ? (
          <Alert 
            icon={InformationCircleIcon} 
            text={"Data is loaded from previous session."}
            />
        ) 
        : null
      }
      <InputGroup label="Full Name" {...register('name', { required: 'Full Name is required' })} error={errors.name}/>
      <InputGroup label="Mobile Number" {...register('mobileNumber', { required: 'Mobile Number is required' })} error={errors.mobileNumber}/>
      {children}
    </form>
  )
}

export default ContactForm