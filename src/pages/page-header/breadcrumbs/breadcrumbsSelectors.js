// src/selectors/breadcrumbsSelectors.js
import { createSelector } from 'reselect';

// Selector to get the breadcrumbs slice of state
const selectBreadcrumbs = (state) => state.breadcrumbs;

// Memoized selector to get the list of breadcrumbs
export const selectBreadcrumbsList = createSelector(
  [selectBreadcrumbs],
  (breadcrumbs) => breadcrumbs
);

// You can add more selectors related to breadcrumbs here
// For example:
// Memoized selector to get specific breadcrumb details
export const selectBreadcrumbById = (breadcrumbId) => createSelector(
  [selectBreadcrumbs],
  (breadcrumbs) => breadcrumbs.find(breadcrumb => breadcrumb.id === breadcrumbId)
);
