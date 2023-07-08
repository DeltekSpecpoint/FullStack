import React, { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import ContactItem from './ContactItem/ContactItem'
import {
  Container,
  Typography,
  Box,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination,
} from '@mui/material'
import api from '../utils'

const ContactList = () => {
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await api.get('Contact')
      setContacts(response.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const handleAddContact = async (contact) => {
    try {
      const response = await api.post('Contact', contact)
      setContacts([...contacts, response.data])
    } catch (error) {
      console.error('Error adding contact:', error)
    }
  }

  const handleUpdateContact = async (id, updatedContact) => {
    try {
      await api.put(`contact/${id}`, updatedContact)
      const updatedContacts = contacts.map((contact) =>
        contact.id === id ? updatedContact : contact
      )
      setContacts(updatedContacts)
      setSelectedContact(null)
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }

  const handleDeleteContact = async (id) => {
    try {
      await api.delete(`Contact/${id}`)
      const updatedContacts = contacts.filter((contact) => contact.id !== id)
      setContacts(updatedContacts)
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    const searchValue = searchTerm.toLowerCase()
    return (
      (contact.name && contact.name.toLowerCase().includes(searchValue)) ||
      (contact.email && contact.email.toLowerCase().includes(searchValue)) ||
      (contact.company &&
        contact.company.toLowerCase().includes(searchValue)) ||
      (contact.title && contact.title.toLowerCase().includes(searchValue)) ||
      (contact.group && contact.group.toLowerCase().includes(searchValue))
    )
  })

  console.log('contacts', contacts)
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact List
        </Typography>
        <ContactForm
          onSubmit={(contact, id) =>
            selectedContact
              ? handleUpdateContact(id, contact)
              : handleAddContact(contact)
          }
          initialValues={selectedContact}
          onCancel={() => setSelectedContact(null)}
        />
        <Box mt={4}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact) => (
                  <ContactItem
                    key={contact.id}
                    contact={contact}
                    onDelete={handleDeleteContact}
                    onEdit={() => setSelectedContact(contact)}
                  />
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={filteredContacts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
      </Box>
    </Container>
  )
}

export default ContactList
