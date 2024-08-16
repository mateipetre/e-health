import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch medication requests from the API
async function fetchMedicationRequests(searchRequest) {
  // Construct the query string from the searchRequest
  const { text, status, defaultSortRequest } = searchRequest;
  const query = new URLSearchParams({
    text: text || '',
    status: status || '',
    defaultSortRequest: JSON.stringify(defaultSortRequest) || '',
  }).toString();
  
  const response = await axios.get(`/api/medications/search?${query}`);
  return response.data;
}

// Custom hook to use the medication search query
export default function useMedicationSearch(searchRequest) {
  return useQuery(['medication-requests', searchRequest], () => fetchMedicationRequests(searchRequest));
}