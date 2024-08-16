import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch a specific note for a patient
async function fetchNoteForPatient(patientId, noteId) {
  if (!patientId || !noteId) {
    throw new Error('Patient ID and Note ID are required');
  }

  try {
    const response = await axios.get(`/api/patients/${patientId}/notes/${noteId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching note');
  }
}

// Custom hook to get a note for a specific patient
export default function usePatientNote(patientId, noteId) {
  return useQuery(
    ['notes', patientId, noteId],
    () => fetchNoteForPatient(patientId, noteId),
    { enabled: !!patientId && !!noteId } // Only fetch if both patientId and noteId are provided
  );
}