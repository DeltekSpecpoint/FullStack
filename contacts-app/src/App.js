import logo from './logo.svg';
import './App.css';
import ContactsMaintenance from './modules/contacts';
import { Outlet } from 'react-router-dom';
import { ContactsProvider } from './modules/contacts-context'
function App() {
  return (
    <div className="App">
      <ContactsProvider>
        <Outlet/>
      </ContactsProvider>
    </div>
  );
}

export default App;
