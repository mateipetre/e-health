import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  permissions: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.permissions = action.payload.permissions || [];
    },
    clearUser: (state) => {
      state.user = null;
      state.permissions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('FETCH_PERMISSIONS_SUCCESS', (state, action) => {
        state.permissions = action.payload;
      })
      .addCase('FETCH_PERMISSIONS_FAIL', (state, action) => {
        console.error(action.payload); // Log the error
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;