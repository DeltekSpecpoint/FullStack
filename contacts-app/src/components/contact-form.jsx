import React from 'react'

function ContactForm({ value, onSubmit, children }) {
  const txtNameRef = React.useRef(null)
  const txtMobileNumberRef = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) onSubmit({
      name: txtNameRef.current.value,
      mobileNumber: txtMobileNumberRef.current.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input defaultValue={value.name} type="text" ref={txtNameRef}/>
      <input defaultValue={value.mobileNumber} type="text" ref={txtMobileNumberRef}/>
      {children}
    </form>
  )
}

export default ContactForm