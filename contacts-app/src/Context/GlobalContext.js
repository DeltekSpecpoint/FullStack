import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

// Create a provider component to wrap your app
export function GlobalProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [isUpdateNeeded, setIsUpdateNeeded] = useState(false);

  useEffect(() => {
        getContacts();
    }, [isUpdateNeeded]);

    const getContacts = async () => {
        await axios.get('https://localhost:44305/api/Contact/GetAll?page=1&pagesize=12')
        .then((response) => {
            setContacts(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        };
        const handleUpdate = () => {
        setIsUpdateNeeded(!isUpdateNeeded);
    };

    const deleteContact = async id => {
        axios({
            method: 'DELETE',
            url: `https://localhost:44305/api/Contact/DeleteContact/${id}`
          })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => console.error(err));
    }

  return (
    <GlobalContext.Provider value={{ contacts, handleUpdate, deleteContact }}>
      {children}
    </GlobalContext.Provider>
  );
}
