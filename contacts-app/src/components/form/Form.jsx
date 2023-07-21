import React from 'react';
import "./Form.css";
import { Button, FormControl, FormGroup, TextField, Typography } from '@mui/material';

const Form = (props) => {

  return (
    <FormGroup className='form-grp'>
      <Typography variant='h4' className='typography'>{props.title}</Typography>
      <FormControl className='form-ctrl'>
        <TextField 
        label={!props.hiddenLabel ? "Contact Name" : null}
        onChange={props.onChange}
        name="name"
        value={
          (props.name ? props.name : null)
        }
        id='name-input'
        required={true}
        error={props.nameError}
        helperText={props.nameErrorText}
        />
      </FormControl>
      <FormControl className='form-ctrl'>
        <TextField 
        label={!props.hiddenLabel ? "Contact Number" : null}
        onChange={props.onChange}
        name="number"
        value={
          (props.number ? props.number : null)
        }
        id='number-input'
        required={true}
        error={props.numberError}
        helperText={props.numberErrorText}
        />
      </FormControl>
      <FormControl className='form-ctrl'>
        <TextField 
        label={!props.hiddenLabel ? "Email Address" : null}
        onChange={props.onChange}
        name="email"
        value={
          (props.email ? props.email : null)
        }
        id='email-input'
        required={true}
        error={props.emailError}
        helperText={props.emailErrorText}
        />
      </FormControl>
      <FormControl className='form-ctrl'>
        <TextField 
        label={!props.hiddenLabel ? "Home Address" : null}
        onChange={props.onChange}
        name="address"
        value={
          (props.address ? props.address : null)
        }
        id='address-input'
        required={true}
        error={props.addressError}
        helperText={props.addressErrorText}
        />
      </FormControl>
      <FormControl className='form-ctrl'>
        <Button variant='contained' color='primary' onClick={props.onClick} >
          Submit
        </Button>
      </FormControl>
    </FormGroup>
  )
}

export default Form