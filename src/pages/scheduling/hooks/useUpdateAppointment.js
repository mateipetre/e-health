import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import validateAppointment from '../appointments/util/validate-appointment';

// Function to update an appointment using axios
const updateAppointment = async (appointment) => {
  const validationErrors = validateAppointment(appointment);
  if (validationErrors.length > 0) {
    throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
  }

  try {
    // Assuming the endpoint to update an appointment is '/api/appointments/:id'
    const response = await axios.put(`/api/appointments/${appointment.id}`, appointment);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update appointment: ${error.response?.data?.message || error.message}`);
  }
};

// Custom hook for updating an appointment
export default function useUpdateAppointment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAppointment,
    onSuccess: async () => {
      // Invalidate the appointments query to refresh the list
      await queryClient.invalidateQueries(['appointments']);
    },
    onError: (error) => {
      // Handle or log the error
      console.error('Error updating appointment:', error.message);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
}