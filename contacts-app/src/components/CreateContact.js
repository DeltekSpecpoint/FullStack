import React, { useState, useRef } from 'react'
import axios from 'axios';
import Contact from '../assets/Contact.jpg';
import { Modal, Box, TextField, InputAdornment, InputLabel } from '@mui/material';
import CloseBtn from '../assets/CloseBtn.svg'

const CreateContact = (props) => {
    const [isOpenConfirmationPopUp, setIsOpenConfirmationPopUp] = useState(false);
    const [inputData, setInputData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
      });

    const handleConfirmationClose = () => {
        setIsOpenConfirmationPopUp(false);
        props.changeMain("");
      };

    const fields = [
        { id: "fullName", name: "fullName", placeholder: "Name", type: "text" },
        { id: "phone", name: "phone", placeholder: "Phone", type: "number"  },
        { id: "email", name: "email", placeholder: "Email", type: "text" },
        { id: "address", name: "address", placeholder: "Address", type: "text"  },
    ]

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

    const handleAddContact = (event) => {
        event.preventDefault()


        axios.post("/api/Contacts", inputData)
            .then((response) => {
                setIsOpenConfirmationPopUp(true);
            }).catch(error => console.log(error));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let errors = {};
    
        if (!inputData.fullName.trim()) {
          errors.fullName = 'Full Name is required';
        }
    
        if (!inputData.phone.trim()) {
          errors.phone = 'Phone is required';
        }
    
        if (!inputData.email.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputData.email)) {
          errors.email = 'Invalid email address';
        }
    
        if (!inputData.address.trim()) {
          errors.address = 'Address is required';
        }
    
        return errors;
      };
    
      const errors = validateForm();

    return (
        <div className="form-container">
            <div className="form" id="form-left-side"><img className="contact-img" src={Contact} /></div>
            <div className="form">
                <form onSubmit={handleAddContact}>
                    <div><img src={CloseBtn} className='small-btn' id="close-btn" onClick={()=> props.changeMain("")}/></div>
                    <div className="form-title-cont"><h1>Create a Contact</h1></div>
                        {fields.map((field) =>
                            <div className="textfield-cont">
                                <center>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        className='text-input'
                                        inputProps={{ style: { color: '#FFFBF5', borderColor: '#FFFBF5' }}}
                                        InputLabelProps={{ style: { color: '#FFFBF5' }}}
                                        type={field.type}
                                        name={field.name}
                                        label={field.placeholder}
                                        onChange={handleChange}
                                        sx={{ width: '300px'}}
                                        fullWidth
                                        margin="normal"
                                        error={Boolean(errors[field.name])}
                                        helperText={errors[field.name] || ' '}
                                    />
                                </center>
                            </div>
                        )}
                    <div className="buttons-cont">
                        <span className="button">
                            <button className="primary" type="Submit" variant="contained">Create</button>
                        </span>
                        <span className="button">
                            <button className="secondary" type="reset">Reset</button>
                        </span>
                    </div>
                </form>
            </div>

        {
            isOpenConfirmationPopUp ?

            <React.Fragment>
            <Modal
                open={isOpenConfirmationPopUp}
                onClose={handleConfirmationClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                <p id="child-modal-description">
                    <center>Contact has been created!</center>
                </p>
                </Box>
            </Modal>
            </React.Fragment>

            : ""
        }
        </div>
    )
}

export default CreateContact;