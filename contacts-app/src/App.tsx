import React, { useEffect } from 'react';
import './assets/App.css';
import Header from './components/Header';
import Datagrid from './components/Datagrid';
import { Container } from 'react-bootstrap';
import useContactsStorage from './hooks/useContactsStorage';
import { IRowData } from './commonModels';

const App = () => {
  const [contacts, setContacts] = useContactsStorage();

  useEffect(() => {
    // Get BE data on page load
    fetch('https://localhost:5001/api/Contact/GetAllContacts', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      // body: JSON.stringify({})
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data.value);
        setContacts(data.value as IRowData[]);
      })
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Datagrid rowData={contacts} />
      </Container>
    </>
  );
}

export default App