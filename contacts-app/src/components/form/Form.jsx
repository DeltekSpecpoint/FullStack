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
        name="name"
        value={
          (props.name ? props.name : null)
        }
        id='name-input'
        />
      </FormControl>
      <FormControl className='form-ctrl'>
        <InputLabel htmlFor="number-input">Contact Number</InputLabel>
        <Input 
        onChange={props.onChange}
        name="number"
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
        name="email"
        value={
          (props.email ? props.email : null)
        }
        id='email-input'
        />
      </FormControl>
      <FormControl className='form-ctrl'>
        <InputLabel htmlFor="address-input">Home Address</InputLabel>
        <Input 
        onChange={props.onChange}
        name="address"
        value={
          (props.address ? props.address : null)
        }
        id='address-input'
        />
      </FormControl>
      <FormControl className='form-ctrl'>
        <Button variant='contained' color='primary' onClick={props.onClick}>
          Submit
        </Button>
      </FormControl>
    </FormGroup>
  )
}

export default Form