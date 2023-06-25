import { useState, useEffect } from "react";
import { IRowData } from '../commonModels';

const useContactsStorage = () => {
    const contactsKey = 'Contacts';
    const [contacts, setContacts] = useState<IRowData[]>(() => {
        const initVal = localStorage.getItem(contactsKey) || '';
        if (initVal !== '') {
            return JSON.parse(initVal) as IRowData[];
        }
        else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(contactsKey, JSON.stringify(contacts));
    }, [contacts, setContacts]);

    return { contacts, setContacts };
}

export default useContactsStorage