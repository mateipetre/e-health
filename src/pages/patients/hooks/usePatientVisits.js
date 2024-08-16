import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch patient visits
async function fetchPatientVisits(patientId) {
  const { data } = await axios.get(`/api/patients/${patientId}/visits`);
  return data;
}

// Custom hook to use patient visits
export default function usePatientVisits(patientId) {
  return useQuery(
    ['visits', patientId],
    () => fetchPatientVisits(patientId),
    { enabled: !!patientId } // Only fetch if patientId is provided
  );
}