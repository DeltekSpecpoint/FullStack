import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import axios from 'axios'
import ContactView from './components/contact-view';
import ContactList from './components/contact-list';
import Page from './components/page';
import contactViewPage from './pages/contact-view-page';
import contactListPage from './pages/contact-list-page';

axios.defaults.baseURL = 'http://localhost:5000/api'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      contactListPage,
      contactViewPage
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
