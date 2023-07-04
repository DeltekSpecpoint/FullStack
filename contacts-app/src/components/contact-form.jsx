import React from 'react'

function ContactForm({ value, onSubmit, children }) {
  const txtNameRef = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) onSubmit({
      name: txtNameRef.current.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input defaultValue={value.name} type="text" ref={txtNameRef}/>
      {children}
    </form>
  )
}

export default ContactForm