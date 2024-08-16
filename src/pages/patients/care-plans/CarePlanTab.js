import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import {
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ErrorIcon from '@mui/icons-material/Error';
import useTranslator from '../../../hooks/useTranslator';
import Permissions from '../../../app-components/Permissions';
import usePatient from '../hooks/usePatient';
import AddCarePlanModal from './AddCarePlanModal';
import ViewCarePlan from './ViewCarePlan';
import ViewCarePlans from './ViewCarePlans';

const CarePlanTab = () => {
  const { id: patientId } = useParams();
  const { t } = useTranslator();
  const { permissions } = useSelector((state) => state.user);
  const { data, status } = usePatient(patientId);
  const [showAddCarePlanModal, setShowAddCarePlanModal] = useState(false);

  if (status === 'loading') {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (status === 'error') {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <ErrorIcon color="error" />
        <Typography variant="h6" color="error">
          {t('patient.error.loading')}
        </Typography>
      </Grid>
    );
  }

  // Ensure data is available before rendering
  if (!data) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Typography variant="h6">{t('patient.noData')}</Typography>
      </Grid>
    );
  }

  return (
    <>
      <Grid container justifyContent="flex-end">
        {permissions.includes(Permissions.AddCarePlan) && (
          <Tooltip title={t('patient.carePlan.new')}>
            <IconButton
              color="primary"
              onClick={() => setShowAddCarePlanModal(true)}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
      <Routes>
        <Route path="/patients/:id/care-plans" element={<ViewCarePlans />} />
        <Route path="/patients/:id/care-plans/:carePlanId" element={<ViewCarePlan />} />
      </Routes>
      <AddCarePlanModal
        patient={data}
        show={showAddCarePlanModal}
        onCloseButtonClick={() => setShowAddCarePlanModal(false)}
      />
    </>
  );
};

export default CarePlanTab;