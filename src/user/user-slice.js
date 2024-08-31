import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    permissions: JSON.parse(localStorage.getItem('permissions')) || [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.permissions = action.payload.permissions || [];
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('permissions', JSON.stringify(state.permissions));
    },
    clearUser: (state) => {
      state.user = null;
      state.permissions = [];
      localStorage.removeItem('user');
      localStorage.removeItem('permissions');
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