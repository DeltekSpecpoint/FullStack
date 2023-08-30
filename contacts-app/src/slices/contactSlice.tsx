import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios'
 



export const getAllContacts = createAsyncThunk(
  "getAllContacts", 
  async () => {
    try {
      const {data} = await axios.get(
    'https://localhost:5001/api/Contact', { headers : {Accept : 'application/json'}}
      );
     
      return data;
    } catch (error) {
      console.error(error);
    }
});


export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    filterStatus: 'all',
    contactList: [],
    isLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.pending, (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.contactList = action.payload;
        state.isLoading = false;
        state.hasError = false
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.hasError = true
        state.isLoading = false;
      })
  },
  reducers: {
    addContact: (state, action) => {
      // state.contactList.concat(action.payload);
      // const contactList = window.localStorage.getItem('contactList');
      // if (contactList) {
      //   const contactListArr = JSON.parse(contactList);
      //   contactListArr.concat({
      //     ...action.payload,
      //   });
      //   window.localStorage.setItem('contactList', JSON.stringify(contactListArr));
      // } else {
      //   window.localStorage.setItem(
      //     'contactList',
      //     JSON.stringify([
      //       {
      //         ...action.payload,
      //       },
      //     ])
      //   );
      // }
    },
    updateContact: (state, action) => {
      console.log(action.payload);
   
      
     
    },
    deleteContact: (state, action) => {
      const contactList = window.localStorage.getItem('contactList');
      if (contactList) {
        const contactListArr = JSON.parse(contactList);
        contactListArr.forEach((contact : any,index :any ) => {
          if (contact.id === action.payload) {
            contactListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('contactList', JSON.stringify(contactListArr));
        state.contactList = contactListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});
export const getContactList = (state: any)   => state.contact.contactList; 
export const getFilterStatus = (state: any)   => state.contact.filterStatus;

export const { addContact, updateContact, deleteContact, updateFilterStatus } =
contactSlice.actions;
export default contactSlice.reducer;
