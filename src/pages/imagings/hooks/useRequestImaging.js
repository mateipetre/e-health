import isEmpty from 'lodash/isEmpty';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { validateImagingRequest } from '../util/validate-imaging-request';

// Define the API endpoint
const API_URL = '/api/imaging/save';

// Function to handle the imaging request
async function requestImaging(request, user) {
  const error = validateImagingRequest(request);

  if (!isEmpty(error)) {
    throw new Error(JSON.stringify(error)); // Throwing error with JSON.stringify to be caught in onError
  }

  // Prepare the request data
  const requestData = {
    ...request,
    requestedBy: user?.id || '',
    requestedByFullName: user?.fullName || '',
    requestedOn: new Date(Date.now()).toISOString(),
  };

  // Make a POST request to save the imaging request
  const response = await axios.post(API_URL, requestData);

  return response.data;
}

// Custom hook to request imaging
export default function useRequestImaging(user) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request) => requestImaging(request, user),
    onSuccess: async () => {
      // Invalidate queries related to imaging to refresh data
      await queryClient.invalidateQueries(['imagingRequests']);
    },
    onError: (error) => {
      console.error('Error requesting imaging:', error);
    },
  });
}