// src/selectors/componentsSelectors.js
import { createSelector } from 'reselect';

// Selector to get the components slice of state
const selectComponents = (state) => state.components;

// Memoized selector to get the sidebarCollapsed state
export const selectSidebarCollapsed = createSelector(
  [selectComponents],
  (components) => components.sidebarCollapsed
);

// You can add more selectors related to components here
// For example:
// Memoized selector to get another piece of state
export const selectAnotherComponentState = createSelector(
  [selectComponents],
  (components) => components.anotherComponentState
);