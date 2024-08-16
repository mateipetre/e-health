import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Button, Box, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import useTranslator from '../../../hooks/useTranslator';
import Permissions from '../../../app-components/Permissions';
import AllergiesList from './AllergiesList';
import NewAllergyModal from './NewAllergyModal';
import ViewAllergy from './ViewAllergy';

const Allergies = ({ patient }) => {
  const { t } = useTranslator();
  const { permissions } = useSelector((state) => state.user);
  const [showNewAllergyModal, setShowNewAllergyModal] = useState(false);

  const breadcrumbs = [
    {
      i18nKey: 'patient.allergies.label',
      location: `/patients/${patient.id}/allergies`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs);

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        {permissions.includes(Permissions.AddAllergy) && (
          <Button
            variant="outlined"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => setShowNewAllergyModal(true)}
          >
            {t('patient.allergies.new')}
          </Button>
        )}
      </Box>
      <Routes>
        <Route path="/patients/:id/allergies" element={<AllergiesList patientId={patient.id} />} />
        <Route path="/patients/:id/allergies/:allergyId" element={<ViewAllergy />} />
      </Routes>
      <NewAllergyModal
        patientId={patient.id}
        show={showNewAllergyModal}
        onCloseButtonClick={() => setShowNewAllergyModal(false)}
      />
    </Container>
  );
};

export default Allergies;