import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to update a lab
async function updateLab(labToUpdate) {
  const response = await axios.put(`/api/labs/${labToUpdate.id}`, labToUpdate);
  return response.data;
}

// Custom hook to update a lab
export default function useUpdateLab() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLab,
    onSuccess: async (data) => {
      // Update the lab data in the query cache
      queryClient.setQueryData(['lab', data.id], data);
      // Invalidate the query to refresh the list of labs
      await queryClient.invalidateQueries(['labs']);
    },
    onError: (error) => {
      console.error('Error updating lab:', error);
    },
  });
}