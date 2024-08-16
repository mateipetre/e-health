import React from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Typography, CircularProgress, Box } from '@mui/material';

import useTranslator from '../../../hooks/useTranslator';
import usePatientNote from '../hooks/usePatientNote';

const ViewNote = () => {
  const { t } = useTranslator();
  const { noteId, id: patientId } = useParams();

  // Default values to avoid conditional hook call
  const validPatientId = patientId || '';
  const validNoteId = noteId || '';

  const { data, status } = usePatientNote(validPatientId, validNoteId);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="subtitle1">Date: {new Date(data.date).toLocaleString()}</Typography>
      <TextField
        fullWidth
        label={t('patient.note')}
        variant="outlined"
        value={data.text}
        InputProps={{
          readOnly: true,
        }}
        margin="normal"
      />
    </div>
  );
};

export default ViewNote;