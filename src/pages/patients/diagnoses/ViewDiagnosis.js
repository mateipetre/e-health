import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../app-components/Loading';
import useDiagnosis from '../hooks/useDiagnosis';
import usePatient from '../hooks/usePatient';
import DiagnosisForm from './DiagnosisForm';

const ViewDiagnosis = () => {
  const { diagnosisId, id: patientId } = useParams();
  
  // Default values to avoid conditional hook call
  const validPatientId = patientId || '';
  const validDiagnosisId = diagnosisId || '';
  
  const { data: patient, status: patientStatus } = usePatient(validPatientId);
  const { data: diagnosis, status: diagnosisStatus } = useDiagnosis(validPatientId, validDiagnosisId);

  if (!validPatientId || !validDiagnosisId) {
    return <div>Error: Invalid patient or diagnosis ID</div>;
  }

  if (patientStatus === 'loading' || diagnosisStatus === 'loading') {
    return <Loading />;
  }

  if (patientStatus === 'error' || diagnosisStatus === 'error') {
    return <div>Error loading patient or diagnosis</div>;
  }

  if (!diagnosis) {
    return <div>Error: Diagnosis not found</div>;
  }

  if (!patient) {
    return <div>Error: Patient not found</div>;
  }

  return (
    <>
      <h2>{diagnosis.name}</h2>
      <DiagnosisForm patient={patient} diagnosis={diagnosis} disabled />
    </>
  );
};

export default ViewDiagnosis;