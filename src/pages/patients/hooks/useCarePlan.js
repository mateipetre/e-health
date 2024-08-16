import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to get a care plan by patient ID and care plan ID
async function getCarePlan(patientId, carePlanId) {
  const response = await axios.get(`/api/patients/${patientId}`);
  const patient = response.data;
  const maybeCarePlan = patient.carePlans?.find((p) => p.id === carePlanId);

  if (!maybeCarePlan) {
    throw new Error('Care Plan not found');
  }

  return maybeCarePlan;
}

// Custom hook to fetch care plan data
export default function useCarePlan(patientId, carePlanId) {
  return useQuery(['care-plans', patientId, carePlanId], () => getCarePlan(patientId, carePlanId));
}