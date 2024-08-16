import { useState } from 'react';
import axios from 'axios';
import uuid from '../../../util/uuid';
import validateAllergy from '../util/validate-allergy';

// Function to add an allergy to a patient
async function addAllergy(patientId, allergy) {
  const error = validateAllergy(allergy);

  if (Object.keys(error).length === 0) {
    // Fetch the patient
    const response = await axios.get(`/api/patients/${patientId}`);
    const patient = response.data;
    const allergies = patient.allergies ? [...patient.allergies] : [];
    
    // Create a new allergy object
    const newAllergy = {
      id: uuid(),
      ...allergy,
    };
    allergies.push(newAllergy);

    // Update the patient with the new allergy
    const updateResponse = await axios.put(`/api/patients/${patientId}`, {
      ...patient,
      allergies,
    });

    return updateResponse.data.allergies;
  }

  throw new Error('Validation failed');
}

// Custom hook to manage adding an allergy
export default function useAddAllergy() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const add = async (patientId, allergy) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addAllergy(patientId, allergy);
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