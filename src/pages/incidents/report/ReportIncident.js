import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText, Grid } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import usePatients from '../../patients/hooks/usePatients';
import useTranslator from '../../../hooks/useTranslator';
import useReportIncident from '../hooks/useReportIncident';

const ReportIncident = () => {
  const { mutate } = useReportIncident();
  const navigate = useNavigate();
  const { t } = useTranslator();
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle(t('incidents.reports.new'));
  }, [t, updateTitle]);

  const breadcrumbs = [
    {
      i18nKey: 'incidents.reports.new',
      location: `/incidents/new`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs);

  const [incident, setIncident] = useState({
    date: new Date(),
    department: '',
    category: '',
    categoryItem: '',
    description: '',
    patient: '',
  });

  const [error, setError] = useState(undefined);

  // Fetching patients using the custom hook
  const { data: patients = [], isLoading: isPatientsLoading } = usePatients({ queryString: '' });

  const handleDateChange = (newDate) => {
    setIncident((prevState) => ({
      ...prevState,
      date: newDate,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setIncident((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const data = await mutate(incident);
      navigate(`/incidents/${data.id}`);
    } catch (e) {
      setError(e);
    }
  };

  const handleCancel = () => {
    navigate('/incidents');
  };

  const handlePatientChange = (event) => {
    const patientId = event.target.value;
    setIncident((prevIncident) => ({
      ...prevIncident,
      patient: patientId,
    }));
  };

  return (
    <form aria-label="Report Incident form">
      <Grid container spacing={2}>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="dateOfIncident">{t('incidents.reports.dateOfIncident')}</InputLabel>
            <DateTimePicker
              value={incident.date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} error={!!error?.date} helperText={t(error?.date)} />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth>
            <TextField
              label={t('incidents.reports.department')}
              name="department"
              value={incident.department}
              onChange={handleInputChange}
              error={!!error?.department}
              helperText={t(error?.department)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <FormControl fullWidth>
            <TextField
              label={t('incidents.reports.category')}
              name="category"
              value={incident.category}
              onChange={handleInputChange}
              error={!!error?.category}
              helperText={t(error?.category)}
            />
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth>
            <TextField
              label={t('incidents.reports.categoryItem')}
              name="categoryItem"
              value={incident.categoryItem}
              onChange={handleInputChange}
              error={!!error?.categoryItem}
              helperText={t(error?.categoryItem)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <FormControl fullWidth>
            <TextField
              label={t('incidents.reports.description')}
              name="description"
              value={incident.description}
              onChange={handleInputChange}
              error={!!error?.description}
              helperText={t(error?.description)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="patientTypeahead">{t('incidents.reports.patient')}</InputLabel>
            <Select
              id="patientTypeahead"
              value={incident.patient}
              onChange={handlePatientChange}
              disabled={isPatientsLoading}
            >
              {patients.map((patient) => (
                <MenuItem key={patient.id} value={patient.id}>
                  {`${patient.fullName} (${patient.code})`}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{t('incidents.reports.patient')}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button variant="contained" color="success" onClick={handleSave}>
            {t('incidents.reports.new')}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="error" onClick={handleCancel}>
            {t('actions.cancel')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ReportIncident;