import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Import thunk
import userReducer from './user/user-slice';

// Configure the store with thunk middleware and other default middleware
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Use getDefaultMiddleware and concatenate thunk
});

export default store;
