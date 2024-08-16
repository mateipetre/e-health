import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch an appointment by ID
async function fetchAppointmentById(appointmentId) {
  if (!appointmentId) {
    throw new Error('Appointment ID is required');
  }
  const { data } = await axios.get(`/api/appointments/${appointmentId}`);
  return data;
}

// Custom hook to use appointment data
export default function useAppointment(appointmentId) {
  return useQuery(
    ['appointment', appointmentId],
    () => fetchAppointmentById(appointmentId),
    {
      enabled: !!appointmentId, // Only fetch if appointmentId is provided
      staleTime: 60000, // Optional: Define how long the data remains fresh
      cacheTime: 300000, // Optional: Define how long data remains in the cache
    }
  );
}