import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch patient medications by ID
async function fetchPatientMedications(patientId) {
  const response = await axios.get(`/api/patients/${patientId}/medications`);
  return response.data;
}

// Custom hook to get patient medications
export default function usePatientMedications(patientId) {
  return useQuery(
    ['medications', patientId],
    () => fetchPatientMedications(patientId),
    { enabled: !!patientId } // Fetch only if patientId is provided
  );
}