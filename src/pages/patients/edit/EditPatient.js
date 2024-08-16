import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, CircularProgress, Snackbar, Alert } from '@mui/material';

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import useTranslator from '../../../hooks/useTranslator';
import GeneralInformation from '../GeneralInformation';
import usePatient from '../hooks/usePatient';
import { updatePatient } from '../patient-slice';
import { getPatientCode, getPatientFullName } from '../util/patient-util';

const EditPatient = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: givenPatient, status } = usePatient(id);
  const [patient, setPatient] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { updateError } = useSelector((state) => state.patient);

  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle(
      `${t('patients.editPatient')}: ${getPatientFullName(givenPatient)} (${getPatientCode(givenPatient)})`,
    );
  }, [updateTitle, t, givenPatient]);

  const breadcrumbs = [
    { i18nKey: 'patients.label', location: '/patients' },
    { text: getPatientFullName(givenPatient), location: `/patients/${id}` },
    { i18nKey: 'patients.editPatient', location: `/patients/${id}/edit` },
  ];
  useAddBreadcrumbs(breadcrumbs, true);

  useEffect(() => {
    setPatient(givenPatient || {});
  }, [givenPatient]);

  const onCancel = () => {
    navigate(`/patients/${patient.id}`);
  };

  const onSuccessfulSave = (updatedPatient) => {
    navigate(`/patients/${updatedPatient.id}`);
    setOpenSnackbar(true);
  };

  const onSave = async () => {
    await dispatch(updatePatient(patient, onSuccessfulSave));
  };

  const onPatientChange = (newPatient) => {
    setPatient(newPatient);
  };

  if (status === 'loading') {
    return <CircularProgress color="primary" />;
  }

  return (
    <div>
      <GeneralInformation
        patient={patient}
        isEditable
        onChange={onPatientChange}
        error={updateError}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button variant="contained" color="success" onClick={onSave} style={{ marginRight: '0.5rem' }}>
          {t('patients.updatePatient')}
        </Button>
        <Button variant="outlined" color="error" onClick={onCancel}>
          {t('actions.cancel')}
        </Button>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {`${t('patients.successfullyUpdated')} ${patient.fullName}`}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditPatient;