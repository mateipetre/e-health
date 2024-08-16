import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

import Loading from '../../../app-components/Loading';
import useCarePlan from '../hooks/useCarePlan';
import usePatient from '../hooks/usePatient';
import CarePlanForm from './CarePlanForm';

const ViewCarePlan = () => {
  const { carePlanId, id: patientId } = useParams();
  // Default values to avoid conditional hook call
  const validPatientId = patientId || '';
  const validCarePlanId = carePlanId || '';

  const { data: patient, status: patientStatus } = usePatient(validPatientId);
  const { data: carePlan, status: carePlanStatus } = useCarePlan(validPatientId, validCarePlanId);

  if (patientStatus === 'loading' || carePlanStatus === 'loading') {
    return <Loading />;
  }

  if (patientStatus === 'error' || carePlanStatus === 'error' || !patient || !carePlan) {
    return <div>Error: Unable to load data</div>;
  }

  return (
    <Box>
      <Typography variant="h2">{carePlan.title}</Typography>
      <CarePlanForm patient={patient} carePlan={carePlan} disabled />
    </Box>
  );
};

export default ViewCarePlan;