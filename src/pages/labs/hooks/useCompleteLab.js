import isEmpty from 'lodash/isEmpty';
import { useMutation, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { validateLabComplete } from '../util/validate-lab';

// Function to complete a lab
async function completeLab(lab) {
  const completeLabErrors = validateLabComplete(lab);

  if (isEmpty(completeLabErrors)) {
    const completedLab = {
      ...lab,
      completedOn: new Date().toISOString(),
      status: 'completed',
    };

    // Make an API call to update the lab status to completed
    const response = await axios.put(`/api/labs/${lab.id}`, completedLab);
    return response.data;
  }

  throw completeLabErrors;
}

export default function useCompleteLab() {
  const queryClient = new QueryClient();

  return useMutation(completeLab, {
    onSuccess: async (data) => {
      queryClient.setQueryData(['lab', data.id], data);  // Update the query cache with the completed lab data
      await queryClient.invalidateQueries('labs');  // Invalidate 'labs' query to refetch the updated data
    },
    onError: (error) => {
      console.error('Error completing lab:', error);
    },
  });
}