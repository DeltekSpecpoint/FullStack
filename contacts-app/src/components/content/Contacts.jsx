import axios from "axios";
import { React, useEffect, useState, useRef } from "react";

import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";

import "./table.css";
import useTable from "../../shared/hooks/useTable";

import Footer from "./footer/Footer";
import ContactForm from './ContactForm';

import { getAllUsers, deleteUser } from '../../services/ContactService'

const Contacts = () => {

    const countPerPage = 4;

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [contacts, setContacts] = useState([]);
    const [user, setUser] = useState({});

    const [searchValue, setSearchValue] = useState("");
    const [collection, setCollection] = useState(
        cloneDeep(contacts.slice(0, countPerPage))
    );

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(collection, page, countPerPage);

    const fetchData = async () => {
        const response = await getAllUsers()
        if (!response) {
            throw new Error('Data coud not be fetched!')
        } else {
            return response
        }
    }

    const searchData = useRef(
        throttle(val => {
            fetchData()
                .then((res) => {
                    const query = val.toLowerCase();
                    setPage(1);
                    const data = cloneDeep(
                        res
                            .filter(item => item.name.toLowerCase().indexOf(query) > -1)
                            .slice(0, countPerPage)
                    );

                    setCollection(data);
                })
                .catch((e) => {
                    console.log(e.message)
                });

        }, 400)
    );

    useEffect(() => {

        // if (!contacts || contacts.length < 1) {
        //     console.log(`doesn't have contacts`);
        //     (async () => await load())();
        // }
        // else {
        //     console.log(`has contacts`);
        // }

        (async () => await load())();


        if (!searchValue) {
            updatePage(1);
        } else {
            searchData.current(searchValue);
        }

    }, [searchValue]);

    const updatePage = p => {
        setPage(p);
        // const to = countPerPage * p;
        // const from = to - countPerPage;
        // setCollection(cloneDeep(contacts));
    };

    const load = async () => {

        const result = await getAllUsers();
        setContacts(result);
        setCollection(result);

        console.log(`LOAD`);
        console.log(contacts);
    }

    const ediContact = async (contact) => {
        setName(contact.name);
        setEmail(contact.email);
        setMobileNumber(contact.mobileNumber);
        setId(contact.id);

        setUser(contact);
    }

    // const deleteUser = useRef(
    //     throttle(id => {
    //         deleteUser(id);
    //     }, 400)
    // );

    const deleteContact = async (id) => {
        try {
            console.log(`DELETE`);
            await deleteUser(id);

            (async () => await load())();
        } catch (err) {
            alert(err);
        }
    }

    return (
        <>
            <div className="search">
                <input
                    placeholder="Search User"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
            </div>
            <table className='table'>
                <thead className='tableRowHeader'>
                    <tr>
                        <th className='tableHeader'>Id</th>
                        <th className='tableHeader'>Name</th>
                        <th className='tableHeader'>Email Address</th>
                        <th className='tableHeader'>Mobile Number</th>
                        <th className='tableHeader'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((con, index) => (
                        <tr className='tableRowItems' key={index}>
                            <td className='tableCell'>{con.id}</td>
                            <td className='tableCell'>{con.name}</td>
                            <td className='tableCell'>{con.email}</td>
                            <td className='tableCell'>{con.mobileNumber}</td>
                            <td className='tableCell'>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => ediContact(con)}>Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={async () => await deleteContact(con.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer data={range} slice={slice} setPage={setPage} page={page} />

            <ContactForm user={user} setUser={setUser} id={id} name={name} setName={setName} email={email} setEmail={setEmail} mobileNumber={mobileNumber} setMobileNumber={setMobileNumber} />
        </>
    );
}

export default Contacts;