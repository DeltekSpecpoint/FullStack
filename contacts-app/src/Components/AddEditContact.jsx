import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleAddEditModal,
  handleShouldReload,
  checkFieldValidations,
  updateCurrentContact,
} from "../Redux/contactReducer";
import {
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import TextField from "@mui/material/TextField";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const AddEditContact = () => {
  const dispatch = useDispatch();
  const isAddEditModalOpen = useSelector(
    (state) => state.contactReducer.isAddEditModalOpen
  );
  const formDetails = useSelector((state) => state.contactReducer.formDetails);
  const currentContact = useSelector(
    (state) => state.contactReducer.currentContact
  );
  const fieldValidations = useSelector(
    (state) => state.contactReducer.fieldValidations
  );
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingContactNumber, setIsEditingContactNumber] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const handleSendContact = (id) => {
    const method = formDetails.formType === "Create" ? "POST" : "PUT";
    const url =
      formDetails.formType === "Create"
        ? "https://localhost:44305/api/Contact/AddContact"
        : `https://localhost:44305/api/Contact/UpdateContact/${id}`;

    axios({
      method: method,
      url: url,
      data: currentContact,
    })
      .then((res) => {
        dispatch(toggleAddEditModal(false));
        dispatch(handleShouldReload(true));
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value.trim().length > 0) {
      switch (name) {
        case "ContactNumber":
          const phoneNumberRegex =
            /^(\d{10}|\d{3}[-\s]\d{3}[-\s]\d{4}|\(\d{3}\)\s*\d{3}[-\s]\d{4})$/;
          dispatch(
            checkFieldValidations({
              ...fieldValidations,
              [name]: phoneNumberRegex.test(value),
            })
          );
          break;
        case "Email":
          const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
          dispatch(
            checkFieldValidations({
              ...fieldValidations,
              [name]: emailRegex.test(value),
            })
          );
          break;
        default:
          dispatch(
            checkFieldValidations({ ...fieldValidations, [name]: true })
          );
          break;
      }
      setIsDisabledBtn(false);
    } else {
      dispatch(checkFieldValidations({ ...fieldValidations, [name]: false }));
    }
    dispatch(updateCurrentContact({ ...currentContact, [name]: value }));
  };

  const handleFocusBlur = (e, field) => {
    handleChange(e);

    switch (field) {
      case "FirstName":
        setIsEditingFirstName(true);
        break;
      case "LastName":
        setIsEditingLastName(true);
        break;
      case "Email":
        setIsEditingEmail(true);
        break;
      case "ContactNumber":
        setIsEditingContactNumber(true);
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    dispatch(
      checkFieldValidations({
        FirstName: false,
        LastName: false,
        ContactNumber: false,
        Email: false,
      })
    );

    dispatch(toggleAddEditModal(false));
  };

  return (
    <Dialog
      open={isAddEditModalOpen}
      onClose={() => dispatch(toggleAddEditModal(false))}
      fullWidth
      maxWidth="sm">
      <DialogTitle>{formDetails.formTitle}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            variant="outlined"
            name="FirstName"
            label="First Name"
            defaultValue={currentContact.FirstName}
            required
            onChange={handleChange}
            onFocus={(e) => handleFocusBlur(e, "FirstName")}
            onBlur={(e) => handleFocusBlur(e, "FirstName")}
            error={isEditingFirstName ? !fieldValidations.FirstName : false}
            helperText={
              isEditingFirstName && !fieldValidations.FirstName
                ? "Should not be empty"
                : null
            }></TextField>
          <TextField
            variant="outlined"
            name="LastName"
            label="Last Name"
            defaultValue={currentContact.LastName}
            required
            onChange={handleChange}
            onFocus={(e) => handleFocusBlur(e, "LastName")}
            onBlur={(e) => handleFocusBlur(e, "LastName")}
            error={isEditingLastName ? !fieldValidations.LastName : false}
            helperText={
              isEditingLastName && !fieldValidations.LastName
                ? "Should not be empty"
                : null
            }></TextField>
          <TextField
            variant="outlined"
            name="ContactNumber"
            label="Contact Number"
            defaultValue={currentContact.ContactNumber}
            required
            onChange={handleChange}
            onFocus={(e) => handleFocusBlur(e, "ContactNumber")}
            onBlur={(e) => handleFocusBlur(e, "ContactNumber")}
            error={
              isEditingContactNumber ? !fieldValidations.ContactNumber : false
            }
            helperText={
              isEditingContactNumber && !fieldValidations.ContactNumber
                ? "(e.g., XXX-XXX-XXXX, XXX XXX XXXX, (XXX) XXX-XXXX)"
                : null
            }></TextField>
          <TextField
            variant="outlined"
            name="Email"
            label="Email"
            defaultValue={currentContact.Email}
            required
            onChange={handleChange}
            onFocus={(e) => handleFocusBlur(e, "Email")}
            onBlur={(e) => handleFocusBlur(e, "Email")}
            error={isEditingEmail ? !fieldValidations.Email : false}
            helperText={
              isEditingEmail && !fieldValidations.Email
                ? "Provide valid email format (e.g., example@gmail.com)"
                : null
            }></TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button size="medium" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => handleSendContact(currentContact?.Id)}
          disabled={
            (formDetails.formTitle === "Create Contact" && isDisabledBtn) ||
            !fieldValidations.FirstName ||
            !fieldValidations.LastName ||
            !fieldValidations.Email ||
            !fieldValidations.ContactNumber
          }>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditContact;
