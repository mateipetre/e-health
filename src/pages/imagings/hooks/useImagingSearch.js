import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Define the API endpoint and any required headers
const API_URL = '/api/imaging/search';

const defaultSortRequest = {
  sorts: [
    {
      field: 'requestedOn',
      direction: 'desc',
    },
  ],
};

// Function to fetch imaging requests from the API
async function fetchImagingRequests(searchRequest) {
  const { text, status } = searchRequest;
  
  // Make a GET request to the API with query parameters
  const response = await axios.get(API_URL, {
    params: {
      text,
      status,
      sorts: JSON.stringify(defaultSortRequest.sorts),
    },
  });
  
  return response.data;
}

// Custom hook to use imaging search
export default function useImagingSearch(searchRequest) {
  return useQuery(
    ['imagingRequests', searchRequest],
    () => fetchImagingRequests(searchRequest),
    {
      // can add additional options here, such as caching and stale time
    }
  );
}