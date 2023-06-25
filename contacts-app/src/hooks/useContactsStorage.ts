import { useState, useEffect } from "react";

const useContactsStorage = () => {
    const contactsKey = 'contactsKey';
    const [contacts, setContacts] = useState(() => {
        const initVal = localStorage.getItem(contactsKey) || '';
        if (initVal !== '') {
            const savedValue = JSON.parse(initVal);
            return savedValue;
        }
        else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(contactsKey, JSON.stringify(contacts));
    }, [contacts]);

    return [contacts, setContacts];
}

export default useContactsStorage