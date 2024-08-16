import { createSlice } from '@reduxjs/toolkit';
import usePatient from '../patients/hooks/usePatient';
import useMedicationSearch from './hooks/useMedicationSearch';

// Initial state
const initialState = {
  error: {},
  medication: undefined,
  patient: undefined,
  status: 'loading',
};

// Slice definition
const medicationSlice = createSlice({
  name: 'medication',
  initialState,
  reducers: {
    fetchMedicationStart: (state) => {
      state.status = 'loading';
    },
    fetchMedicationSuccess: (state, action) => {
      state.status = 'completed';
      state.medication = action.payload.medication;
      state.patient = action.payload.patient;
    },
    updateMedicationStart: (state) => {
      state.status = 'loading';
    },
    updateMedicationSuccess: (state, action) => {
      state.status = 'completed';
      state.medication = action.payload;
      state.error = {};
    },
    requestMedicationStart: (state) => {
      state.status = 'loading';
    },
    requestMedicationSuccess: (state, action) => {
      state.status = 'completed';
      state.medication = action.payload;
      state.error = {};
    },
    requestMedicationError: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    cancelMedicationStart: (state) => {
      state.status = 'loading';
    },
    cancelMedicationSuccess: (state, action) => {
      state.status = 'completed';
      state.medication = action.payload;
      state.error = {};
    },
  },
});

// Actions
export const {
  fetchMedicationStart,
  fetchMedicationSuccess,
  updateMedicationStart,
  updateMedicationSuccess,
  requestMedicationStart,
  requestMedicationSuccess,
  requestMedicationError,
  cancelMedicationStart,
  cancelMedicationSuccess,
} = medicationSlice.actions;

// Thunks
export const fetchMedication = (medicationId) => async (dispatch) => {
  dispatch(fetchMedicationStart());
  try {
    const searchRequest = { id: medicationId };
    const [fetchedMedication] = await useMedicationSearch(searchRequest);  // Use the hook to fetch medication
    const fetchedPatient = await usePatient().find(fetchedMedication.patient); // Fetch the patient using the patient ID
    dispatch(fetchMedicationSuccess({ medication: fetchedMedication, patient: fetchedPatient }));
  } catch (error) {
    dispatch(requestMedicationError({ message: 'Error fetching medication' }));
  }
};

const validateMedicationRequest = (newMedication) => {
  const medicationRequestError = {};
  if (!newMedication.patient) {
    medicationRequestError.patient = 'medications.requests.error.patientRequired';
  }

  if (!newMedication.quantity) {
    medicationRequestError.quantity = 'medications.requests.error.quantityRequired';
  }

  return medicationRequestError;
};

export const requestMedication = (newMedication, onSuccess) => async (dispatch, getState) => {
  dispatch(requestMedicationStart());

  const medicationRequestError = validateMedicationRequest(newMedication);
  if (Object.keys(medicationRequestError).length > 0) {
    medicationRequestError.message = 'medications.requests.error.unableToRequest';
    dispatch(requestMedicationError(medicationRequestError));
  } else {
    newMedication.status = 'draft';
    newMedication.requestedOn = new Date().toISOString();
    newMedication.requestedBy = getState().user?.user?.id || '';
    try {
      const searchRequest = { ...newMedication };
      const [requestedMedication] = await useMedicationSearch(searchRequest);  // Use the hook to create the medication request
      dispatch(requestMedicationSuccess(requestedMedication));

      if (onSuccess) {
        onSuccess(requestedMedication);
      }
    } catch (error) {
      dispatch(requestMedicationError({ message: 'Error requesting medication' }));
    }
  }
};

export const cancelMedication = (medicationToCancel, onSuccess) => async (dispatch) => {
  dispatch(cancelMedicationStart());

  medicationToCancel.canceledOn = new Date().toISOString();
  medicationToCancel.status = 'canceled';
  try {
    const searchRequest = { ...medicationToCancel };
    const [canceledMedication] = await useMedicationSearch(searchRequest);  // Use the hook to cancel the medication
    dispatch(cancelMedicationSuccess(canceledMedication));

    if (onSuccess) {
      onSuccess(canceledMedication);
    }
  } catch (error) {
    dispatch(requestMedicationError({ message: 'Error canceling medication' }));
  }
};

export const updateMedication = (medicationToUpdate, onSuccess) => async (dispatch) => {
  dispatch(updateMedicationStart());
  try {
    const searchRequest = { ...medicationToUpdate };
    const [updatedMedication] = await useMedicationSearch(searchRequest);  // Use the hook to update the medication
    dispatch(updateMedicationSuccess(updatedMedication));

    if (onSuccess) {
      onSuccess(updatedMedication);
    }
  } catch (error) {
    dispatch(requestMedicationError({ message: 'Error updating medication' }));
  }
};

export default medicationSlice.reducer;
