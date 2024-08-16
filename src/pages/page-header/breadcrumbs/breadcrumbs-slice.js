import { createSlice } from '@reduxjs/toolkit';

// Initial state for the breadcrumbs slice
const initialState = {
  breadcrumbs: [],
};

// Create a slice of the Redux store for breadcrumbs
const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    /**
     * Adds an array of breadcrumbs to the state.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing the payload.
     */
    addBreadcrumbs(state, { payload }) {
      state.breadcrumbs = [...state.breadcrumbs, ...payload].sort(
        (b1, b2) => b1.location.length - b2.location.length
      );
    },
    /**
     * Removes an array of breadcrumbs from the state.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing the payload.
     */
    removeBreadcrumbs(state, { payload }) {
      const locations = payload.map((b) => b.location);
      state.breadcrumbs = state.breadcrumbs.filter(
        (breadcrumb) => !locations.includes(breadcrumb.location)
      );
    },
  },
});

// Export the actions for use in components
export const { addBreadcrumbs, removeBreadcrumbs } = breadcrumbsSlice.actions;

// Export the reducer to be included in the store
export default breadcrumbsSlice.reducer;
