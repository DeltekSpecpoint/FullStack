import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { AppBar, Button, Dialog, DialogContent, DialogContentText, Divider, FormControl, IconButton, MenuItem, Slide, TextField, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect } from "react";
import { Contact } from "../models/Contact";
import { Country } from "../models/Country";
import { SaveContactRequest } from "../models/SaveContactRequest";
import { ContactItemModel } from "./ContactItem";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ContactFormStateHandler {
  (open: boolean): void;
}

interface ContactSavedHandler {
  (savedContact: Contact | null): void;
}

export default function ContactForm(props: { open: boolean; setOpen: ContactFormStateHandler; operation: "add" | "edit"; data: ContactItemModel | null; onContactSaved: ContactSavedHandler }) {
  const [countries, setCountries] = React.useState<Country[]>();
  const [contact, setContact] = React.useState<SaveContactRequest>();

  useEffect(() => {
    console.log("use Effect");
    fetch("https://localhost:5001/api/Contact/Countries")
      .then(response => response.json())
      .then((countries: Country[]) => {
        console.log({ countries });
        setCountries(countries);
      })
      .catch(error => console.error({ error }));
  }, []);

  useEffect(() => {
    console.log("Set Initial Contact");
    setContact({
      id: props.data?.contactRef.id,
      firstName: props.data?.contactRef.firstName,
      lastName: props.data?.contactRef.lastName,
      email: props.data?.contactRef.email,
      addressLine1: props.data?.contactRef.homeAddress.addressLine1,
      addressLine2: props.data?.contactRef.homeAddress.addressLine2,
      countryCode: props.data?.contactRef.homeAddress.country.countryCode,
      city: props.data?.contactRef.homeAddress.city,
      postalCode: props.data?.contactRef.homeAddress.postalCode,
      state: props.data?.contactRef.homeAddress.state,
    });
  }, [props.data]);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setContact(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e: any) => {
    console.log("Save");
    console.log({ contact });

    const url = "https://localhost:5001/api/Contact/" + (props.operation === "edit" ? contact?.id ?? "" : "");
    const method = props.operation === "add" ? "POST" : "PUT";

    // TODO: If add, POST. If update, PUT
    fetch(url, {
      method: method,
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then((savedContact: Contact) => {
        console.log({ savedContact });
        props.onContactSaved(savedContact);
        handleClose();
      })
      .catch(error => console.error({ error }));
  };

  const handleDelete = (e: any) => {
    console.log("Delete");

    const url = "https://localhost:5001/api/Contact/" + (props.operation === "edit" ? contact?.id ?? "" : "");
    const method = "DELETE";

    fetch(url, {
      method: method,
    })
      .then(response => {
        console.log("Deleted successfully");
        props.onContactSaved(null);
        handleClose();
      })
      .catch(error => console.error({ error }));
  };

  return (
    <React.Fragment>
      <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props.operation === "add" ? "Create" : "Edit"} Contact
            </Typography>
            {props.operation === "edit" && <DeleteOutlinedIcon fontSize="medium" color="inherit" onClick={handleDelete} sx={{ cursor: "pointer" }}></DeleteOutlinedIcon>}
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <FormControl fullWidth>
          <DialogContent>
            <DialogContentText>Contact Details</DialogContentText>
            <Divider></Divider>
            <TextField autoFocus margin="dense" id="firstName" name="firstName" value={contact?.firstName ?? ""} label="First Name" type="text" fullWidth variant="filled" onChange={handleChange} />
            <TextField autoFocus margin="dense" id="lastName" name="lastName" value={contact?.lastName ?? ""} label="Last Name" type="text" fullWidth variant="filled" onChange={handleChange} />
            <TextField autoFocus margin="dense" id="email" name="email" value={contact?.email ?? ""} label="Email Address" type="email" fullWidth variant="filled" onChange={handleChange} />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Address Details</DialogContentText>
            <Divider></Divider>
            <TextField
              autoFocus
              margin="dense"
              id="addressLine1"
              name="addressLine1"
              value={contact?.addressLine1 ?? ""}
              label="Address Line 1"
              type="text"
              fullWidth
              variant="filled"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="addressLine2"
              name="addressLine2"
              value={contact?.addressLine2 ?? ""}
              label="Address Line 2"
              type="text"
              fullWidth
              variant="filled"
              onChange={handleChange}
            />

            <TextField
              autoFocus
              margin="dense"
              id="countryCode"
              name="countryCode"
              value={contact?.countryCode ?? ""}
              label="Country"
              select
              fullWidth
              variant="filled"
              onChange={handleChange}
              SelectProps={{
                renderValue: (value: any) => countries?.find(x => x.countryCode === value)?.name,
              }}
            >
              {countries?.map(country => (
                <MenuItem key={country.id} value={country.countryCode}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField autoFocus margin="dense" id="state" name="state" value={contact?.state ?? ""} label="State" type="text" fullWidth variant="filled" onChange={handleChange} />
            <TextField autoFocus margin="dense" id="city" name="city" value={contact?.city ?? ""} label="City" type="text" fullWidth variant="filled" onChange={handleChange} />
            <TextField
              autoFocus
              margin="dense"
              id="postalCode"
              name="postalCode"
              value={contact?.postalCode ?? ""}
              label="Postal Code"
              type="text"
              fullWidth
              variant="filled"
              onChange={handleChange}
            />
          </DialogContent>
        </FormControl>
      </Dialog>
    </React.Fragment>
  );
}
