import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import NavBar from "./Container/NavBar";
import Header from "./Container/Header";
import ContactList from "./Container/ContactList";
import AddEditContact from "./Components/AddEditContact";
import DeleteContact from "./Components/DeleteContact";

function App() {
  const isAddEditModalOpen = useSelector(
    (state) => state.contactReducer.isAddEditModalOpen
  );
  const isAffirmationModalOpen = useSelector(
    (state) => state.contactReducer.isAffirmationModalOpen
  );

  return (
    <>
      <NavBar />
      <Header />
      <ContactList />
      {isAddEditModalOpen && <AddEditContact />}
      {isAffirmationModalOpen && <DeleteContact />}
    </>
  );
}

export default App;
