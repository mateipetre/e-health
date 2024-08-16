import React from 'react';
import { Alert, List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Loading from '../../../app-components/Loading';
import useTranslator from '../../../hooks/useTranslator';
import usePatientAllergies from '../hooks/usePatientAllergies';

const AllergiesList = ({ patientId }) => {
  const navigate = useNavigate();
  const { t } = useTranslator();
  const { data, status } = usePatientAllergies(patientId);

  if (status === 'loading') {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return (
      <Alert severity="warning">
        {t('patient.allergies.warning.noAllergies')}
        <br />
        {t('patient.allergies.addAllergyAbove')}
      </Alert>
    );
  }

  return (
    <List>
      {data.map((a) => (
        <ListItemButton key={a.id} onClick={() => navigate(`/patients/${patientId}/allergies/${a.id}`)}>
          <ListItemText primary={a.name} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default AllergiesList;