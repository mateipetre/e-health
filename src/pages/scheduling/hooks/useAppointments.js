import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch all appointments
async function fetchAppointments() {
  const { data } = await axios.get('/api/appointments');
  return data;
}

// Custom hook to use appointments data
export default function useAppointments() {
  return useQuery(
    ['appointments'],
    fetchAppointments,
    {
      staleTime: 60000, // Optional: Define how long the data remains fresh
      cacheTime: 300000, // Optional: Define how long data remains in the cache
    }
  );
}