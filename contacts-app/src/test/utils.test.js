import { act } from '@testing-library/react-hooks'
import { fetchContacts, handleAddContact } from '../utils'

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
