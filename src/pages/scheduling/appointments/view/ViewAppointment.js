import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs';
import { useButtonToolbarSetter } from '../../../page-header/button-toolbar/ButtonBarProvider';
import { useUpdateTitle } from '../../../page-header/title/TitleContext';
import usePatient from '../../../patients/hooks/usePatient';
import useTranslator from '../../../../hooks/useTranslator';
import Permissions from '../../../../app-components/Permissions';
import useAppointment from '../../hooks/useAppointment';
import useDeleteAppointment from '../../hooks/useDeleteAppointment';
import AppointmentDetailForm from '../AppointmentDetailForm';
import { getAppointmentLabel } from '../util/scheduling-appointment.util';

const ViewAppointment = () => {
  const { t } = useTranslator();
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    if (updateTitle) {
      updateTitle(t('scheduling.appointments.viewAppointment'));
    }
  }, [updateTitle, t]);

  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: deleteMutate } = useDeleteAppointment({
    onSuccess: () => {
      navigate('/appointments');
      setShowSuccessToast(true);
    },
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const setButtonToolBar = useButtonToolbarSetter();
  const { permissions } = useSelector(state => state.user);

  const { data: appointment } = useAppointment(id || '');
  const { data: patient } = usePatient(appointment ? appointment.patient : '');
  const breadcrumbs = [
    { i18nKey: 'scheduling.appointments.label', location: '/appointments' },
    { text: appointment ? getAppointmentLabel(appointment) : '', location: `/patients/${id}` },
  ];
  useAddBreadcrumbs(breadcrumbs, true);

  const onAppointmentDeleteButtonClick = event => {
    event.preventDefault();
    setShowDeleteConfirmation(true);
  };

  const onDeleteConfirmationButtonClick = () => {
    if (!appointment) {
      return;
    }

    deleteMutate({ appointmentId: appointment.id });
    setShowDeleteConfirmation(false);
  };

  const getButtons = useCallback(() => {
    const buttons = [];
    if (appointment && permissions.includes(Permissions.WriteAppointments)) {
      buttons.push(
        <Button
          key="editAppointmentButton"
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(`/appointments/edit/${appointment.id}`);
          }}
          style={{ marginRight: '8px' }}
        >
          {t('actions.edit')}
        </Button>
      );
    }

    if (permissions.includes(Permissions.DeleteAppointment)) {
      buttons.push(
        <Button
          key="deleteAppointmentButton"
          variant="contained"
          color="secondary"
          onClick={onAppointmentDeleteButtonClick}
        >
          {t('scheduling.appointments.deleteAppointment')}
        </Button>
      );
    }

    return buttons;
  }, [appointment, navigate, permissions, t]);

  useEffect(() => {
    setButtonToolBar(getButtons());

    return () => {
      setButtonToolBar([]);
    };
  }, [getButtons, setButtonToolBar]);

  return (
    <>
      {patient && appointment ? (
        <div>
          <AppointmentDetailForm appointment={appointment} isEditable={false} patient={patient} />
          <Dialog
            open={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{t('actions.confirmDelete')}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {t('scheduling.appointment.deleteConfirmationMessage')}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDeleteConfirmation(false)} color="primary">
                {t('actions.cancel')}
              </Button>
              <Button onClick={onDeleteConfirmationButtonClick} color="secondary" autoFocus>
                {t('actions.delete')}
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar open={showSuccessToast} autoHideDuration={6000} onClose={() => setShowSuccessToast(false)}>
            <Alert onClose={() => setShowSuccessToast(false)} severity="success" sx={{ width: '100%' }}>
              {t('scheduling.appointment.successfullyDeleted')}
            </Alert>
          </Snackbar>
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default ViewAppointment;