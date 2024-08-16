import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem, Typography, Alert, Autocomplete } from '@mui/material';
import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import useTranslator from '../../../hooks/useTranslator';
import usePatients from '../../patients/hooks/usePatients';
import { requestMedication } from '../medication-slice';

const NewMedicationRequest = () => {
  const { t } = useTranslator();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle(t('medications.requests.new'));
  }, [t, updateTitle]);

  const { status, error } = useSelector((state) => state.medication);

  const [newMedicationRequest, setNewMedicationRequest] = useState({
    patient: '',
    medication: '',
    notes: '',
    status: '',
    intent: 'order',
    priority: '',
    quantity: { value: '', unit: '' },
  });

  const statusOptions = [
    { label: t('medications.status.draft'), value: 'draft' },
    { label: t('medications.status.active'), value: 'active' },
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

  const breadcrumbs = [
    {
      i18nKey: 'medications.requests.new',
      location: '/medications/new',
    },
  ];

  useAddBreadcrumbs(breadcrumbs);

  const { data: patients = [], refetch: searchPatients } = usePatients();

  const onPatientChange = (event, value) => {
    setNewMedicationRequest((prev) => ({
      ...prev,
      patient: value?.id || '',
      fullName: value?.fullName || '',
    }));
  };

  const onMedicationChange = (event) => {
    setNewMedicationRequest((prev) => ({
      ...prev,
      medication: event.target.value,
    }));
  };

  const onNoteChange = (event) => {
    setNewMedicationRequest((prev) => ({
      ...prev,
      notes: event.target.value,
    }));
  };

  const onFieldChange = (key, value) => {
    setNewMedicationRequest((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onTextInputChange = (text, path) => {
    setNewMedicationRequest((prev) => {
      const updatedRequest = { ...prev };
      const [field, subfield] = path;
      updatedRequest[field] = { ...updatedRequest[field], [subfield]: text };
      return updatedRequest;
    });
  };

  const onSave = async () => {
    const onSuccess = (createdMedication) => {
      navigate(`/medications/${createdMedication.id}`);
    };

    dispatch(requestMedication(newMedicationRequest, onSuccess));
  };

  const onCancel = () => {
    navigate('/medications');
  };

  return (
    <>
      {status === 'error' && (
        <Alert severity="error">
          {t(error.message || '')}
        </Alert>
      )}
      <form aria-label="Medication Request form">
        <Typography variant="h6" gutterBottom>
          {t('medications.medication.patient')}
        </Typography>
        <Autocomplete
          id="patientTypeahead"
          options={patients} // Use the patients fetched by usePatients
          getOptionLabel={(option) => `${option.fullName} (${option.code})`}
          onChange={onPatientChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('medications.medication.patient')}
              variant="outlined"
            />
          )}
          onInputChange={async (event, value) => {
            if (value) {
              await searchPatients({ queryString: value });
            }
          }}
        />

        <TextField
          label={t('medications.medication.medication')}
          required
          fullWidth
          variant="outlined"
          margin="normal"
          value={newMedicationRequest.medication}
          onChange={onMedicationChange}
          error={!!error.medication}
          helperText={t(error.medication || '')}
        />

        <TextField
          select
          label={t('medications.medication.status')}
          required
          fullWidth
          variant="outlined"
          margin="normal"
          value={newMedicationRequest.status}
          onChange={(e) => onFieldChange('status', e.target.value)}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label={t('medications.medication.intent')}
          required
          fullWidth
          variant="outlined"
          margin="normal"
          value={newMedicationRequest.intent}
          onChange={(e) => onFieldChange('intent', e.target.value)}
        >
          {intentOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label={t('medications.medication.priority')}
          required
          fullWidth
          variant="outlined"
          margin="normal"
          value={newMedicationRequest.priority}
          onChange={(e) => onFieldChange('priority', e.target.value)}
        >
          {priorityOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label={t('medications.medication.quantityValue')}
          fullWidth
          variant="outlined"
          margin="normal"
          value={newMedicationRequest.quantity.value}
          onChange={(e) => onTextInputChange(e.target.value, ['quantity', 'value'])}
          error={!!error.quantityValue}
          helperText={t(error.quantityValue || '')}
        />

        <TextField
          label={t('medications.medication.quantityUnit')}
          fullWidth
          variant="outlined"
          margin="normal"
          value={newMedicationRequest.quantity.unit}
          onChange={(e) => onTextInputChange(e.target.value, ['quantity', 'unit'])}
          error={!!error.quantityUnit}
          helperText={t(error.quantityUnit || '')}
        />

        <TextField
          label={t('medications.medication.notes')}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          margin="normal"
          value={newMedicationRequest.notes}
          onChange={onNoteChange}
        />

        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
            style={{ marginRight: 8 }}
          >
            {t('medications.requests.new')}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onCancel}
          >
            {t('actions.cancel')}
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewMedicationRequest;
