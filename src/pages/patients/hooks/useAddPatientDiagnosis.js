import { useState, useCallback } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import validateDiagnosis from '../util/validate-diagnosis';

// Function to add a diagnosis
async function addDiagnosis(patientId, diagnosis) {
  const error = validateDiagnosis(diagnosis);
  if (Object.keys(error).length === 0) {
    // Fetch the patient
    const response = await axios.get(`/api/patients/${patientId}`);
    const patient = response.data;
    const diagnoses = patient.diagnoses ? [...patient.diagnoses] : [];
    
    // Create a new diagnosis object
    const newDiagnosis = {
      id: uuidv4(),
      ...diagnosis,
    };
    diagnoses.push(newDiagnosis);

    // Update the patient with the new diagnosis
    const updateResponse = await axios.put(`/api/patients/${patientId}`, {
      ...patient,
      diagnoses,
    });

    return updateResponse.data.diagnoses;
  }
  throw new Error('Validation failed');
}

// Custom hook to manage adding a diagnosis
export default function useAddPatientDiagnosis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const addPatientDiagnosisMutation = useCallback(async (patientId, diagnosis) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addDiagnosis(patientId, diagnosis);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    addPatientDiagnosis: addPatientDiagnosisMutation,
    loading,
    error,
    data,
  };
}