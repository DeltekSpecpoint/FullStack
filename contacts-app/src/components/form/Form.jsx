import React from 'react';
import "./Form.css";
import { Button, FormControl, FormGroup, Input, InputLabel, Typography } from '@mui/material';


const Form = (props) => {
  return (
    <FormGroup className='form-grp'>
      <Typography variant='h4' className='typography'>{props.title}</Typography>
      <FormControl className='form-ctrl'>
        <InputLabel htmlFor="name-input">Contact Name</InputLabel>
        <Input 
        onChange={props.onChange}
        name={props.fullName}
        value={
          (props.fullName ? props.fullName : null)
        }
        id='name-input'
        />
      </FormControl>
      <FormControl className='form-ctrl'>
        <InputLabel htmlFor="number-input">Contact Number</InputLabel>
        <Input 
        onChange={props.onChange}
        name={props.number}
        value={
          (props.number ? props.number : null)
        }
        id='number-input'
        />
      </FormControl>
      <FormControl className='form-ctrl'>
        <InputLabel htmlFor="email-input">Email Address</InputLabel>
        <Input 
        onChange={props.onChange}
        name={props.emailAddress}
        value={
          (props.emailAddress ? props.emailAddress : null)
        }
        id='email-input'
        />
      </FormControl>
      <FormControl className='form-ctrl'>
        <Button variant='contained' color='primary' onClick={props.onClick}>
          {props.buttonName}
        </Button>
      </FormControl>
    </FormGroup>
  )
}

export default Form