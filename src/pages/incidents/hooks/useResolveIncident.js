import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Function to resolve an incident by making an API request
async function resolveIncident(incident) {
  // Update the incident status to 'resolved' and set the resolved date
  const updatedIncident = {
    ...incident,
    resolvedOn: new Date(Date.now()).toISOString(),
    status: 'resolved',
  };

  // Send a PUT request to update the incident
  const response = await axios.put(`/api/incidents/${incident.id}`, updatedIncident);
  return response.data;
}

// Custom hook to use for resolving an incident
export default function useResolveIncident() {
  const queryClient = new QueryClient();

  return useMutation(resolveIncident, {
    onSuccess: async (data) => {
      // Set query data and invalidate queries to update the UI
      queryClient.setQueryData(['incident', data.id], data);
      await queryClient.invalidateQueries('incidents'); // Optionally, invalidate the incidents query
    },
    onError: (error) => {
      console.error('Error resolving incident:', error);
    },
  });
}