import { createSlice } from '@reduxjs/toolkit';

const getInitialContact = () => {
  // getting contact  list
  const localContactList = window.localStorage.getItem('contactList');
  // if contact list is not empty
  if (localContactList) {
    return JSON.parse(localContactList);
  }
  const query: any = [];
  window.localStorage.setItem('contactList',query);
  return [];
};

const initialValue = {
  filterStatus: 'all',
  contactList: getInitialContact(),
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState: initialValue,
  reducers: {
    addContact: (state, action) => {
      state.contactList.push(action.payload);
      const contactList = window.localStorage.getItem('contactList');
      if (contactList) {
        const contactListArr = JSON.parse(contactList);
        contactListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('contactList', JSON.stringify(contactListArr));
      } else {
        window.localStorage.setItem(
          'contactList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    updateContact: (state, action) => {
      const contactList = window.localStorage.getItem('contactList');
      if (contactList) {
        const contactListArr = JSON.parse(contactList);
        contactListArr.forEach((contact : any) =>{
          if (contact.id === action.payload.id) {
          
            contact.name = action.payload.name;
            contact.address = action.payload.address;
          }
        });
        window.localStorage.setItem('contactList', JSON.stringify(contactListArr));
        state.contactList = [...contactListArr];
      }
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

export const { addContact, updateContact, deleteContact, updateFilterStatus } =
contactSlice.actions;
export default contactSlice.reducer;
