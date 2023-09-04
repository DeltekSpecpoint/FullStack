import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactReducer";
import thunk from "redux-thunk";

export default configureStore({
  reducer: { contactReducer },
  middleware: [thunk],
});
