import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem, TextField, Button, FormControl, InputLabel, Alert, Grid } from '@mui/material';
import format from 'date-fns/format';
import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import useTranslator from '../../../hooks/useTranslator';
import useRequestImaging from '../hooks/useRequestImaging';

const NewImagingRequest = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const updateTitle = useUpdateTitle();
  useEffect(() => {
    updateTitle(t('imagings.requests.new'));
  }, [t, updateTitle]);

  const { mutate } = useRequestImaging(user);
  const [error, setError] = useState(null);
  const [visitOption, setVisitOption] = useState([]);

  const statusOptions = [
    { label: t('imagings.status.requested'), value: 'requested' },
    { label: t('imagings.status.completed'), value: 'completed' },
    { label: t('imagings.status.canceled'), value: 'canceled' },
  ];

  const [newImagingRequest, setNewImagingRequest] = useState({
    patient: '',
    fullName: '',
    status: 'requested',
    notes: '',
    type: '',
    visitId: '',
  });

  const breadcrumbs = [
    {
      i18nKey: 'imagings.requests.new',
      location: `/imaging/new`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs);

  const onPatientChange = (event, patient) => {
    if (patient) {
      setNewImagingRequest((prev) => ({
        ...prev,
        patient: patient.id,
        fullName: patient.fullName,
      }));

      const visits = patient.visits?.map((v) => ({
        label: `${v.type} at ${format(new Date(v.startDateTime), 'yyyy-MM-dd hh:mm a')}`,
        value: v.id,
      })) || [];

      setVisitOption(visits);
    } else {
      setNewImagingRequest((prev) => ({
        ...prev,
        patient: '',
        fullName: '',
        visitId: '',
      }));
      setVisitOption([]);
    }
  };

  const onImagingTypeChange = (event) => {
    const type = event.target.value;
    setNewImagingRequest((prev) => ({
      ...prev,
      type,
    }));
  };

  const onStatusChange = (event) => {
    const value = event.target.value;
    setNewImagingRequest((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const onVisitChange = (event) => {
    const value = event.target.value;
    setNewImagingRequest((prev) => ({
      ...prev,
      visitId: value,
    }));
  };

  const onNoteChange = (event) => {
    const notes = event.target.value;
    setNewImagingRequest((prev) => ({
      ...prev,
      notes,
    }));
  };

  const onSave = async () => {
    try {
      await mutate(newImagingRequest);
      navigate('/imaging');
    } catch (e) {
      setError(e);
    }
  };

  const onCancel = () => {
    navigate('/imaging');
  };

  return (
    <>
      {error && (
        <Alert severity="error">
          {t(error.message)}
        </Alert>
      )}
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="patientTypeahead">{t('imagings.imaging.patient')}</InputLabel>
              <Select
                id="patientTypeahead"
                value={newImagingRequest.patient}
                onChange={(e) => onPatientChange(e, e.target.value)}
                displayEmpty
                renderValue={(selected) => selected ? newImagingRequest.fullName : t('imagings.imaging.patient')}
              >
                {/* You need to implement your own patient search and mapping logic */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="visitSelect">{t('patient.visits.label')}</InputLabel>
              <Select
                id="visitSelect"
                value={newImagingRequest.visitId}
                onChange={onVisitChange}
                displayEmpty
              >
                {visitOption.map((visit) => (
                  <MenuItem key={visit.value} value={visit.value}>
                    {visit.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TextField
          fullWidth
          margin="normal"
          label={t('imagings.imaging.type')}
          required
          value={newImagingRequest.type}
          onChange={onImagingTypeChange}
          error={!!error?.type}
          helperText={t(error?.type)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="statusSelect">{t('imagings.imaging.status')}</InputLabel>
          <Select
            id="statusSelect"
            value={newImagingRequest.status}
            onChange={onStatusChange}
            displayEmpty
          >
            {statusOptions.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label={t('imagings.imaging.notes')}
          value={newImagingRequest.notes}
          onChange={onNoteChange}
          multiline
          rows={4}
        />
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button variant="contained" color="success" onClick={onSave}>
              {t('imagings.requests.create')}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={onCancel}>
              {t('actions.cancel')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewImagingRequest;