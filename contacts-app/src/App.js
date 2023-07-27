import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import AddBtn from './assets/AddBtn.svg';
import CreateContact from './components/CreateContact';
import ContactListIcon from './assets/ContactListIcon.svg';
import AddContactIcon from './assets/AddContactIcon.svg';
import UpdateContactIcon from './assets/UpdateContactIcon.svg';
import SearchIcon from './assets/SearchIcon.svg';
import ContactList from './components/ContactList';
import Info from './components/Info.js';

function App() {
  const [contactInfo, setContactInfo] = useState({});
  const [contacts, setContacts] = useState([]);
  const [main, setMain] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    getContactList();
  }, []);

  const getContactList = () => {
    axios.get("/api/Contacts")
      .then((response) => {
        setContacts(response.data);
      })
      .catch(error => console.log(error));
  }

  const changeMain = (val, data) => {
    setMain(val);
    setContactInfo(data);
  }

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = contacts.filter((item) =>
      item.fullName.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults([...filteredResults]);
  };

  const handleClickOutside = (event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="container center">
      <div className="sidebar">
        <div className="app-name hidden"><b>TITLE</b></div>
        <div className="menu-cont">

          <div className='menu-item-cont' id={main === "" ? "selected" : ""} onClick={() => setMain("")}>
            <div className='menu-icon'><img src={ContactListIcon} className='menu-icon' /></div>
            <div class="menu-text hidden" >Contacts</div>
          </div>

          <div className='menu-item-cont' id={main === "create" ? "selected" : ""} onClick={() => setMain("create")}>
            <div className='menu-icon'><img src={AddContactIcon} className='menu-icon' /></div>
            <div class="menu-text hidden" >Add Contact</div>
          </div>

          {main === "update" ?
            <div className='menu-item-cont' id={main === "update" ? "selected" : ""} onClick={() => setMain("update")}>
              <div className='menu-icon'><img src={UpdateContactIcon} className='menu-icon' /></div>
              <div class="menu-text hidden" >Update Contact</div>
            </div> : ""}

          {main === "info" ?
            <div className='menu-item-cont' id={main === "info" ? "selected" : ""} onClick={() => setMain("update")}>
              <div className='menu-icon'><img src={UpdateContactIcon} className='menu-icon' /></div>
              <div class="menu-text" >Contact Info</div>
            </div> : ""}

        </div>
      </div>
      <div className="column2">
        <header>
          <div className="title-cont">
            Contacts
          </div>
          <div className="add-btn-cont">
            <img class="med-btn" src={AddBtn} onClick={() => setMain("create")} />
          </div>
        </header>
        <article id="bg-color">
          <div className="taskbar-container">
            <div className='tb-col1'></div>
            <div className='tb-col2'>
            { main !== "" ? '' :
              <div className='search-input-cont'>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={handleSearch}
                  onFocus={handleFocus}
                />
                {
                    searchResults.length > 0 && (
                      <div className="search-results" ref={searchResultsRef}>
                        {searchResults.map((contact) => (
                          <div className="item-result" onClick={() => changeMain("info", contact)}>{contact.fullName}</div>
                        ))}
                      </div>
                    )
                }
                <img className="search-icon" src={SearchIcon} />
              </div>
            }
            </div>
          </div>
          {
            main === "update" ? <Info contactInfo={contactInfo} changeMain={changeMain}/> :
              main === "create" ? <CreateContact changeMain={changeMain} getContactList={getContactList} /> :
                  main=== "info" ? <Info contactInfo={contactInfo} changeMain={changeMain}/> :
                     <ContactList changeMain={changeMain} />
          }
        </article>
        <footer>
          <div className="footer-text-cont">
            © All Rights Reserved, JSC Inc.
          </div>
          <div className="add-btn-cont">
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
