import React from 'react'
import ContactList from "../components/contact-list"
import Page from "../components/page"
import { Bars3Icon } from '@heroicons/react/24/outline'

function ContactListPage() {
  return (
    <Page title={"Contacts"} leftButton={{
      icon: Bars3Icon,
      onClick: () => console.log('test')
    }}>
      <ContactList items={[{
        id: 1,
        name: "Joel Manuel",
        mobileNumber: "+639060586149"
      }]}/>
    </Page>
  )
}

export default {
  path: '/',
  element: <ContactListPage/>
}