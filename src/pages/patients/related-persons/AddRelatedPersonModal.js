import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Alert, Autocomplete, Box } from '@mui/material';
import format from 'date-fns/format';

import useTranslator from '../../../hooks/useTranslator';
import useAddPatientRelatedPerson from '../hooks/useAddPatientRelatedPerson';
import usePatients from '../hooks/usePatients';

const AddRelatedPersonModal = (props) => {
  const { t } = useTranslator();

  const { patientId, show, toggle, onCloseButtonClick } = props;
  const [relatedPerson, setRelatedPerson] = useState({
    patientId: '',
    type: '',
  });

  const [patientQuery] = useState('');

  const { data, status } = usePatients({ queryString: patientQuery });
  let patients = [];

  if (data !== undefined && (status === 'error' || status === 'success')) {
    patients = data.patients.filter((p) => p.id !== patientId);
  }

  const { mutate } = useAddPatientRelatedPerson();
  const [relatedPersonError, setRelatedPersonError] = useState(undefined);

  const onFieldChange = (key, value) => {
    setRelatedPerson({
      ...relatedPerson,
      [key]: value,
    });
  };

  const onInputElementChange = (event, fieldName) => {
    onFieldChange(fieldName, event.target.value);
  };

  const onPatientSelect = (event, value) => {
    if (value) {
      setRelatedPerson({ ...relatedPerson, patientId: value.id });
    }
  };

  const onSaveButtonClick = async () => {
    try {
      await mutate({ patientId, relatedPerson });
      onCloseButtonClick();
    } catch (e) {
      setRelatedPersonError(e);
    }
  };

  const formattedDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : '');

  return (
    <Dialog open={show} onClose={toggle}>
      <DialogTitle>{t('patient.relatedPersons.add')}</DialogTitle>
      <DialogContent>
        {relatedPersonError && (
          <Alert severity="error">{t('patient.relatedPersons.error.unableToAddRelatedPerson')}</Alert>
        )}
        <Box sx={{ mt: 2 }}>
          <Autocomplete
            id="relatedPersonTypeAhead"
            options={patients}
            getOptionLabel={(p) => `${p.fullName} - ${formattedDate(p.dateOfBirth)} (${p.code})`}
            onChange={onPatientSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('patient.relatedPerson')}
                error={!!relatedPersonError?.relatedPersonError}
                helperText={relatedPersonError?.relatedPersonError && t(relatedPersonError.relatedPersonError)}
              />
            )}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label={t('patient.relatedPersons.relationshipType')}
            value={relatedPerson.type}
            onChange={(event) => onInputElementChange(event, 'type')}
            error={!!relatedPersonError?.relationshipTypeError}
            helperText={relatedPersonError?.relationshipTypeError && t(relatedPersonError.relationshipTypeError)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseButtonClick} color="error">
          {t('actions.cancel')}
        </Button>
        <Button onClick={onSaveButtonClick} color="success" variant="contained">
          {t('patient.relatedPersons.add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRelatedPersonModal;