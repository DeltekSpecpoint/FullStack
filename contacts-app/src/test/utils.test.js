import { act } from '@testing-library/react-hooks'
import {
  fetchContacts,
  handleAddContact,
  handleDeleteContact,
  handleDeleteSelected,
  handleUpdateContact,
} from '../utils'

describe('fetchContacts', () => {
  it('should fetch contacts and update the state', async () => {
    const api = {
      get: jest.fn().mockResolvedValue({ data: [{ id: 1, name: 'John Doe' }] }),
    }
    const setContacts = jest.fn()

    await act(async () => {
      await fetchContacts(api, setContacts)
    })

    expect(api.get).toHaveBeenCalledWith('Contact')
    expect(setContacts).toHaveBeenCalledWith([{ id: 1, name: 'John Doe' }])
  })

  it('should handle errors when fetching contacts', async () => {
    const api = {
      get: jest.fn().mockRejectedValue(new Error('Error fetching contacts')),
    }
    const setContacts = jest.fn()

    await act(async () => {
      await fetchContacts(api, setContacts)
    })

    expect(api.get).toHaveBeenCalledWith('Contact')
    expect(setContacts).not.toHaveBeenCalled()
  })
})

describe('handleAddContact', () => {
  it('should add a contact and update the state', async () => {
    const api = {
      post: jest
        .fn()
        .mockResolvedValue({ data: { id: 3, name: 'New Contact' } }),
    }
    const contacts = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]
    const setContacts = jest.fn()
    const handleSnackbarOpen = jest.fn()
    const newContact = { name: 'New Contact' }

    await act(async () => {
      await handleAddContact(
        api,
        newContact,
        contacts,
        setContacts,
        handleSnackbarOpen
      )
    })

    expect(api.post).toHaveBeenCalledWith('Contact', newContact)
    expect(setContacts).toHaveBeenCalledWith([
      ...contacts,
      { id: 3, name: 'New Contact' },
    ])
    expect(handleSnackbarOpen).toHaveBeenCalledWith(
      'Contact added successfully!'
    )
  })

  it('should handle errors when adding a contact', async () => {
    const api = {
      post: jest.fn().mockRejectedValue(new Error('Error adding contact')),
    }
    const contacts = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]
    const setContacts = jest.fn()
    const handleSnackbarOpen = jest.fn()
    const newContact = { name: 'New Contact' }

    await act(async () => {
      await handleAddContact(
        api,
        newContact,
        contacts,
        setContacts,
        handleSnackbarOpen
      )
    })

    expect(api.post).toHaveBeenCalledWith('Contact', newContact)
    expect(setContacts).not.toHaveBeenCalled()
    expect(handleSnackbarOpen).not.toHaveBeenCalled()
  })
})

describe('handleUpdateContact', () => {
  it('should update a contact and update the state', async () => {
    const api = {
      put: jest.fn().mockResolvedValue(),
    }
    const contacts = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]
    const setContacts = jest.fn()
    const setSelectedContact = jest.fn()
    const handleSnackbarOpen = jest.fn()
    const id = 1
    const updatedContact = { id: 1, name: 'Updated John Doe' }

    await act(async () => {
      await handleUpdateContact(
        api,
        id,
        updatedContact,
        contacts,
        setContacts,
        setSelectedContact,
        handleSnackbarOpen
      )
    })

    expect(api.put).toHaveBeenCalledWith(`contact/${id}`, updatedContact)
    expect(setContacts).toHaveBeenCalledWith([
      { id: 1, name: 'Updated John Doe' },
      { id: 2, name: 'Jane Doe' },
    ])
    expect(setSelectedContact).toHaveBeenCalledWith(null)
    expect(handleSnackbarOpen).toHaveBeenCalledWith(
      'Contact updated successfully!'
    )
  })

  it('should handle errors when updating a contact', async () => {
    const api = {
      put: jest.fn().mockRejectedValue(new Error('Error updating contact')),
    }
    const contacts = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]
    const setContacts = jest.fn()
    const setSelectedContact = jest.fn()
    const handleSnackbarOpen = jest.fn()
    const id = 1
    const updatedContact = { id: 1, name: 'Updated John Doe' }

    await act(async () => {
      await handleUpdateContact(
        api,
        id,
        updatedContact,
        contacts,
        setContacts,
        setSelectedContact,
        handleSnackbarOpen
      )
    })

    expect(api.put).toHaveBeenCalledWith(`contact/${id}`, updatedContact)
    expect(setContacts).not.toHaveBeenCalled()
    expect(setSelectedContact).not.toHaveBeenCalled()
    expect(handleSnackbarOpen).not.toHaveBeenCalled()
  })
})

