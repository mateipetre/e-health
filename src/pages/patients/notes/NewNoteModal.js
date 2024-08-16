import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material';
import useTranslator from '../../../hooks/useTranslator';
import useAddPatientNote from '../hooks/useAddPatientNote';

const initialNoteState = { text: '', date: new Date().toISOString(), deleted: false };

const NewNoteModal = ({ show, toggle, onCloseButtonClick, patientId }) => {
  const { t } = useTranslator();
  const { mutate } = useAddPatientNote();

  const [noteError, setNoteError] = useState(undefined);
  const [note, setNote] = useState(initialNoteState);

  const onNoteTextChange = (event) => {
    const text = event.target.value;
    setNote({
      ...note,
      text,
    });
  };

  const onSaveButtonClick = async () => {
    try {
      await mutate({ patientId, note });
      setNote(initialNoteState);
      onCloseButtonClick();
    } catch (e) {
      setNoteError(e);
    }
  };

  return (
    <Dialog open={show} onClose={toggle}>
      <DialogTitle>{t('patient.notes.new')}</DialogTitle>
      <DialogContent>
        {noteError && (
          <Alert severity="error">
            {t('patient.notes.error.unableToAdd')}
          </Alert>
        )}
        <TextField
          fullWidth
          multiline
          rows={4}
          label={t('patient.note')}
          value={note.text}
          error={!!noteError?.noteError}
          helperText={t(noteError?.noteError || '')}
          onChange={onNoteTextChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseButtonClick} color="error">
          {t('actions.cancel')}
        </Button>
        <Button onClick={onSaveButtonClick} color="success">
          {t('patient.notes.new')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewNoteModal;
