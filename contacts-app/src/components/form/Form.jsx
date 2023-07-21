import React, { useState, useEffect } from 'react';
import "./Form.css";
import { Button, FormControl, FormGroup, TextField, Typography } from '@mui/material';

const Form = (props) => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false)

  const validate = () => {
    let errors = {};
    const nameRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    const numberRegex = /((\+|00)?[1-9]{2}|0)[1-9]([0-9]){8}/;
    
    if (!props.name){
      errors.name = "Name is required!";
    }
    if (!props.number){
      errors.number = "Number is required!";
    } else if(!numberRegex.test(props.number)){
      errors.number = "This is not a valid phone number!";
    }
    if (!props.email){
      errors.email = "Email is required!";
    } else if(!nameRegex.test(props.email)){
      errors.email = "This is not a valid email format!";
    }
    if (!props.address){
      errors.address = "Address is required!";
    }
    setFormErrors(errors);
    setIsSubmit(true);
    return errors;
  }
  
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      props.finishSubmit();
    }
  }, [formErrors, isSubmit]);

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
        error={Boolean(formErrors.name)}
        helperText={formErrors.name}
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
        error={Boolean(formErrors.number)}
        helperText={formErrors.number}
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
        error={Boolean(formErrors.email)}
        helperText={formErrors.email}
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
        error={Boolean(formErrors.address)}
        helperText={formErrors.address}
        />
      </FormControl>
      <FormControl className='form-ctrl'>
        <Button variant='contained' color='primary' onClick={ () => validate()} >
          Submit
        </Button>
      </FormControl>
    </FormGroup>
  )
}

export default Form