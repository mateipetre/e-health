import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import Loading from '../../../../app-components/Loading';

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs';
import { useUpdateTitle } from '../../../page-header/title/TitleContext';
import usePatient from '../../../patients/hooks/usePatient';
import useTranslator from '../../../../hooks/useTranslator';
import useAppointment from '../../hooks/useAppointment';
import useUpdateAppointment from '../../hooks/useUpdateAppointment';
import AppointmentDetailForm from '../AppointmentDetailForm';
import { getAppointmentLabel } from '../util/scheduling-appointment.util';

const EditAppointment = () => {
  const { t } = useTranslator();
  const { id } = useParams();

  const updateTitle = useUpdateTitle();
  useEffect(() => {
    updateTitle(t('scheduling.appointments.editAppointment'));
  }, [updateTitle, t]);

  const navigate = useNavigate();

  const [newAppointment, setAppointment] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const { data: currentAppointment, isLoading: isLoadingAppointment } = useAppointment(id || '');

  const {
    mutate: updateMutate,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: updateMutateError,
  } = useUpdateAppointment(newAppointment);
  const { data: patient } = usePatient(currentAppointment ? currentAppointment.patient : id || '');

  const breadcrumbs = [
    { i18nKey: 'scheduling.appointments.label', location: '/appointments' },
    {
      text: getAppointmentLabel(currentAppointment),
      location: `/appointments/${id}`,
    },
    {
      i18nKey: 'scheduling.appointments.editAppointment',
      location: `/appointments/edit/${id}`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs, true);

  useEffect(() => {
    if (currentAppointment !== undefined) {
      setAppointment(currentAppointment);
    }
  }, [currentAppointment]);

  const onCancel = () => {
    navigate(`/appointments/${newAppointment.id}`);
  };

  const onSave = () => {
    if (!updateMutateError && !isErrorUpdate) {
      updateMutate(newAppointment).then(() => {
        setShowSuccessToast(true);
        navigate(`/appointments/${newAppointment.id}`);
      });
    }
  };

  const onFieldChange = (key, value) => {
    setAppointment({
      ...newAppointment,
      [key]: value,
    });
  };

  if (isLoadingAppointment || isLoadingUpdate) {
    return <Loading />;
  }

  return (
    <div>
      <AppointmentDetailForm
        isEditable
        appointment={newAppointment}
        patient={patient}
        onFieldChange={onFieldChange}
        error={updateMutateError}
      />
      <div className="row float-right">
        <div className="btn-group btn-group-lg mr-3">
          <Button variant="contained" color="success" onClick={onSave} style={{ marginRight: '8px' }}>
            {t('scheduling.appointments.updateAppointment')}
          </Button>
          <Button variant="contained" color="error" onClick={onCancel}>
            {t('actions.cancel')}
          </Button>
        </div>
      </div>
      <Snackbar open={showSuccessToast} autoHideDuration={6000} onClose={() => setShowSuccessToast(false)}>
        <Alert onClose={() => setShowSuccessToast(false)} severity="success" sx={{ width: '100%' }}>
          {t('scheduling.appointment.successfullyUpdated')}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditAppointment;