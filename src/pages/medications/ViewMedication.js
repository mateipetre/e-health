import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Badge } from '@material-ui/core';
import { Alert } from '@mui/lab';
import { format } from 'date-fns';

import useAddBreadcrumbs from '../page-header/breadcrumbs/useAddBreadcrumbs';
import { useUpdateTitle } from '../page-header/title/TitleContext';
import useTranslator from '../../hooks/useTranslator';
import Permissions from '../../app-components/Permissions';
import { cancelMedication, updateMedication, fetchMedication } from './medication-slice';

const getTitle = (patient, medication) =>
  patient && medication ? `${medication.medication} for ${patient.fullName}` : '';

const ViewMedication = () => {
  const { id } = useParams();
  const { t } = useTranslator();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { permissions } = useSelector((state) => state.user);
  const { medication, patient, status, error } = useSelector((state) => state.medication);

  const [medicationToView, setMedicationToView] = useState();
  const [isEditable, setIsEditable] = useState(true);

  const updateTitle = useUpdateTitle();
  useEffect(() => {
    updateTitle(getTitle(patient, medicationToView));
  }, [updateTitle, patient, medicationToView]);

  const breadcrumbs = [
    {
      i18nKey: 'medications.requests.view',
      location: `/medications/${medicationToView?.id}`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs);

  useEffect(() => {
    if (id) {
      dispatch(fetchMedication(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (medication) {
      setMedicationToView({ ...medication });
      setIsEditable(medication.status !== 'completed');
    }
  }, [medication]);

  const statusOptionsEdit = [
    { label: t('medications.status.draft'), value: 'draft' },
    { label: t('medications.status.active'), value: 'active' },
    { label: t('medications.status.onHold'), value: 'on hold' },
    { label: t('medications.status.completed'), value: 'completed' },
    { label: t('medications.status.enteredInError'), value: 'entered in error' },
    { label: t('medications.status.canceled'), value: 'canceled' },
    { label: t('medications.status.unknown'), value: 'unknown' },
  ];

  const intentOptions = [
    { label: t('medications.intent.proposal'), value: 'proposal' },
    { label: t('medications.intent.plan'), value: 'plan' },
    { label: t('medications.intent.order'), value: 'order' },
    { label: t('medications.intent.originalOrder'), value: 'original order' },
    { label: t('medications.intent.reflexOrder'), value: 'reflex order' },
    { label: t('medications.intent.fillerOrder'), value: 'filler order' },
    { label: t('medications.intent.instanceOrder'), value: 'instance order' },
    { label: t('medications.intent.option'), value: 'option' },
  ];

  const priorityOptions = [
    { label: t('medications.priority.routine'), value: 'routine' },
    { label: t('medications.priority.urgent'), value: 'urgent' },
    { label: t('medications.priority.asap'), value: 'asap' },
    { label: t('medications.priority.stat'), value: 'stat' },
  ];

  const onQuantityChange = (text, name) => {
    setMedicationToView(prev => ({
      ...prev,
      quantity: { ...prev.quantity, [name]: text }
    }));
  };

  const onFieldChange = (key, value) => {
    setMedicationToView(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const onNotesChange = (event) => {
    onFieldChange('notes', event.target.value);
  };

  const onUpdate = async () => {
    if (medicationToView) {
      dispatch(updateMedication(medicationToView, () => navigate('/medications')));
    }
  };

  const onCancel = async () => {
    if (medicationToView) {
      dispatch(cancelMedication(medicationToView, () => navigate('/medications')));
    }
  };

  const getButtons = () => {
    const buttons = [];
    if (medicationToView?.status === 'canceled') {
      return buttons;
    }

    buttons.push(
      <Button color="primary" onClick={onUpdate} key="actions.update">
        {t('medications.requests.update')}
      </Button>
    );

    if (permissions.includes(Permissions.CancelMedication)) {
      buttons.push(
        <Button color="secondary" onClick={onCancel} key="medications.requests.cancel">
          {t('medications.requests.cancel')}
        </Button>
      );
    }

    return buttons;
  };

  if (medicationToView && patient) {
    const getBadgeColor = () => {
      if (medicationToView.status === 'canceled') {
        return 'secondary';
      }
      return 'warning';
    };

    const getCancelledOnDate = () => {
      if (medicationToView.status === 'canceled' && medicationToView.canceledOn) {
        return (
          <Grid item xs={12}>
            <Typography variant="h6">{t('medications.medication.canceledOn')}</Typography>
            <Typography variant="body1">
              {format(new Date(medicationToView.canceledOn), 'yyyy-MM-dd hh:mm a')}
            </Typography>
          </Grid>
        );
      }
      return null;
    };

    return (
      <Container>
        {status === 'error' && (
          <Alert severity="error">
            {t(error.message || '')}
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{t('medications.medication.status')}</Typography>
            <Badge color={getBadgeColor()}>
              <Typography variant="body1">{medicationToView.status}</Typography>
            </Badge>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{t('medications.medication.medication')}</Typography>
            <Typography variant="body1">{medicationToView.medication}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{t('medications.medication.quantity')}</Typography>
            <Typography variant="body1">{`${medicationToView.quantity.value} x ${medicationToView.quantity.unit}`}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{t('medications.medication.for')}</Typography>
            <Typography variant="body1">{patient.fullName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{t('medications.medication.requestedOn')}</Typography>
            <Typography variant="body1">
              {format(new Date(medicationToView.requestedOn), 'yyyy-MM-dd hh:mm a')}
            </Typography>
          </Grid>
          {getCancelledOnDate()}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth disabled={!isEditable}>
              <InputLabel>{t('medications.medication.status')}</InputLabel>
              <Select
                value={medicationToView.status}
                onChange={(e) => onFieldChange('status', e.target.value)}
              >
                {statusOptionsEdit.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth disabled={!isEditable}>
              <InputLabel>{t('medications.medication.intent')}</InputLabel>
              <Select
                value={medicationToView.intent}
                onChange={(e) => onFieldChange('intent', e.target.value)}
              >
                {intentOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth disabled={!isEditable}>
              <InputLabel>{t('medications.medication.priority')}</InputLabel>
              <Select
                value={medicationToView.priority}
                onChange={(e) => onFieldChange('priority', e.target.value)}
              >
                {priorityOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={`${t('medications.medication.quantity')} | ${t('medications.medication.quantityValue')}`}
              value={medicationToView.quantity?.value || ''}
              onChange={(e) => onQuantityChange(e.target.value, 'value')}
              fullWidth
              disabled={!isEditable}
              error={!!error?.quantityValue}
              helperText={t(error?.quantityValue || '')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={`${t('medications.medication.quantity')} | ${t('medications.medication.quantityUnit')}`}
              value={medicationToView.quantity?.unit || ''}
              onChange={(e) => onQuantityChange(e.target.value, 'unit')}
              fullWidth
              disabled={!isEditable}
              error={!!error?.quantityUnit}
              helperText={t(error?.quantityUnit || '')}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label={t('medications.medication.notes')}
              multiline
              rows={4}
              value={medicationToView.notes || ''}
              onChange={onNotesChange}
              fullWidth
              disabled={!isEditable}
            />
          </Grid>
        </Grid>
        {isEditable && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {getButtons()}
              </div>
            </Grid>
          </Grid>
        )}
      </Container>
    );
  }

  return <Typography variant="h6">Loading...</Typography>;
};

export default ViewMedication;
