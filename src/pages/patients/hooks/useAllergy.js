import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to get an allergy by patient ID and allergy ID
async function getAllergy(patientId, allergyId) {
  const response = await axios.get(`/api/patients/${patientId}`);
  const patient = response.data;
  const maybeAllergy = patient.allergies?.find((a) => a.id === allergyId);

  if (!maybeAllergy) {
    throw new Error('Allergy not found');
  }

  return maybeAllergy;
}

// Custom hook to fetch allergy data
export default function useAllergy(patientId, allergyId) {
  return useQuery(['allergies', patientId, allergyId], () => getAllergy(patientId, allergyId));
}