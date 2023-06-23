import { useState, useEffect } from "react";

function getSavedValue(key: string, initialValue: any) {
    const savedValue = JSON.parse(localStorage.getItem(key) || '');
    if (savedValue) {
        return savedValue;
    }
    else {
        return initialValue;
    }
}

const useContactsStorage = (key: string, initialValue: any) => {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}

export default useContactsStorage