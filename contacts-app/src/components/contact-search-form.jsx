import React from 'react'

function ContactSearchForm({ onSubmit }) {
  const inputRef = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!onSubmit) return
    onSubmit(inputRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef}/>
      <button>Search</button>
    </form>
  )
}

export default ContactSearchForm