import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch patients based on search request
async function fetchPatients(searchRequest) {
  if (!searchRequest) {
    throw new Error('Search request is required');
  }

  try {
    const { queryString } = searchRequest;
    const response = await axios.get(`/api/patients/search`, { params: { queryString } });
    const totalCount = await axios.get(`/api/patients/count`);
    
    return { totalCount: totalCount.data, patients: response.data };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching patients');
  }
}

// Custom hook to fetch patients based on search request
export default function usePatients(searchRequest) {
  return useQuery(
    ['patients', searchRequest],
    () => fetchPatients(searchRequest),
    { enabled: !!searchRequest } // Only fetch if searchRequest is provided
  );
}
