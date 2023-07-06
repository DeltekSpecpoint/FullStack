import React, { useState, useEffect } from 'react'
import { Button, Modal, Box, FormControl, InputLabel, OutlinedInput, Checkbox } from '@mui/material';
import { StarBorder, Star } from '@mui/icons-material';

const ContactForm = ({ onSubmit, onCancel, handleClose, open, data }) => {
    const [contact, setContact] = useState(data || {});

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
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(contact);
    }
    const update = (name, e) => {
        if (name == "isStarred")
            setContact({ ...contact, [name]: e.target.checked });
        else
            setContact({ ...contact, [name]: e.target.value });
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
                <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    label="First Name"
                    value={contact.firstName || ''}
                    onChange={(e) => update('firstName', e)}
                />
                <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    label="Last Name"
                    value={contact.lastName || ''}
                    onChange={(e) => update('lastName', e)}
                />
                <InputLabel htmlFor="component-outlined">Email Address</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    label="Email Address"
                    value={contact.emailAddress || ''}
                    onChange={(e) => update('emailAddress', e)}
                />
                {/* TODO: Add Country Code dropdown based on country.io.json */}
                <InputLabel htmlFor="component-outlined">Mobile Number</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    label="Mobile Number"
                    value={contact.mobileNumber || ''}
                    onChange={(e) => update('mobileNumber', e)}
                />
                <Button type='submit'>Submit</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Box>
        </Modal>
    </div>);
}

export default ContactForm;