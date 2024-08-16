import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to get an imaging request by its ID from the API
async function getImagingRequestById(imagingRequestId) {
  const response = await axios.get(`/api/imaging/${imagingRequestId}`);
  return response.data;
}

// Custom hook to fetch an imaging request using React Query
export default function useImagingRequest(imagingRequestId) {
  return useQuery(['imaging', imagingRequestId], () => getImagingRequestById(imagingRequestId));
}