import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch incident data by ID from the API
async function fetchIncidentById(incidentId) {
  const response = await axios.get(`/api/incidents/${incidentId}`);
  return response.data;
}

// Custom hook to fetch an incident by ID
export default function useIncident(incidentId) {
  return useQuery(['incident', incidentId], () => fetchIncidentById(incidentId), {
    // Optionally configure your query here
    retry: false, // Disable retries for failed requests
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
}