import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import ContactsAdd from './modules/contacts-add';
import ContactsEdit, { loader as contactLoader } from './modules/contacts-edit';
import ContactsMaintenance, { loader as contactListLoader } from './modules/contacts';
import axios from 'axios'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

axios.defaults.baseURL = 'http://localhost:5000/api'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        loader: contactListLoader,
        element: <ContactsMaintenance/>
      },
      {
        path: "/add",
        element: <ContactsAdd/>
      },
      {
        path: "/edit/:id",
        loader: contactLoader,
        element: <ContactsEdit/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
