import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Alert, Grid } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import useTranslator from '../../../hooks/useTranslator';
import { VisitStatus } from '../../model/Visit';

const VisitForm = (props) => {
  const { t } = useTranslator();
  const { visit, visitError, disabled, onChange } = props;

  const [status, setStatus] = useState(visit.status);

  const onFieldChange = (name, value) => {
    if (onChange) {
      const newVisit = {
        ...visit,
        [name]: value,
      };
      onChange(newVisit);
    }
  };

  const statusOptions = Object.values(VisitStatus).map((v) => ({ label: v, value: v })) || [];

  return (
    <form aria-label="visit form">
      {visitError?.message && <Alert severity="error">{t(visitError.message)}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DateTimePicker
            label={t('patient.visits.startDateTime')}
            value={visit.startDateTime ? new Date(visit.startDateTime) : new Date()}
            onChange={(date) => onFieldChange('startDateTime', date.toISOString())}
            renderInput={(params) => <TextField {...params} fullWidth helperText={t(visitError?.startDateTime || '')} error={!!visitError?.startDateTime} />}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateTimePicker
            label={t('patient.visits.endDateTime')}
            value={visit.endDateTime ? new Date(visit.endDateTime) : new Date()}
            onChange={(date) => onFieldChange('endDateTime', date.toISOString())}
            renderInput={(params) => <TextField {...params} fullWidth helperText={t(visitError?.endDateTime || '')} error={!!visitError?.endDateTime} />}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t('patient.visits.type')}
            value={visit.type}
            onChange={(event) => onFieldChange('type', event.target.value)}
            fullWidth
            helperText={t(visitError?.type || '')}
            error={!!visitError?.type}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth error={!!visitError?.status} disabled={disabled}>
            <InputLabel>{t('patient.visits.status')}</InputLabel>
            <Select
              value={status}
              onChange={(event) => {
                const selectedStatus = event.target.value;
                onFieldChange('status', selectedStatus);
                setStatus(selectedStatus);
              }}
              renderValue={(value) => statusOptions.find((option) => option.value === value)?.label || ''}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t('patient.visits.reason')}
            value={visit.reason}
            onChange={(event) => onFieldChange('reason', event.target.value)}
            fullWidth
            helperText={visitError?.reason}
            error={!!visitError?.reason}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t('patient.visits.location')}
            value={visit.location}
            onChange={(event) => onFieldChange('location', event.target.value)}
            fullWidth
            helperText={t(visitError?.location || '')}
            error={!!visitError?.location}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </form>
  );
};

VisitForm.defaultProps = {
  disabled: false,
  onChange: (newVisit) => newVisit,
  visitError: {},
};

export default VisitForm;