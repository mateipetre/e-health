import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch a specific visit
async function fetchVisit(patientId, visitId) {
  const response = await axios.get(`/api/patients/${patientId}/visits/${visitId}`);
  return response.data;
}

// Custom hook to use query for fetching a visit
export default function useVisit(patientId, visitId) {
  return useQuery(
    ['visits', patientId, visitId],
    () => fetchVisit(patientId, visitId),
    {
      enabled: !!patientId && !!visitId, // Ensure the query only runs if both IDs are provided
      staleTime: 60000, // Optional: define a stale time to reduce refetches
      cacheTime: 300000, // Optional: define cache time to keep data in cache
    }
  );
}