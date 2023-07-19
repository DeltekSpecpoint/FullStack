// import React from 'react'
import "./NavBar.css"
import { AppBar, Button, Toolbar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { PersonAdd } from '@mui/icons-material'

const NavBar = () => {
  return (
    <AppBar className='app-bar'>
        <Toolbar className='toolbar'>
            <NavLink className='tab' to="/" exact>Contact List</NavLink>
            <NavLink className='tab' to="/add">
              <Button variant='contained' startIcon={<PersonAdd />}>Create New Contact</Button>
            </NavLink>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar