import React from 'react'
import './assets/App.css'
import Header from './components/Header'
import Datagrid from './components/Datagrid'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Datagrid />
      </Container>
    </>
  );
}

export default App