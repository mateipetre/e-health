import { useMutation, QueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to cancel a lab
async function cancelLab(lab) {
  const updatedLab = {
    ...lab,
    canceledOn: new Date().toISOString(),
    status: 'canceled',
  };

  // Make an API call to update the lab status
  const response = await axios.put(`/api/labs/${lab.id}`, updatedLab);
  return response.data;
}

export default function useCancelLab() {
  const queryClient = new QueryClient();
  
  return useMutation(cancelLab, {
    onSuccess: () => {
      queryClient.invalidateQueries('labs');  // Invalidate 'labs' query to refetch the updated data
    },
    onError: (error) => {
      console.error('Error canceling lab:', error);
    },
  });
}