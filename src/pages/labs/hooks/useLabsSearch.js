import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Define default sorting request
const defaultSortRequest = {
  sorts: [
    {
      field: 'requestedOn',
      direction: 'desc',
    },
  ],
};

// Function to fetch labs based on the search request
async function fetchLabs(request) {
  if (!request.text?.trim() && request.status === 'all') {
    const response = await axios.get('/api/labs', {
      params: {
        defaultSortRequest: JSON.stringify(defaultSortRequest),
      },
    });
    return response.data;
  }

  const response = await axios.get('/api/labs/search', {
    params: {
      ...request,
      defaultSortRequest: JSON.stringify(defaultSortRequest),
    },
  });

  return response.data;
}

// Custom hook to use the labs search query
export default function useLabsSearch(request) {
  return useQuery(['labs', request], () => fetchLabs(request));
}