import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/content/Home';
import Contacts from './components/content/Contacts';

function App() {
  return (
    <div className="App container">
      <Navbar />
      <div className="content wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contacts" element={<Contacts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
