import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CreateContact from './components/CreateContact';
import ContactList from './components/ContactList';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/contactList' element={<ContactList />} />
            <Route path='/create' element={<CreateContact/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter