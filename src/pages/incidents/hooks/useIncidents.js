import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch incidents based on search parameters from the API
async function fetchIncidents(searchRequest) {
  const response = await axios.get('/api/incidents/search', {
    params: searchRequest,
  });
  return response.data;
}

// Custom hook to fetch incidents with search parameters
export default function useIncidents(searchRequest) {
  return useQuery(['incidents', searchRequest], () => fetchIncidents(searchRequest), {
    // Optionally configure your query here
    retry: false, // Disable retries for failed requests
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
}