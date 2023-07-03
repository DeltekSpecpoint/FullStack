import React from 'react'

function ContactForm({ onSubmit, children }) {
  const txtNameRef = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) onSubmit({
      name: txtNameRef.current.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={txtNameRef}/>
      {children}
    </form>
  )
}

export default ContactForm