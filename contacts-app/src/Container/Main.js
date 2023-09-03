import React, {useEffect, useState, useContext} from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import NavBar from './NavBar';
import Header from './Header';
import ContactList from './ContactList';


export default function Main() {
    const { contacts } = useContext(GlobalContext);
  return (
    <div>
      <NavBar contacts = {contacts} />
      <Header contacts = {contacts} />
      <ContactList contacts = {contacts}/>
    </div>
  )
}
