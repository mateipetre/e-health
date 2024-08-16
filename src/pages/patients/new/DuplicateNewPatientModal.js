import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert, List, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useTranslator from '../../../hooks/useTranslator';

// DuplicateNewPatientModal component
const DuplicateNewPatientModal = ({ duplicatePatient, show, toggle, onCloseButtonClick, onContinueButtonClick }) => {
  const { t } = useTranslator();

  const body = (
    <>
      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="h6">{t('patients.warning')}</Typography>
        <Typography>{t('patients.duplicatePatientWarning')}</Typography>
      </Alert>
      <Typography variant="body1">{t('patients.possibleDuplicatePatient')}</Typography>
      {duplicatePatient && (
        <List>
          {Object.entries(duplicatePatient).map(([key, patient]) => (
            <ListItem key={key.toString()}>
              <Link to={`/patients/${patient.id}`}>{patient.fullName}</Link>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );

  return (
    <Dialog open={show} onClose={toggle} maxWidth="sm" fullWidth>
      <DialogTitle>{t('patients.newPatient')}</DialogTitle>
      <DialogContent>{body}</DialogContent>
      <DialogActions>
        <Button color="error" onClick={onCloseButtonClick}>
          {t('actions.cancel')}
        </Button>
        <Button color="success" onClick={onContinueButtonClick}>
          {t('actions.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DuplicateNewPatientModal;
