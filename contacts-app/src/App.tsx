import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contacts from "./view/Contacts" ;
import AddContact from "./view/AddContact" ;
import UpdateContact from "./view/UpdateContact" ;

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Contacts/>} />
          <Route path = "/addContact" element={<AddContact/>} />
          <Route path = "/updateContact/:id" element={<UpdateContact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
