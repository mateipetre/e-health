import { useState, useCallback } from 'react';
import axios from 'axios';
import uuid from '../../../util/uuid';
import validateCarePlan from '../util/validate-careplan';

// Function to add a care plan
async function addCarePlan(patientId, carePlan) {
  const error = validateCarePlan(carePlan);

  if (Object.keys(error).length === 0) {
    // Fetch the patient
    const response = await axios.get(`/api/patients/${patientId}`);
    const patient = response.data;
    const carePlans = patient.carePlans ? [...patient.carePlans] : [];
    
    // Create a new care plan object
    const newCarePlan = {
      id: uuid(),
      createdOn: new Date().toISOString(),
      ...carePlan,
    };
    carePlans.push(newCarePlan);

    // Update the patient with the new care plan
    const updateResponse = await axios.put(`/api/patients/${patientId}`, {
      ...patient,
      carePlans,
    });

    return updateResponse.data.carePlans;
  }

  error.message = 'patient.carePlan.error.unableToAdd';
  throw new Error(error.message);
}

// Custom hook to manage adding a care plan
export default function useAddCarePlan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const addCarePlanMutation = useCallback(async (patientId, carePlan) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addCarePlan(patientId, carePlan);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    addCarePlan: addCarePlanMutation,
    loading,
    error,
    data,
  };
}