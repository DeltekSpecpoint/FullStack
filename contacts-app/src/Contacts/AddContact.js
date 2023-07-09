import React, {useState, useEffect} from 'react';
import './styles/AddContact.css';

function AddContact(props) {

  const {handleAddContacts} = props;

  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    console.log('name', name)
    console.log('contactNo', contactNo)
    console.log('email', email)

    handleAddContacts({
      name: name,
      phone: contactNo,
      email: email
    })
  }

  return (
    <div className="addContactContainer">
      <h1>Add Contact</h1>
      <form className="addContactForm">
        <div>
          <label for="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label for="contactNo">Contact No:</label>
          <input 
            type="text" 
            id="contactNo" 
            name="contactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>
        <div>
          <label for="email">Email:</label>
          <input 
            type="text" 
            id="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div> 
      </form>
    </div>
  );
}

export default AddContact;
