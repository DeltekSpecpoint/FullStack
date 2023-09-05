import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactReducer";

export default configureStore({
  reducer: { contactReducer },
});
