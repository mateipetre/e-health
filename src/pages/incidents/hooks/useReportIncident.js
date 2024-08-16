import isEmpty from 'lodash/isEmpty';
import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import shortid from 'shortid';
import validateIncident from '../util/validate-incident';

// Function to generate a unique incident code
const getIncidentCode = () => `I-${shortid.generate()}`;

// API call function to report an incident
async function reportIncident(incident) {
  const error = validateIncident(incident);
  if (isEmpty(error)) {
    const updatedIncident = {
      ...incident,
      code: getIncidentCode(),
      status: 'reported',
      reportedBy: 'some user', // You may want to replace this with dynamic user information
      reportedOn: new Date(Date.now()).toISOString(),
    };

    // Sending a POST request to report the incident
    const response = await axios.post('/api/incidents', updatedIncident);
    return response.data;
  }

  throw error;
}

// Custom hook to use for reporting an incident
export default function useReportIncident() {
  const queryClient = new QueryClient();

  return useMutation(reportIncident, {
    onSuccess: async (data) => {
      // Set query data and invalidate queries to update the UI
      queryClient.setQueryData(['incident', data.id], data);
      await queryClient.invalidateQueries('incidents');
    },
    onError: (error) => {
      console.error('Error reporting incident:', error);
    },
  });
}