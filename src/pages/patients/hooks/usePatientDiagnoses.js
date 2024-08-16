import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch patient diagnoses by ID
async function fetchPatientDiagnoses(patientId) {
  const response = await axios.get(`/api/patients/${patientId}/diagnoses`);
  return response.data;
}

// Custom hook to get patient diagnoses
export default function usePatientDiagnoses(patientId) {
  return useQuery(
    ['diagnoses', patientId],
    () => fetchPatientDiagnoses(patientId),
    { enabled: !!patientId } // Only fetch if patientId is provided
  );
}
