import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch patient data by ID
async function fetchPatient(id) {
  const response = await axios.get(`/api/patients/${id}`);
  return response.data;
}

// Custom hook to fetch patient data
export default function usePatient(id) {
  return useQuery(
    ['patient', id],
    () => fetchPatient(id),
    { enabled: !!id }
  );
}