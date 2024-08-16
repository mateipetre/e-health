import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Snackbar, CircularProgress } from '@mui/material';
import { Alert } from '@mui/material';
import addMinutes from 'date-fns/addMinutes';
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes';

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs';
import { useUpdateTitle } from '../../../page-header/title/TitleContext';
import useTranslator from '../../../.././hooks/useTranslator';
import useScheduleAppointment from '../../hooks/useScheduleAppointment';
import AppointmentDetailForm from '../AppointmentDetailForm';

const breadcrumbs = [
  { i18nKey: 'scheduling.appointments.label', location: '/appointments' },
  { i18nKey: 'scheduling.appointments.new', location: '/appointments/new' },
];

const NewAppointment = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient;
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle(t('scheduling.appointments.new'));
  }, [updateTitle, t]);

  useAddBreadcrumbs(breadcrumbs, true);

  const startDateTime = roundToNearestMinutes(new Date(), { nearestTo: 15 });
  const endDateTime = addMinutes(startDateTime, 60);
  const [saved, setSaved] = useState(false);
  const [newAppointmentMutateError, setError] = useState({});
  const [newAppointment, setAppointment] = useState({
    patient: patient || '',
    startDateTime: startDateTime.toISOString(),
    endDateTime: endDateTime.toISOString(),
    location: '',
    reason: '',
    type: '',
  });

  const {
    mutate: newAppointmentMutate,
    isLoading: isLoadingNewAppointment,
    isError: isErrorNewAppointment,
    validator: validateNewAppointment,
  } = useScheduleAppointment();

  const onCancelClick = () => {
    navigate('/appointments');
  };

  const onSave = () => {
    setSaved(true);
    setError(validateNewAppointment(newAppointment));
  };

  useEffect(() => {
    if (saved) {
      if (!newAppointmentMutateError && !isErrorNewAppointment) {
        newAppointmentMutate(newAppointment).then((result) => {
          setSaved(false);
          setShowSuccessToast(true);
          navigate(`/appointments/${result.id}`);
        });
      } else {
        setSaved(false);
      }
    }
  }, [saved, newAppointmentMutateError, isErrorNewAppointment, newAppointmentMutate, newAppointment, t, navigate]);

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  if (isLoadingNewAppointment) {
    return <CircularProgress color="primary" />;
  }

  const onFieldChange = (key, value) => {
    setAppointment({
      ...newAppointment,
      [key]: value,
    });
  };

  return (
    <div>
      <form aria-label="new appointment form">
        <AppointmentDetailForm
          appointment={newAppointment}
          patient={patient}
          error={newAppointmentMutateError}
          onFieldChange={onFieldChange}
        />
        <div className="row float-right">
          <div className="btn-group btn-group-lg mr-3">
            <Button variant="contained" color="success" onClick={onSave} style={{ marginRight: '8px' }}>
              {t('scheduling.appointments.createAppointment')}
            </Button>
            <Button variant="contained" color="error" onClick={onCancelClick}>
              {t('actions.cancel')}
            </Button>
          </div>
        </div>
      </form>
      <Snackbar open={showSuccessToast} autoHideDuration={6000} onClose={() => setShowSuccessToast(false)}>
        <Alert onClose={() => setShowSuccessToast(false)} severity="success" sx={{ width: '100%' }}>
          {t('scheduling.appointment.successfullyCreated')}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewAppointment;