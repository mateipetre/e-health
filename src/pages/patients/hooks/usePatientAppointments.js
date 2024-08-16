import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch patient appointments by ID
async function fetchPatientAppointments(patientId) {
  const response = await axios.get(`/api/patients/${patientId}/appointments`);
  return response.data;
}

// Custom hook to get patient appointments
export default function usePatientAppointments(patientId) {
  return useQuery(
    ['appointments', patientId],
    () => fetchPatientAppointments(patientId),
    { enabled: !!patientId } // Only fetch if patientId is provided
  );
}