describe('handleDeleteContact', () => {
  it('should delete a contact and update the state', async () => {
    const api = {
      delete: jest.fn().mockResolvedValue(),
    }
    const contacts = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]
    const setContacts = jest.fn()
    const handleSnackbarOpen = jest.fn()
    const id = 1

    await act(async () => {
      await handleDeleteContact(
        api,
        id,
        contacts,
        setContacts,
        handleSnackbarOpen
      )
    })

    expect(api.delete).toHaveBeenCalledWith(`Contact/${id}`)
    expect(setContacts).toHaveBeenCalledWith([{ id: 2, name: 'Jane Doe' }])
    expect(handleSnackbarOpen).toHaveBeenCalledWith(
      'Contact deleted successfully!'
    )
  })

  it('should handle errors when deleting a contact', async () => {
    const api = {
      delete: jest.fn().mockRejectedValue(new Error('Error deleting contact')),
    }
    const contacts = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]
    const setContacts = jest.fn()
    const handleSnackbarOpen = jest.fn()
    const id = 1

    await act(async () => {
      await handleDeleteContact(
        api,
        id,
        contacts,
        setContacts,
        handleSnackbarOpen
      )
    })

    expect(api.delete).toHaveBeenCalledWith(`Contact/${id}`)
    expect(setContacts).not.toHaveBeenCalled()
    expect(handleSnackbarOpen).not.toHaveBeenCalled()
  })
})

describe('handleDeleteSelected', () => {
  it('should delete selected contacts and update the state', async () => {
    const api = {
      delete: jest.fn().mockResolvedValue(),
    }
    const contacts = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]
    const selected = [1]
    const setContacts = jest.fn()
    const handleSnackbarOpen = jest.fn()
    const setSelected = jest.fn()
    const setDeleting = jest.fn()

    await act(async () => {
      await handleDeleteSelected(
        api,
        selected,
        contacts,
        setContacts,
        handleSnackbarOpen,
        setSelected,
        setDeleting
      )
    })

    expect(api.delete).toHaveBeenCalledWith(`Contact/${selected[0]}`)
    expect(setContacts).toHaveBeenCalledWith([{ id: 2, name: 'Jane Doe' }])
    expect(handleSnackbarOpen).toHaveBeenCalledWith(
      'Contact deleted successfully!'
    )
    expect(setSelected).toHaveBeenCalledWith([])
    expect(setDeleting).toHaveBeenCalledTimes(2)
  })

  it('should handle errors when deleting selected contacts', async () => {
    const api = {
      delete: jest
        .fn()
        .mockRejectedValue(new Error('Error deleting selected contacts')),
    }
    const contacts = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]
    const selected = [1]
    const setContacts = jest.fn()
    const handleSnackbarOpen = jest.fn()
    const setSelected = jest.fn()
    const setDeleting = jest.fn()

    await act(async () => {
      await handleDeleteSelected(
        api,
        selected,
        contacts,
        setContacts,
        handleSnackbarOpen,
        setSelected,
        setDeleting
      )
    })

    expect(api.delete).toHaveBeenCalledWith(`Contact/${selected[0]}`)
    expect(setContacts).not.toHaveBeenCalled()
    expect(handleSnackbarOpen).not.toHaveBeenCalled()
    expect(setSelected).not.toHaveBeenCalled()
    expect(setDeleting).toHaveBeenCalledTimes(2)
  })
})
