import { useMutation, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { validateLabRequest } from '../util/validate-lab';

// Function to request a new lab
async function requestLab(newLab) {
  const requestLabErrors = validateLabRequest(newLab);

  if (isEmpty(requestLabErrors)) {
    newLab.requestedOn = new Date().toISOString();

    const response = await axios.post('/api/labs/save', newLab);
    return response.data;
  }

  throw requestLabErrors;
}

// Custom hook to request a lab
export default function useRequestLab() {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: requestLab,
    onSuccess: async () => {
      // Invalidate and refetch labs queries to update the UI
      await queryClient.invalidateQueries('labs');
    },
    onError: (error) => {
      console.error('Error requesting lab:', error);
    },
  });
}