import isEmpty from 'lodash/isEmpty';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import validateNote from '../util/validate-note';

// Function to add a note
async function addNote({
  patientId,
  note
}) {
  const error = validateNote(note);

  if (isEmpty(error)) {
    // Fetch the patient
    const response = await axios.get(`/api/patients/${patientId}`);
    const patient = response.data;

    // Add the new note
    const notes = patient.notes ? [...patient.notes] : [];
    const newNote = {
      id: uuidv4(),
      ...note,
    };
    notes.push(newNote);

    // Update the patient with the new note
    const updateResponse = await axios.put(`/api/patients/${patientId}`, {
      ...patient,
      notes,
    });

    return updateResponse.data.notes;
  }

  throw error;
}

// Custom hook to manage adding a note
export default function useAddPatientNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNote,
    onSuccess: async (data, variables) => {
      // Update the notes cache
      await queryClient.setQueryData(['notes', variables.patientId], data);
    },
    onError: (error) => {
      console.error('Error adding note:', error);
    },
    onSettled: () => {
      // Optionally handle settled state
    },
    throwOnError: true,
  });
}