import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../slices/contactSlice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
});