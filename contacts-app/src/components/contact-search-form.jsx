import React from 'react'
import InputGroup from './input-group';

function ContactSearchForm({ onSubmit }) {
  const inputRef = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!onSubmit) return
    onSubmit(inputRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex'>
        <input type="text" />
      </div>
    </form>
  )
}

export default ContactSearchForm