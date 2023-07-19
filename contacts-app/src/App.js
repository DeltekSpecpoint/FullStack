import NavBar from "./components/nav-bar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactList from "../src/components/contact-list/ContactList";
import CreateNewContact from "../src/components/create-new-contact/CreateNewContact";
import EditContact from "../src/components/edit-contact/EditContact";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<ContactList />}></Route>
        <Route path="/add" element={<CreateNewContact />}>
        </Route>
        <Route path="/edit/:id" element={<EditContact />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
