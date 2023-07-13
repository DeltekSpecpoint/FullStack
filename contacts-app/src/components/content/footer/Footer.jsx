import React, { useEffect } from "react";

import styles from "./footer.css";

const Footer = ({ data, setPage, page, slice }) => {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);

    return (
        <div className='tableFooter'>
            {data.map((el, index) => (
                <button
                    key={index}
                    className={`button ${page === el ? 'activeButton' : 'inactiveButton'}`}
                    onClick={() => setPage(el)}
                >
                    {el}
                </button>
            ))}
        </div>
    );
};

export default Footer;