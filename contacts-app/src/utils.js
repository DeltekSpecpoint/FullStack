export const validate = (formData) => {
  const newErrors = {}

  // Name field validation
  if (!formData.name || formData.name.trim() === '') {
    newErrors.name = 'Name is required'
  }

  // Phone Number field validation
  if (!formData.phoneNumber) {
    newErrors.phoneNumber = 'Phone Number is required'
  } else if (!/^\d+$/.test(formData.phoneNumber)) {
    newErrors.phoneNumber = 'Phone Number must be a valid number'
  }

  // Email field validation
  if (!formData.email || formData.email.trim() === '') {
    newErrors.email = 'Email is required'
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
  ) {
    newErrors.email = 'Invalid email address'
  }

  return newErrors
}

export const fetchContacts = async (api, setContacts) => {
  try {
    const response = await api.get('Contact')
    setContacts(response.data)
  } catch (error) {
    console.error('Error fetching contacts:', error)
  }
}

export const handleAddContact = async (
  api,
  contact,
  contacts,
  setContacts,
  handleSnackbarOpen
) => {
  try {
    const response = await api.post('Contact', contact)
    setContacts([...contacts, response.data])
    handleSnackbarOpen('Contact added successfully!')
  } catch (error) {
    console.error('Error adding contact:', error)
  }
}

export const handleUpdateContact = async (
  api,
  id,
  updatedContact,
  contacts,
  setContacts,
  setSelectedContact,
  handleSnackbarOpen
) => {
  try {
    await api.put(`contact/${id}`, updatedContact)
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? updatedContact : contact
    )
    setContacts(updatedContacts)
    setSelectedContact(null)
    handleSnackbarOpen('Contact updated successfully!')
  } catch (error) {
    console.error('Error updating contact:', error)
  }
}

export const handleDeleteContact = async (
  api,
  id,
  contacts,
  setContacts,
  handleSnackbarOpen
) => {
  try {
    await api.delete(`Contact/${id}`)
    const updatedContacts = contacts.filter((contact) => contact.id !== id)
    setContacts(updatedContacts)
    handleSnackbarOpen('Contact deleted successfully!')
  } catch (error) {
    console.error('Error deleting contact:', error)
  }
}

export const handleDeleteSelected = async (
  api,
  selected,
  contacts,
  setContacts,
  handleSnackbarOpen,
  setSelected,
  setDeleting
) => {
  setDeleting(true)
  try {
    await Promise.all(selected.map((id) => api.delete(`Contact/${id}`)))
    const updatedContacts = contacts.filter(
      (contact) => !selected.includes(contact.id)
    )
    setContacts(updatedContacts)
    handleSnackbarOpen('Contact deleted successfully!')
    setSelected([])
  } catch (error) {
    console.error('Error deleting selected contacts:', error)
  } finally {
    setDeleting(false)
  }
}
