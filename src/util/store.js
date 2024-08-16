import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import medication from '../pages/medications/medication-slice';
import breadcrumbs from '../pages/page-header/breadcrumbs/breadcrumbs-slice';
import patient from '../pages/patients/patient-slice';
import patients from '../pages/patients/patients-slice';
import user from '../user/user-slice';
import components from '../components/component-slice';

const rootReducer = combineReducers({
  patient,
  patients,
  user,
  breadcrumbs,
  components,
  medication,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Export the Redux store
export default store;