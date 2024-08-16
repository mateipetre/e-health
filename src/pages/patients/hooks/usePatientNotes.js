import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch notes for a specific patient
async function fetchPatientNotes(patientId) {
  if (!patientId) {
    throw new Error('Patient ID is required');
  }

  try {
    const response = await axios.get(`/api/patients/${patientId}/notes`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching notes');
  }
}

// Custom hook to fetch notes for a specific patient
export default function usePatientNotes(patientId) {
  return useQuery(
    ['notes', patientId],
    () => fetchPatientNotes(patientId),
    { enabled: !!patientId } // Only fetch if patientId is provided
  );
}