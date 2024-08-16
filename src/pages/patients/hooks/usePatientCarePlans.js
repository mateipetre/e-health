import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch patient care plans by ID
async function fetchPatientCarePlans(patientId) {
  const response = await axios.get(`/api/patients/${patientId}/care-plans`);
  return response.data;
}

// Custom hook to get patient care plans
export default function usePatientCarePlans(patientId) {
  return useQuery(
    ['care-plans', patientId],
    () => fetchPatientCarePlans(patientId),
    { enabled: !!patientId } // Only fetch if patientId is provided
  );
}