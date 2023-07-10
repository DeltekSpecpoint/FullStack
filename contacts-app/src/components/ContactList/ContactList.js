import React, { useState, useEffect, useMemo } from 'react'
import ContactForm from '../ContactForm'
import ContactItem from '../ContactItem/ContactItem'
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
  TableSortLabel,
  Checkbox,
  Button,
  Snackbar,
  CircularProgress,
  InputAdornment,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import SearchIcon from '@mui/icons-material/Search'
import api from '../../api'
import { getComparator, stableSort } from '../../sort'
import './ContactList.css'
import {
  fetchContacts,
  handleAddContact,
  handleDeleteSelected,
  handleUpdateContact,
} from '../../utils'

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'phoneNumber', label: 'Phone Number' },
  { id: 'company', label: 'Company' },
  { id: 'title', label: 'Title' },
  { id: 'group', label: 'Group' },
  { id: 'actions', label: 'Actions' },
]

const ContactList = () => {
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [selected, setSelected] = useState([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [showStarred, setShowStarred] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const toggleShowStarred = () => {
    setShowStarred(!showStarred)
  }

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message)
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredContacts.map((contact) => contact.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    fetchContacts(api, setContacts)
  }, [])

  const handleToggleStarred = (id) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, starred: !contact.starred } : contact
    )
    setContacts(updatedContacts)
  }

  const filteredContacts = useMemo(() => {
    return contacts
      .filter((contact) => {
        if (showStarred) {
          return contact.starred
        }
        return true
      })
      .filter((contact) => {
        const searchValue = searchTerm.toLowerCase()
        return (
          (contact.name && contact.name.toLowerCase().includes(searchValue)) ||
          (contact.email &&
            contact.email.toLowerCase().includes(searchValue)) ||
          (contact.company &&
            contact.company.toLowerCase().includes(searchValue)) ||
          (contact.title &&
            contact.title.toLowerCase().includes(searchValue)) ||
          (contact.group && contact.group.toLowerCase().includes(searchValue))
        )
      })
  }, [contacts, searchTerm, showStarred])

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Let's add or update your contacts!
        </Typography>

        <ContactForm
          onSubmit={(contact, id) =>
            selectedContact
              ? handleUpdateContact(
                  api,
                  id,
                  updatedContact,
                  contacts,
                  setContacts,
                  setSelectedContact,
                  handleSnackbarOpen
                )
              : handleAddContact(
                  api,
                  contact,
                  contacts,
                  setContacts,
                  handleSnackbarOpen
                )
          }
          initialValues={selectedContact}
          onCancel={() => setSelectedContact(null)}
        />
        <Box mt={4}>
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            paddingBottom={'20px'}
            paddingTop={'20px'}
          >
            <TextField
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              width="50%"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box mt={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteSelected(
                  api,
                  selected,
                  contacts,
                  setContacts,
                  handleSnackbarOpen,
                  setSelected,
                  setDeleting
                )}
                disabled={selected.length === 0 || deleting}
              >
                {deleting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Delete Selected'
                )}
              </Button>
              <Button
                onClick={toggleShowStarred}
                variant="outlined"
                color="primary"
                className="star-btn"
              >
                {showStarred ? 'Show All Contacts' : 'Show Starred Contacts'}
              </Button>
            </Box>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < filteredContacts.length
                    }
                    checked={
                      filteredContacts.length > 0 &&
                      selected.length === filteredContacts.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    {headCell.id === 'actions' ? (
                      headCell.label
                    ) : (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={(event) =>
                          handleRequestSort(event, headCell.id)
                        }
                      >
                        {headCell.label}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(filteredContacts, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact) => {
                  const isItemSelected = selected.indexOf(contact.id) !== -1
                  return (
                    <ContactItem
                      key={contact.id}
                      contact={contact}
                      selected={isItemSelected}
                      onClick={(event) => handleClick(event, contact.id)}
                      onDelete={handleDeleteContact(
                        api,
                        id,
                        contacts,
                        setContacts,
                        handleSnackbarOpen
                      )}
                      onEdit={() => setSelectedContact(contact)}
                      onToggleStarred={handleToggleStarred}
                    />
                  )
                })}
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ContactList
