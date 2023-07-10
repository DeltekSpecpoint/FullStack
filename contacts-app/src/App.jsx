import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import ContactList from './components/ContactList'

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContactList />
    </ThemeProvider>
  )
}

export default App
