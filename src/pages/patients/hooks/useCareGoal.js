import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to get a care goal by patient ID and care goal ID
async function getCareGoal(patientId, careGoalId) {
  const response = await axios.get(`/api/patients/${patientId}`);
  const patient = response.data;
  const maybeCareGoal = patient.careGoals?.find((c) => c.id === careGoalId);

  if (!maybeCareGoal) {
    throw new Error('Care Goal not found');
  }

  return maybeCareGoal;
}

// Custom hook to fetch care goal data
export default function useCareGoal(patientId, careGoalId) {
  return useQuery(['care-goals', patientId, careGoalId], () => getCareGoal(patientId, careGoalId));
}
