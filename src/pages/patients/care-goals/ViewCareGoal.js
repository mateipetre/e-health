import React from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../../../app-components/Loading';
import useCareGoal from '../hooks/useCareGoal';
import CareGoalForm from './CareGoalForm';

const ViewCareGoal = () => {
  const { careGoalId, id: patientId } = useParams();

  // Default values to avoid conditional hook call
  const validPatientId = patientId || '';
  const validCareGoalId = careGoalId || '';

  const { data: careGoal, status } = useCareGoal(validPatientId, validCareGoalId) || { data: null, status: 'loading' };

  if (!patientId || !careGoalId) {
    return <div>Error: Invalid patient or care goal ID</div>;
  }

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <div>Error loading care goal</div>;
  }

  if (!careGoal) {
    return <div>Error: Care goal not found</div>;
  }

  return <CareGoalForm careGoal={careGoal} disabled />;
};

export default ViewCareGoal;