import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isFormModalOpen: false,
	shouldReload: false,
	modalDetails: {
		type: "",
		title: "",
		buttonLabel: "",
	},
	currentContactData: {
		id: "",
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
	},
	formChecks: {
		isInitial: true,
		firstName: true,
		lastName: true,
		phone: true,
		email: true,
	},
};

const contactSlice = createSlice({
	name: "contactReducer",
	initialState,
	reducers: {
		setIsFormModalOpen: (state, action) => {
			state.isFormModalOpen = action.payload;
		},
		setShouldReload: (state, action) => {
			state.shouldReload = action.payload;
		},
		setModalDetails: (state, action) => {
			state.modalDetails = action.payload;
		},
		setCurrentContactData: (state, action) => {
			state.currentContactData = action.payload;
		},
		setFormChecks: (state, action) => {
			state.formChecks = action.payload;
		},
	},
});

export const {
	setIsFormModalOpen,
	setModalDetails,
	setCurrentContactData,
	setFormChecks,
} = contactSlice.actions;
export default contactSlice.reducer;
