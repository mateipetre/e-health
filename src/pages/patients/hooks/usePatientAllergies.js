import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch patient allergies by ID
async function fetchPatientAllergies(patientId) {
  const response = await axios.get(`/api/patients/${patientId}/allergies`);
  return response.data;
}

// Custom hook to get patient allergies
export default function usePatientAllergies(patientId) {
  return useQuery(
    ['allergies', patientId],
    () => fetchPatientAllergies(patientId),
    { enabled: !!patientId } // Only fetch if patientId is provided
  );
}