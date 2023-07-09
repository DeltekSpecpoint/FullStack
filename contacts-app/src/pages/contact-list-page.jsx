import React from 'react'
import ContactList from "../components/contact-list"
import Page from "../components/page"
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/outline'
import useContacts from '../hooks/use-contacts'
import { NavLink, Outlet } from 'react-router-dom'
import contactEmptyPage from './contact-empty-page'
import contactViewPage from './contact-view-page'
import contactEditPage from './contact-edit-page'
import { ContactsProvider } from '../contexts/contacts-context'
import contactAddPage from './contact-add-page'

function ContactListPage() {
  const { data, loading } = useContacts()

  return (
    <Page 
      title={"Contacts"} 
      leftButton={{ icon: Bars3Icon, onClick: () => console.log('test')}}
      >
      {loading 
        ? (<div>Loading...</div>) 
        : (
          <>
            <div className='lg:flex'>
              <ContactList items={Object.values(data.items)}/>
              <div className='px-6 lg:flex-1'>
                <Outlet/>
              </div>
            </div>
            <NavLink to={'/add'}
              className='fixed flex items-center justify-center w-12 h-12 rounded-lg shadow-md bg-sky-500 bottom-10 right-6 text-sky-950'>
              <PlusIcon className='w-6 h-6'/>
            </NavLink>
          </>
        )
      }
    </Page>
  )
}

const route = {
  path: '/',
  element: (
    <ContactsProvider>
      <ContactListPage/>
    </ContactsProvider>
  ),
  children: [
    contactEmptyPage,
    contactViewPage,
    contactEditPage,
    contactAddPage
  ]  
}

export default route