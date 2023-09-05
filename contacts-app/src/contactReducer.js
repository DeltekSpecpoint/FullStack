import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddEditModalOpen: false,
  isAffirmationModalOpen: false,
  formDetails: {
    formTitle: "Create Contact",
    formType: "Create",
  },
  currentContact: {
    Id: "",
    FirstName: "",
    LastName: "",
    ContactNumber: "",
    Email: "",
  },
  contactsList: [],
  shouldReload: false,
  fieldValidations: {
    FirstName: false,
    LastName: false,
    ContactNumber: false,
    Email: false,
  },
  searchTerm: "",
};

export const contactSlice = createSlice({
  name: "ContactReducer",
  initialState,
  reducers: {
    toggleAddEditModal: (state, action) => {
      state.isAddEditModalOpen = action.payload;
    },
    toggleAffirmationModal: (state, action) => {
      state.isAffirmationModalOpen = action.payload;
    },
    updateFormDetails: (state, action) => {
      state.formDetails = action.payload;
    },
    updateCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },
    handleShouldReload: (state, action) => {
      state.shouldReload = action.payload;
    },
    updateContactsList: (state, action) => {
      state.contactsList = action.payload;
    },
    checkFieldValidations: (state, action) => {
      state.fieldValidations = action.payload;
    },
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  toggleAddEditModal,
  toggleAffirmationModal,
  updateFormDetails,
  updateCurrentContact,
  handleShouldReload,
  updateContactsList,
  checkFieldValidations,
  fieldValidations,
  updateSearchTerm,
  searchTerm,
} = contactSlice.actions;

export default contactSlice.reducer;
