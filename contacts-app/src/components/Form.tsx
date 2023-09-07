import { Star, StarBorder } from "@mui/icons-material";
import { Grid, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TContactInformationPayload } from "../types/TContacts";
import { useNavigate  } from "react-router-dom";

interface Props {
  id?: number;
  // contact?: TContactInformationPayload,
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  contactNumber?: string;
  isStared?: boolean;
  submitForm: (contact: TContactInformationPayload) => void;
}

const Form: React.FC<Props> = (props) => {
  const [contact, setContact] = useState<TContactInformationPayload>({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    contactNumber: "",
    isStared: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setContact({
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      middleName: props.middleName || "",
      email: props.email || "",
      contactNumber: props.contactNumber || "",
      isStared: props.isStared || false,
    })
  },[props]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setContact((prevContact) => ({ ...prevContact, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.submitForm(contact);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Middle Name"
            name="middleName"
            value={contact.middleName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            value={contact.contactNumber}
            onChange={handleChange}
            margin="normal"
            required
          />
          <FormControlLabel control={<Checkbox onChange={handleChange} name="isStared" icon={<StarBorder />} checkedIcon={<Star />}/>} label="Add as favorite" />
          <div className="c-flex c-justify-fe">
            <Button variant="outlined" onClick={() => navigate("/")} type="button" className="c-mt-1 c-mr-1">
              Cancel
            </Button>
            <Button variant="contained" type="submit" className="c-mt-1">
              Submit
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  )
}

export default Form;