import React, { useState, useEffect } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import useTranslator from '../../../hooks/useTranslator';
import GeneralInformation from '../GeneralInformation';
import { createPatient } from '../patient-slice';
import { isPossibleDuplicatePatient } from '../util/is-possible-duplicate-patient';
import DuplicateNewPatientModal from './DuplicateNewPatientModal';

const breadcrumbs = [
  { i18nKey: 'patients.label', location: '/patients' },
  { i18nKey: 'patients.newPatient', location: '/patients/new' },
];

const NewPatient = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createError } = useSelector((state) => state.patient);
  const { patients } = useSelector((state) => state.patients);

  const [patient, setPatient] = useState({});
  const [duplicatePatient, setDuplicatePatient] = useState(undefined);
  const [showDuplicateNewPatientModal, setShowDuplicateNewPatientModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const testPatient = {
    givenName: 'Kelly',
    familyName: 'Clark',
    sex: 'female',
    dateOfBirth: '1963-01-09T05:00:00.000Z',
  };

  const updateTitle = useUpdateTitle();
  useEffect(() => {
    updateTitle(t('patients.newPatient'));
  }, [t, updateTitle]);
  
  useAddBreadcrumbs(breadcrumbs, true);

  const onCancel = () => {
    navigate('/patients');
  };

  const onSuccessfulSave = (newPatient) => {
    navigate(`/patients/${newPatient.id}`);
    setSnackbarMessage(`${t('patients.successfullyCreated')} ${newPatient.fullName}`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const onSave = () => {
    let duplicatePatients = [];
    if (patients) {
      duplicatePatients = patients.filter((existingPatient) =>
        isPossibleDuplicatePatient(patient, existingPatient)
      );
    }

    if (duplicatePatients.length > 0) {
      setShowDuplicateNewPatientModal(true);
      setDuplicatePatient(duplicatePatients);
    } else {
      dispatch(createPatient(patient, onSuccessfulSave));
    }

    const testCase = [isPossibleDuplicatePatient(patient, testPatient)];
    if (testCase.length > 0) {
      return true;
    }
    return false;
  };

  const onPatientChange = (newPatient) => {
    setPatient(newPatient);
  };

  const createDuplicateNewPatient = () => {
    dispatch(createPatient(patient, onSuccessfulSave));
  };

  const closeDuplicateNewPatientModal = () => {
    setShowDuplicateNewPatientModal(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <GeneralInformation
        patient={patient}
        isEditable
        onChange={onPatientChange}
        error={createError}
      />
      <div style={{ textAlign: 'right', marginTop: '1rem' }}>
        <Button
          variant="contained"
          color="success"
          onClick={onSave}
          style={{ marginRight: '1rem' }}
        >
          {t('patients.createPatient')}
        </Button>
        <Button variant="outlined" color="error" onClick={onCancel}>
          {t('actions.cancel')}
        </Button>
      </div>

      <DuplicateNewPatientModal
        duplicatePatient={duplicatePatient}
        show={showDuplicateNewPatientModal}
        toggle={closeDuplicateNewPatientModal}
        onContinueButtonClick={createDuplicateNewPatient}
        onCloseButtonClick={closeDuplicateNewPatientModal}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewPatient;
