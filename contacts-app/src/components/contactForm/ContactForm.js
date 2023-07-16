import { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

const ACTIONS = {
  UPDATE_FORM: "updateForm"
}

const initialContactState = {
  firstName: {
    label: "First Name",
    isRequired: true,
    value: "",
    touched: false,
    error: null
  },
  middleName: {
    label: "Middle Name",
    isRequired: false,
    value: "",
    touched: false,
    error: null
  },
  lastName: {
    label: "Last Name",
    isRequired: true,
    value: "",
    touched: false,
    error: null
  },
  phone: {
    label: "Phone",
    isRequired: true,
    value: "",
    touched: false,
    error: null
  },
  email: {
    label: "Email",
    isRequired: true,
    value: "",
    touched: false,
    error: null
  },
  isFormValid: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_FORM:
      const { name, value, error, touched, isFormValid } = action.data
      return {
        ...state,
        [name]: { ...state[name], value, error, touched },
        isFormValid
      }
    default:
      return state
  }
};

function ContactForm({ selectedContact, setSelectedContact, createContact, updateContact }) {
  const [id, setId] = useState(null);
  const [contactState, dispatch] = useReducer(reducer, initialContactState);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedContact) {
      setId(selectedContact.id);
      for (const key in contactState) {
        const item = contactState[key]
        
        dispatch({
          type: ACTIONS.UPDATE_FORM,
          data: {
            name: key,
            value: selectedContact[key],
            error: item.error,
            touched: false,
            isFormValid: false
          },
        });
      }
    }
  }, []);

  const validateInput = (name, value) => {
    let error = "";
    
    if (name !== "isFormValid" && value.trim() === "" && contactState[name].isRequired) {
      error = `${contactState[name].label} is required`;
    } else {
      error = null;
    }
    
    if (name === "email") {
      if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value)) {
        error = "Please Input a valid Email";
      }
    }

    return error;
  }

  const handleInputChange = (name, value) => {
    const error = validateInput(name, value);
    let isFormValid = true;

    for (const key in contactState) {
      const item = contactState[key]
      if (key === name && error) {
        isFormValid = false;
        break;
      } else if (key !== name && item.error) {
        isFormValid = false;
        break;
      }
    }

    dispatch({
      type: ACTIONS.UPDATE_FORM,
      data: {
        name,
        value,
        error,
        touched: true,
        isFormValid,
      },
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let isFormValid = true;

    for (const key in contactState) {
      const item = contactState[key];
      const { value } = item;
      const error = validateInput(key, value);

      if (error) {
        isFormValid = false;
      }

      if (key) {
        dispatch({
          type: ACTIONS.UPDATE_FORM,
          data: {
            name: key,
            value,
            error,
            touched: true,
            isFormValid,
          },
        });
      }
    }

    if (isFormValid) {
      if (selectedContact) {
        updateContact({
          id,
          firstName: contactState.firstName.value,
          middleName: contactState.middleName.value,
          lastName: contactState.lastName.value,
          phone: contactState.phone.value,
          email: contactState.email.value
        });
        setSelectedContact(null);
      } else {
        createContact({
          firstName: contactState.firstName.value,
          middleName: contactState.middleName.value,
          lastName: contactState.lastName.value,
          phone: contactState.phone.value,
          email: contactState.email.value
        });
      }
    }

    navigate("/");
  };

  return (
      <Container component="main" maxWidth="md">
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={contactState.firstName.value}
                onChange={e => {
                  handleInputChange(e.target.name, e.target.value);
                }}
                autoFocus
              />
              {contactState.firstName.touched && contactState.firstName.error && (
                <Alert severity="error">{contactState.firstName.error}</Alert>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="middleName"
                label="Middle Name"
                name="middleName"
                value={contactState.middleName.value}
                onChange={e => {
                  handleInputChange(e.target.name, e.target.value);
                }}
              />
              {contactState.middleName.touched && contactState.middleName.error && (
                <Alert severity="error">{contactState.middleName.error}</Alert>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={contactState.lastName.value}
                onChange={e => {
                  handleInputChange(e.target.name, e.target.value);
                }}
              />
              {contactState.lastName.touched && contactState.lastName.error && (
                <Alert severity="error">{contactState.lastName.error}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <PhoneInput
                placeholder="Phone Number"
                country="ph"
                inputStyle={{ width: "100%"}}
                inputProps={{
                  id: "phone",
                  label: "Phone",
                  name: "phone",
                  required: true
                }}
                value={contactState.phone.value}
                onChange={phone => {
                  handleInputChange("phone", phone);
                }}
              />
              {contactState.phone.touched && contactState.phone.error && (
                <Alert severity="error">{contactState.phone.error}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={contactState.email.value}
                onChange={e => {
                  handleInputChange(e.target.name, e.target.value);
                }}
              />
              {contactState.email.touched && contactState.email.error && (
                <Alert severity="error">{contactState.email.error}</Alert>
              )}
            </Grid>
            <Grid container spacing={2} sx={{ pl: 2 }}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    if (selectedContact)
                      setSelectedContact(null);
                    navigate("/");
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
  );
}

export default ContactForm;
