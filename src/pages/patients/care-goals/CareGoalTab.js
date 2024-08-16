import React, { useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams, Route, Routes } from 'react-router-dom';
import useTranslator from '../../../hooks/useTranslator';
import Permissions from '../../../app-components/Permissions';
import usePatient from '../hooks/usePatient';
import AddCareGoalModal from './AddCareGoalModal';
import ViewCareGoal from './ViewCareGoal';
import ViewCareGoals from './ViewCareGoals';

const CareGoalTab = () => {
  const { id: patientId } = useParams();
  const { t } = useTranslator();
  const { permissions } = useSelector((state) => state.user);
  const { data, status } = usePatient(patientId) || { data: null, status: 'loading' };
  const [showAddCareGoalModal, setShowAddCareGoalModal] = useState(false);

  if (status === 'loading' || data === undefined) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        {permissions.includes(Permissions.AddCareGoal) && (
          <Button
            variant="outlined"
            color="success"
            startIcon={<i className="material-icons">add</i>}
            onClick={() => setShowAddCareGoalModal(true)}
          >
            {t('patient.careGoal.new')}
          </Button>
        )}
      </Box>
      <Routes>
        <Route path="/patients/:id/care-goals" element={<ViewCareGoals />} />
        <Route path="/patients/:id/care-goals/:careGoalId" element={<ViewCareGoal />} />
      </Routes>
      <AddCareGoalModal
        patient={data}
        show={showAddCareGoalModal}
        onCloseButtonClick={() => setShowAddCareGoalModal(false)}
      />
    </>
  );
};

export default CareGoalTab;