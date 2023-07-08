import React, { useState, useEffect } from 'react'
import { Button, Modal, Box, FormControl, InputLabel, OutlinedInput, Checkbox, FormHelperText } from '@mui/material';
import { StarBorder, Star } from '@mui/icons-material';

const ContactForm = ({ onSubmit, onCancel, handleClose, open, data }) => {
    const [contact, setContact] = useState(data || {});
    const [error, setError] = useState({});

    useEffect(() => { setContact(data || {}) }, [data]);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,

        display: 'flex',
        flexDirection: 'column',
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Object.values(error).includes(true)) { onSubmit(contact); setError({}); }
        else alert("Invalid Form")
    }

    const handleCancel = (e) => {
        setError({});
        onCancel(e);
    }

    const update = (name, e) => {
        var value = e.target.value
        if (name == "isStarred") value = e.target.checked;

        setError({ ...error, [name]: !isValid(name, value) })
        setContact({ ...contact, [name]: e.target.value });
    }

    const isValid = (name, value) => {
        switch (name) {
            case "firstName":
            case "lastName": { return value.length > 0; break; }
            case "emailAddress": { return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value); break; }
            case "mobileNumber": { return /^[0-9]{11}$/.test(value); break; }
            default: return true;
        }
    }

    return (<div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Checkbox icon={<StarBorder />} checkedIcon={<Star />} checked={contact.isStarred || false}
                    onChange={(e) => update('isStarred', e)}
                />
                <FormControl variant="outlined" margin="normal">
                    <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="First Name"
                        value={contact.firstName || ''}
                        onChange={(e) => update('firstName', e)}
                        error={error.firstName || false}
                        required
                    />
                    {error.firstName && (
                        <FormHelperText error id="firstName-error">
                            This is a required field
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl variant="outlined" margin="normal">
                    <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Last Name"
                        value={contact.lastName || ''}
                        onChange={(e) => update('lastName', e)}
                        error={error.lastName || false}
                        required
                    />
                    {error.lastName && (
                        <FormHelperText error id="lastName-error">
                            This is a required field
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl variant="outlined" margin="normal">
                    <InputLabel htmlFor="component-outlined">Email Address</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Email Address"
                        value={contact.emailAddress || ''}
                        onChange={(e) => update('emailAddress', e)}
                        error={error.emailAddress || false}
                        required
                    />

                    {error.emailAddress && (
                        <FormHelperText error id="emailAddress-error">
                            Fill up with correct email format
                        </FormHelperText>
                    )}
                </FormControl>
                {/* TODO: Add Country Code dropdown based on country.io.json */}
                <FormControl variant="outlined" margin="normal">
                    <InputLabel htmlFor="component-outlined">Mobile Number</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Mobile Number"
                        value={contact.mobileNumber || ''}
                        onChange={(e) => update('mobileNumber', e)}
                        error={error.mobileNumber || false}
                        required
                    />{error.mobileNumber && (
                        <FormHelperText error id="emailAddress-error">
                            Input 11 digits
                        </FormHelperText>
                    )}
                </FormControl>
                <Button variant="outlined" color="primary" type='submit'>Submit</Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
            </Box>
        </Modal>
    </div>);
}

export default ContactForm;