import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isLoading: false,
  patients: [],
  count: 0,
}

function startLoading(state) {
  state.isLoading = true
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    fetchPatientsStart: startLoading,
    fetchPatientsSuccess(state, action) {
      state.isLoading = false
      state.patients = action.payload
    },
    fetchCountSuccess(state, action) {
      state.count = action.payload
    },
  },
})

export const { fetchPatientsStart, fetchPatientsSuccess, fetchCountSuccess } = patientsSlice.actions

// Thunk to fetch all patients with sorting using Axios
export const fetchPatients = (sortRequest = {}) => async (dispatch) => {
  dispatch(fetchPatientsStart())
  try {
    const response = await axios.get('/api/patients', {
      params: sortRequest, // Sending sortRequest as query parameters
    })
    dispatch(fetchPatientsSuccess(response.data))
  } catch (error) {
    // Handle error (you might want to add an error state in the slice to track this)
    console.error('Failed to fetch patients:', error)
  }
}

// Thunk to search patients using Axios
export const searchPatients = (searchString) => async (dispatch) => {
  dispatch(fetchPatientsStart())

  try {
    let response
    if (searchString.trim() === '') {
      response = await axios.get('/api/patients')
    } else {
      response = await axios.get('/api/patients/search', {
        params: { query: searchString }, // Assuming the search API accepts a 'query' parameter
      })
    }

    const countResponse = await axios.get('/api/patients/count') // Assuming a count API exists
    dispatch(fetchCountSuccess(countResponse.data))
    dispatch(fetchPatientsSuccess(response.data))
  } catch (error) {
    // Handle error
    console.error('Failed to search patients:', error)
  }
}

export default patientsSlice.reducer