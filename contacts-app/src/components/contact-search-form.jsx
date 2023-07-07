import { Button, InputBase, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
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
      <div style={{display: "flex"}}>
        <InputBase
          inputRef={inputRef}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Contacts"
          inputProps={{ 'aria-label': 'search google maps' }}
          />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
    </form>
  )
}

export default ContactSearchForm