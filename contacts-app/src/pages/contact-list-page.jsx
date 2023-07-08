import React, { useEffect } from 'react'
import ContactList from "../components/contact-list"
import Page from "../components/page"
import { Bars3Icon } from '@heroicons/react/24/outline'
import useContacts from '../hooks/use-contacts'
import { Outlet } from 'react-router-dom'
import EmptyContactRoute from './contact-empty-page'
import contactViewPage from './contact-view-page'
import contactEditPage from './contact-edit-page'

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
          <div className='lg:flex'>
            <ContactList items={Object.values(data.items)}/>
            <div className='px-6 lg:flex-1'>
              <Outlet/>
            </div>
          </div>
        )
      }
    </Page>
  )
}

const route = {
  path: '/',
  element: <ContactListPage/>,
  children: [
    EmptyContactRoute,
    contactViewPage,
    contactEditPage
  ]  
}

export default route