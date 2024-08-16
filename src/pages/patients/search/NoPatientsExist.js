import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

import useTranslator from '../../../hooks/useTranslator';

const NoPatientsExist = () => {
  const navigate = useNavigate();
  const { t } = useTranslator();

  return (
    <Box display="flex" justifyContent="center">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" justifyContent="center">
          <PersonAdd style={{ fontSize: 96 }} />
        </Box>
        <Box display="flex" justifyContent="center" textAlign="center" width="60%" mt={2}>
          <Typography variant="h5">{t('patients.noPatients')}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<PersonAdd />}
            onClick={() => navigate('/patients/new')}
          >
            {t('patients.newPatient')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NoPatientsExist;