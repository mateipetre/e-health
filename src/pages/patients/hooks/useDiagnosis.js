import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to get a diagnosis by patient ID and diagnosis ID
async function getDiagnosis(patientId, diagnosisId) {
  const response = await axios.get(`/api/patients/${patientId}`);
  const patient = response.data;
  const maybeDiagnosis = patient.diagnoses?.find((d) => d.id === diagnosisId);

  if (!maybeDiagnosis) {
    throw new Error('Diagnosis not found');
  }

  return maybeDiagnosis;
}

// Custom hook to fetch diagnosis data
export default function useDiagnosis(patientId, diagnosisId) {
  return useQuery(
    ['diagnoses', patientId, diagnosisId],
    () => getDiagnosis(patientId, diagnosisId),
    { retry: false }
  );
}