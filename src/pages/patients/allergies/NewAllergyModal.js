import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useTranslator from '../../../hooks/useTranslator';
import useAddAllergy from '../hooks/useAddAllergy';
import { AllergyError } from '../util/validate-allergy';

const NewAllergyModal = ({ patientId, show, onCloseButtonClick }) => {
  const { t } = useTranslator();
  const { mutate } = useAddAllergy();

  const [allergy, setAllergy] = useState({ name: '' });
  const [allergyError, setAllergyError] = useState(undefined);

  useEffect(() => {
    setAllergy({ name: '' });
  }, [show]);

  const onNameChange = (event) => {
    const name = event.target.value;
    setAllergy((prevAllergy) => ({ ...prevAllergy, name }));
  };

  const onSaveButtonClick = async () => {
    try {
      await mutate({ patientId, allergy });
      onCloseButtonClick();
    } catch (e) {
      if (e instanceof AllergyError) {
        setAllergyError(e);
      } else {
        // Set a default error object that matches the AllergyError type
        setAllergyError({ name: 'Unknown', message: 'An unexpected error occurred' });
      }
    }
  };

  const onClose = () => {
    onCloseButtonClick();
  };

  return (
    <Modal open={show} onClose={onClose}>
      <Box sx={{ ...modalStyle, width: 400 }}>
        <h2>{t('patient.allergies.new')}</h2>
        {allergyError && (
          <Alert severity="error">
            {t('states.error')}: {t('patient.allergies.error.unableToAdd')}
          </Alert>
        )}
        <form>
          <TextField
            label={t('patient.allergies.allergyName')}
            required
            fullWidth
            margin="normal"
            value={allergy.name}
            onChange={onNameChange}
            error={!!allergyError?.nameError}
            helperText={t(allergyError?.nameError || '')}
          />
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button onClick={onClose} color="error" sx={{ marginRight: 1 }}>
            {t('actions.cancel')}
          </Button>
          <Button onClick={onSaveButtonClick} color="success" variant="contained" startIcon={<AddIcon />}>
            {t('patient.allergies.new')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default NewAllergyModal;