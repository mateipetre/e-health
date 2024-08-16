import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to delete an appointment
const deleteAppointment = async (appointmentId) => {
  await axios.delete(`/api/appointments/${appointmentId}`);
};

// Custom hook for deleting an appointment
export default function useDeleteAppointment(onSuccess) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointment,
    onSuccess: async () => {
      // Invalidate the appointments query to refetch the list of appointments
      await queryClient.invalidateQueries(['appointments']);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      console.error('Error deleting appointment:', error);
    },
  });
}