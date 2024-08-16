import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch related persons for a specific patient
async function fetchPatientRelatedPersons(patientId) {
  if (!patientId) {
    throw new Error('Patient ID is required');
  }

  try {
    const response = await axios.get(`/api/patients/${patientId}/related-persons`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching related persons');
  }
}

// Custom hook to fetch related persons for a specific patient
export default function usePatientRelatedPersons(patientId) {
  return useQuery(
    ['related-persons', patientId],
    () => fetchPatientRelatedPersons(patientId),
    { enabled: !!patientId } // Only fetch if patientId is provided
  );
}