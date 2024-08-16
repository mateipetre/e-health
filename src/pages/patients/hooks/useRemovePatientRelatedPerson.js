import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to remove a related person
async function removeRelatedPerson({ patientId, relatedPersonId }) {
  await axios.delete(`/api/patients/${patientId}/related-persons/${relatedPersonId}`);
  return { patientId, relatedPersonId };
}

// Custom hook to use mutation for removing a related person
export default function useRemovePatientRelatedPerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeRelatedPerson,
    onSuccess: async ({ patientId }) => {
      // Invalidate and refetch related persons for the patient
      await queryClient.invalidateQueries(['related-persons', patientId]);
    },
    onError: (error) => {
      console.error('Error removing related person:', error);
    },
    onSettled: () => {
      // Optionally handle settled state
    },
  });
}
