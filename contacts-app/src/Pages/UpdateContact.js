import React, { useState } from 'react';

function UpdateContact(props) {
    const [name, setName] = useState(props.contact.name);
    const [number, setNumber] = useState(props.contact.number);
    const [email, setEmail] = useState(props.contact.emailAddress);
    const [address, setAddress] = useState(props.contact.address);

    let buildUpdateJson = event => {
        let json = 
        {
            "contactId": props.contact.contactId,
            "name": name,
            "number": number,
            "emailAddress": email,
            "address": address
        }
        props.handleUpdateContact(props.contact.contactId, json);
    };

    let handleNameChange = event => {
        setName(event.target.value)
    };

    let handleNumberChange = event => {
        setNumber(event.target.value)
    };

    let handleEmailChange = event => {
        setEmail(event.target.value)
    };

    let handleAddressChange = event => {
        setAddress(event.target.value)
    };
    
    return (
        <div className="signup-form col-md-8 col mx-auto">
            <h2>Update Contact</h2>
            <div className="form-group">
                <div className="row">
                    <div className="col"><input type="text" className="form-control" placeholder="Name" required="required" value={name} onChange={handleNameChange}></input></div>
                </div>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" name="Number" placeholder="Number" required="required" value={number} onChange={handleNumberChange}></input>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" name="email" placeholder="Email" required="required" value={email} onChange={handleEmailChange}></input>
            </div>  
            <div className="form-group">
                <input type="text" className="form-control" name="Address" required="required" value={address} onChange={handleAddressChange}></input>
            </div>
            <div className="form-group">
                <div className="row">
                <div className="col"><button type="submit" className="btn btn-success btn-lg btn-block" onClick={buildUpdateJson}>Update</button></div>
                <div className="col"><button type="submit" className="btn btn-success btn-lg btn-block" onClick={props.handleBack}>Back</button></div>
                </div>
            </div>
        </div>
    );
}

export default UpdateContact;