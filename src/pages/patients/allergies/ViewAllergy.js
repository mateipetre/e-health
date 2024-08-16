import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, AlertTitle, TextField, Box, CircularProgress, Typography } from '@mui/material';

import useTranslator from '../../../hooks/useTranslator';
import useAllergy from '../hooks/useAllergy';

const ViewAllergy = () => {
  const { t } = useTranslator();
  const { allergyId, id: patientId } = useParams();

  const { data, status } = useAllergy(patientId || '', allergyId || '');

  if (!allergyId || !patientId) {
    return (
      <Alert severity="error">
        <AlertTitle>{t('states.error')}</AlertTitle>
        {t('patient.allergies.error.missingParams')}
      </Alert>
    );
  }

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'error' || !data) {
    return (
      <Alert severity="error">
        <AlertTitle>{t('states.error')}</AlertTitle>
        {t('patient.allergies.error.unableToLoad')}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6">{t('patient.allergies.allergyName')}</Typography>
      <TextField
        label={t('patient.allergies.allergyName')}
        fullWidth
        margin="normal"
        value={data.name}
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  );
};

export default ViewAllergy;