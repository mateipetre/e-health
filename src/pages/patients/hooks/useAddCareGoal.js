import { useState } from 'react';
import axios from 'axios';
import uuid from '../../../util/uuid';
import validateCareGoal from '../util/validate-caregoal';

// Function to add a care goal to a patient
async function addCareGoal(patientId, careGoal) {
  const error = validateCareGoal(careGoal);

  if (Object.keys(error).length === 0) {
    // Fetch the patient
    const response = await axios.get(`/api/patients/${patientId}`);
    const patient = response.data;
    const careGoals = patient.careGoals ? [...patient.careGoals] : [];
    
    // Create a new care goal object
    const newCareGoal = {
      id: uuid(),
      createdOn: new Date().toISOString(),
      ...careGoal,
    };
    careGoals.push(newCareGoal);

    // Update the patient with the new care goal
    const updateResponse = await axios.put(`/api/patients/${patientId}`, {
      ...patient,
      careGoals,
    });

    return updateResponse.data.careGoals;
  }

  error.message = 'patient.careGoal.error.unableToAdd';
  throw new Error(error.message);
}

// Custom hook to manage adding a care goal
export default function useAddCareGoal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const add = async (patientId, careGoal) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addCareGoal(patientId, careGoal);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    add,
    loading,
    error,
    data,
  };
}