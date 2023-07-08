import logo from './logo.svg';
import './App.css';
import ContactsMaintenance from './modules/contacts';
import { Outlet } from 'react-router-dom';
import { ContactsProvider } from './modules/contacts-context'
import ContactList from './components/contact-list';
function App() {
  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}

export default App;
