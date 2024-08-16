import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import validateAppointment from '../appointments/util/validate-appointment';

// Function to create a new appointment
const createNewAppointment = async (appointment) => {
  try {
    const { data } = await axios.post('/api/appointments', appointment);
    return data;
  } catch (error) {
    throw new Error('Failed to create appointment');
  }
};

// Custom hook for scheduling an appointment
export default function useScheduleAppointment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (appointment) => {
      // Validate the appointment before making the API call
      const validationErrors = validateAppointment(appointment);
      if (validationErrors.length > 0) {
        throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
      }

      // Proceed with creating the appointment if no validation errors
      return createNewAppointment(appointment);
    },
    onSuccess: async () => {
      // Invalidate the appointments query to refresh the list
      await queryClient.invalidateQueries(['appointments']);
    },
    onError: (error) => {
      // Log or handle errors
      console.error('Error scheduling appointment:', error);
    },
  });

  return {
    ...mutation,
    validator: validateAppointment, // Expose the validator if needed for form handling
  };
}
