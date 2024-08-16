import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

import uuid from '../../util/uuid'
import { cleanupPatient } from './util/set-patient-helper'
import validatePatient from './util/validate-patient'

const initialState = {
  status: 'loading',
  isUpdatedSuccessfully: false,
  patient: {},
  relatedPersons: [],
  createError: undefined,
  updateError: undefined,
  diagnosisError: undefined,
  relatedPersonError: undefined,
}

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    createPatientStart(state) {
      state.status = 'loading'
      state.createError = {}
    },
    createPatientSuccess(state) {
      state.status = 'completed'
    },
    createPatientError(state, action) {
      state.status = 'error'
      state.createError = action.payload
    },
    updatePatientStart(state) {
      state.status = 'loading'
      state.createError = {}
    },
    updatePatientSuccess(state, action) {
      state.status = 'completed'
      state.patient = action.payload
    },
    updatePatientError(state, action) {
      state.status = 'error'
      state.updateError = action.payload
    },
    addDiagnosisError(state, action) {
      state.status = 'error'
      state.diagnosisError = action.payload
    },
  },
})

export const {
  createPatientStart,
  createPatientSuccess,
  createPatientError,
  updatePatientStart,
  updatePatientSuccess,
  updatePatientError,
  addDiagnosisError,
} = patientSlice.actions

// Thunk to create a new patient using Axios
export const createPatient = (patient, onSuccess) => async (dispatch) => {
  dispatch(createPatientStart())

  const cleanPatient = cleanupPatient(patient)
  const newPatientError = validatePatient(cleanPatient)

  if (!newPatientError) {
    try {
      const response = await axios.post('/api/patients', cleanPatient)
      dispatch(createPatientSuccess())

      if (onSuccess) {
        onSuccess(response.data)
      }
    } catch (error) {
      dispatch(
        createPatientError({
          message: 'patient.errors.createPatientError',
          details: error.response?.data || error.message,
        }),
      )
    }
  } else {
    dispatch(
      createPatientError({
        ...newPatientError.fieldErrors,
        message: 'patient.errors.createPatientError',
      }),
    )
  }
}

// Thunk to update an existing patient using Axios
export const updatePatient = (patient, onSuccess) => async (dispatch) => {
  dispatch(updatePatientStart())

  const cleanPatient = cleanupPatient(patient)
  const updateError = validatePatient(cleanPatient)

  if (!updateError) {
    try {
      const response = await axios.put(`/api/patients/${cleanPatient.id}`, cleanPatient)
      dispatch(updatePatientSuccess(response.data))

      if (onSuccess) {
        onSuccess(response.data)
      }
    } catch (error) {
      dispatch(
        updatePatientError({
          message: 'patient.errors.updatePatientError',
          details: error.response?.data || error.message,
        }),
      )
    }
  } else {
    dispatch(
      updatePatientError({
        ...updateError.fieldErrors,
        message: 'patient.errors.updatePatientError',
      }),
    )
  }
}

// Validate diagnosis function
function validateDiagnosis(diagnosis) {
  const error = {}

  if (!diagnosis.name) {
    error.name = 'patient.diagnoses.error.nameRequired'
  }

  if (!diagnosis.diagnosisDate) {
    error.date = 'patient.diagnoses.error.dateRequired'
  }

  if (!diagnosis.onsetDate) {
    error.date = 'patient.diagnoses.error.dateRequired'
  }

  if (!diagnosis.status) {
    error.status = 'patient.diagnoses.error.statusRequired'
  }

  return error
}

// Thunk to add a diagnosis to a patient using Axios
export const addDiagnosis = (patientId, diagnosis, onSuccess) => async (dispatch) => {
  const newDiagnosisError = validateDiagnosis(diagnosis)

  if (isEmpty(newDiagnosisError)) {
    try {
      // Fetch the patient to update with the new diagnosis
      const { data: patient } = await axios.get(`/api/patients/${patientId}`)
      const diagnoses = patient.diagnoses || []
      diagnoses.push({ ...diagnosis, id: uuid() })
      patient.diagnoses = diagnoses

      // Update the patient with the new diagnosis
      await dispatch(updatePatient(patient, onSuccess))
    } catch (error) {
      dispatch(
        addDiagnosisError({
          message: 'patient.diagnoses.error.unableToAdd',
          details: error.response?.data || error.message,
        }),
      )
    }
  } else {
    newDiagnosisError.message = 'patient.diagnoses.error.unableToAdd'
    dispatch(addDiagnosisError(newDiagnosisError))
  }
}

export default patientSlice.reducer