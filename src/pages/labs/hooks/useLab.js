import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch a lab by its ID from the API
async function fetchLab(labId) {
  const response = await axios.get(`/api/labs/${labId}`);
  return response.data;
}

// Custom hook to use the lab query
export default function useLab(labId) {
  return useQuery(['lab', labId], () => fetchLab(labId));
}