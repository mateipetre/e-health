import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch patient care goals by ID
async function fetchPatientCareGoals(patientId) {
  const response = await axios.get(`/api/patients/${patientId}/care-goals`);
  return response.data;
}

// Custom hook to get patient care goals
export default function usePatientCareGoals(patientId) {
  return useQuery(
    ['care-goals', patientId],
    () => fetchPatientCareGoals(patientId),
    { enabled: !!patientId } // Only fetch if patientId is provided
  );
}