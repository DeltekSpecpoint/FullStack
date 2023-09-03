// import React, {useEffect, useState, useContext} from 'react';
// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
// import './App.css';
// import ContactList from './Container/ContactList';
// import NavBar from './Container/NavBar';
// import AddEditContact from './Components/AddEditContact';
// import DeleteContact from './Components/DeleteContact';
// import Header from './Container/Header';
// import PaginationButtons from './Container/Pagination';
// import axios from 'axios';
// import { GlobalProvider } from './Context/GlobalContext';
// import Main from './Container/Main';
// function App() {
//   const [contacts, setContacts] = useState([]);
//   const [visibleContacts, setVisibleContacts] = useState(contacts);

//   const [isUpdateNeeded, setIsUpdateNeeded] = useState(false);

  
//   useEffect(() => {
//       axios.get('https://localhost:44305/api/Contact/GetAll?page=1&pagesize=12')
//               .then((response) => {
//                   setContacts(response.data);
//                   setVisibleContacts(response.data);
//                   console.log(response.data)
//               })
//               .catch((error) => {
//                   console.error('Error:', error);
//               })
//   }, [isUpdateNeeded]);
//   const handleUpdate = () => {
//       setIsUpdateNeeded(!isUpdateNeeded);
//     };
  

//   return (
//       <BrowserRouter>
//       {console.log("APP")}
//       <NavBar contacts = {contacts} onUpdate={handleUpdate}/>
//       <Header contacts = {contacts} onUpdate={handleUpdate}/>
//       <Routes>
//         <Route index element = {<ContactList visibleContacts = {visibleContacts} contacts = {contacts} onUpdate={handleUpdate}/>}/>
//         {/* <Route path = "/Create" element = {<ContactList/>}/> */}
//         {/* <Route path = "/update" element = {<><ContactList/><AddEditContact /></>}/> */}
//         {/* <Route path = "/Delete" element = {<DeleteContact id = {contact.Id} contact = {contact}/>}/> */}
//         {/* <Route path = "*" element = {<NotFound/>}/> */}
//       </Routes>
//       {/* <PaginationButtons contacts = {contacts}/> */}
//       </BrowserRouter>
//       // <GlobalProvider>
//       //   <BrowserRouter>
//       //     <Routes>
//       //       <Route index element = {<Main/>} />
//       //     </Routes>
//       //   </BrowserRouter>
//       // </GlobalProvider>

//   );
// }
// export default App;
// // function AppWithProvider() {
// //   return (
// //     <GlobalProvider>
// //       <App />
// //     </GlobalProvider>
// //   );
// // }

// // export default AppWithProvider;


import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { GlobalProvider } from './Context/GlobalContext';
import Main from './Container/Main';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
