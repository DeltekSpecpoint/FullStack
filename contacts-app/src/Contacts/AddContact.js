import React, {useState, useEffect} from 'react';
import './styles/AddContact.css';

function AddContact(props) {

  const {handleAddContacts} = props;

  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [isEmailError, setIsEmailError] =  useState(false);
  const [isContactNoError, setIsContactNoError] = useState(false);

  useEffect(() => {
    setButtonDisabled(isContactNoError||isEmailError);
  }, [isEmailError, isContactNoError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleAddContacts({
      name: name,
      phone: contactNo,
      email: email
    })
  }



  const handleSetEmail = (emailValue) => {

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(!emailRegex.test(emailValue)){
      setIsEmailError(true)
    } else {
      setIsEmailError(false);
    }

    setEmail(emailValue);
  }

  const handleSetPhone = (phoneValue) => {
    const phoneRegex = /[0-9]{3}-[0-9]{2}-[0-9]{3}/;

    if(!phoneRegex.test(phoneValue)){
      setIsContactNoError(true)
    } else {
      setIsContactNoError(false);
    }

    setContactNo(phoneValue);
  }



  return (
    <form className="addContactContainer">
      <h1 aria-label="Add Contact Form">Add Contact</h1>
      <form className="addContactForm">
        <div>
          <label for="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            aria-label="Contact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label for="contactNo">Contact No:</label>
          <input 
            type="tel" 
            id="contactNo" 
            name="contactNo"
            aria-label="Contact Number"
            value={contactNo}
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            onChange={(e) => handleSetPhone(e.target.value)}
          />
          {isContactNoError && (<span className="errorMessage">Must follow format: xxx-xx-xxx</span>)}
        </div>
        <div>
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            aria-label="Email Address"
            value={email}
            onChange={(e) => handleSetEmail(e.target.value)}
            className={isEmailError ? 'errorField': 'emailField'}
          />
          {isEmailError && (<span className="errorMessage">Email address format invalid</span>)}
        </div>
        <div>
          <button type="button" aria-label="Add Contact" disabled={buttonDisabled} className="submitButton" onClick={handleSubmit}>Submit</button>
        </div> 
      </form>
    </form>
  );
}

export default AddContact;
