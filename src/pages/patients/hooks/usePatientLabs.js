import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch patient labs by ID
async function fetchPatientLabs(patientId) {
  const response = await axios.get(`/api/patients/${patientId}/labs`);
  return response.data;
}

// Custom hook to get patient labs
export default function usePatientLabs(patientId) {
  return useQuery(
    ['labs', patientId],
    () => fetchPatientLabs(patientId),
    { enabled: !!patientId } // Fetch only if patientId is provided
  );
}