import isEmpty from 'lodash/isEmpty';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import validateRelatedPerson from '../util/validate-related-person';

// Function to add a related person
async function addRelatedPerson({
  patientId,
  relatedPerson
}) {
  const error = validateRelatedPerson(relatedPerson);

  if (isEmpty(error)) {
    // Fetch the patient
    const response = await axios.get(`/api/patients/${patientId}`);
    const patient = response.data;

    // Add the new related person
    const relatedPersons = patient.relatedPersons ? [...patient.relatedPersons] : [];
    const newRelated = {
      id: uuidv4(),
      ...relatedPerson,
    };
    relatedPersons.push(newRelated);

    // Update the patient with the new related person
    const updateResponse = await axios.put(`/api/patients/${patientId}`, {
      ...patient,
      relatedPersons,
    });

    return updateResponse.data.relatedPersons;
  }

  throw error;
}

// Custom hook to manage adding a related person
export default function useAddPatientRelatedPerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addRelatedPerson,
    onSuccess: async (data, variables) => {
      // Update the related persons cache
      await queryClient.setQueryData(['related-persons', variables.patientId], data);
    },
    onError: (error) => {
      console.error('Error adding related person:', error);
    },
    onSettled: () => {
      // Optionally handle settled state
    },
    throwOnError: true,
  });
}