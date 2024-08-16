import isEmpty from 'lodash/isEmpty';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import validateVisit from '../util/validate-visit';

// Function to add a visit
async function addVisit({
  patientId,
  visit
}) {
  const error = validateVisit(visit);

  if (isEmpty(error)) {
    // Fetch the patient
    const response = await axios.get(`/api/patients/${patientId}`);
    const patient = response.data;

    // Add the new visit
    const visits = patient.visits || [];
    visits.push({
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...visit,
    });

    // Update the patient with the new visit
    const updateResponse = await axios.put(`/api/patients/${patientId}`, {
      ...patient,
      visits,
    });

    return updateResponse.data.visits;
  }

  error.message = 'patient.visits.error.unableToAdd';
  throw error;
}

// Custom hook to manage adding a visit
export default function useAddVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addVisit,
    onSuccess: async (data, variables) => {
      // Update the visits cache
      await queryClient.setQueryData(['visits', variables.patientId], data);
    },
    onError: (error) => {
      console.error('Error adding visit:', error);
    },
    onSettled: () => {
      // Optionally handle settled state
    },
    throwOnError: true,
  });
}