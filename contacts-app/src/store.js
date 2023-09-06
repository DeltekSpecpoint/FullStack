import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./reducers";

const store = configureStore({
	reducer: {
		contact: contactReducer,
	},
});

export default store;
