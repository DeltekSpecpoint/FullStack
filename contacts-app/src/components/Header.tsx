import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <Nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Contacts</Navbar.Brand>
      </Container>
    </Nav>
  )
}

export default Header