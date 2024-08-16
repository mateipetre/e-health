import React from 'react';
import { Button, Grid, Typography, CircularProgress, Box, TextField, FormControl, InputLabel } from '@mui/material';
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';

import usePatient from '../../patients/hooks/usePatient';
import useTranslator from '../../../hooks/useTranslator';
import Permissions from '../../../app-components/Permissions';
import { extractUsername } from '../../../util/extractUsername';
import useIncident from '../hooks/useIncident';
import useResolveIncident from '../hooks/useResolveIncident';

function ViewIncidentDetails(props) {
  const { incidentId, permissions } = props;
  const navigate = useNavigate();
  const { t } = useTranslator();
  const { data, isLoading } = useIncident(incidentId);
  const { data: patient } = usePatient(data?.patient);
  const { mutate } = useResolveIncident();

  if (data === undefined || isLoading) {
    return <CircularProgress />;
  }

  const onResolve = async () => {
    await mutate(data);
    navigate('/incidents');
  };

  const getButtons = () => {
    const buttons = [];
    if (data.status === 'resolved') {
      return buttons;
    }

    if (permissions.includes(Permissions.ResolveIncident)) {
      buttons.push(
        <Button variant="contained" color="primary" onClick={onResolve} key="incidents.reports.resolve">
          {t('incidents.reports.resolve')}
        </Button>
      );
    }

    return buttons;
  };

  const getResolvedOnDate = () => {
    if (data.status === 'resolved' && data.resolvedOn) {
      return (
        <Grid item xs={12}>
          <Box className="form-group incident-resolved-on">
            <Typography variant="h6">{t('incidents.reports.resolvedOn')}</Typography>
            <Typography variant="body1">{format(new Date(data.resolvedOn), 'yyyy-MM-dd hh:mm a')}</Typography>
          </Box>
        </Grid>
      );
    }
    return null;
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('incidents.reports.dateOfIncident')}</InputLabel>
            <TextField
              value={format(new Date(data.date || ''), 'yyyy-MM-dd hh:mm a')}
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('incidents.reports.status')}</InputLabel>
            <TextField
              value={data.status}
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('incidents.reports.reportedBy')}</InputLabel>
            <TextField
              value={extractUsername(data.reportedBy)}
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('incidents.reports.reportedOn')}</InputLabel>
            <TextField
              value={format(new Date(data.reportedOn || ''), 'yyyy-MM-dd hh:mm a')}
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </FormControl>
        </Grid>
        {getResolvedOnDate()}
      </Grid>
      <Box className="border-bottom mb-2" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('incidents.reports.department')}</InputLabel>
            <TextField
              name="department"
              value={data.department}
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('incidents.reports.category')}</InputLabel>
            <TextField
              name="category"
              value={data.category}
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('incidents.reports.categoryItem')}</InputLabel>
            <TextField
              name="categoryItem"
              value={data.categoryItem}
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('incidents.reports.description')}</InputLabel>
            <TextField
              name="description"
              value={data.description}
              variant="outlined"
              InputProps={{ readOnly: true }}
              multiline
              rows={4}
            />
          </FormControl>
        </Grid>
      </Grid>
      {data.patient && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>{t('incidents.reports.patient')}</InputLabel>
              <TextField
                name="patient"
                value={patient?.fullName}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </FormControl>
          </Grid>
        </Grid>
      )}
      {data.resolvedOn === undefined && (
        <Box display="flex" justifyContent="flex-end" mt={3} mr={3}>
          <div className="btn-group btn-group-lg">
            {getButtons()}
          </div>
        </Box>
      )}
    </>
  );
}

export default ViewIncidentDetails;