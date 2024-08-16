import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, MenuItem, Select, TextField, FormControl, InputLabel, FormHelperText, Snackbar, Alert } from '@mui/material';
import format from 'date-fns/format';

import { DiagnosisStatus } from '../../model/Diagnosis';
import usePatientVisits from '../hooks/usePatientVisits';

const DiagnosisForm = ({ diagnosis, diagnosisError, onChange, disabled, patient }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(diagnosis.status);
  const { data: visits = [] } = usePatientVisits(patient.id);

  const onFieldChange = (name, value) => {
    if (onChange) {
      const newDiagnosis = {
        ...diagnosis,
        [name]: value,
      };
      onChange(newDiagnosis);
    }
  };

  const patientVisits = visits.map((v) => ({
    label: `${v.type} at ${format(new Date(v.startDateTime), 'yyyy-MM-dd, hh:mm a')}`,
    value: v.id,
  }));

  const statusOptions = Object.values(DiagnosisStatus).map((v) => ({
    label: v,
    value: v,
  }));

  return (
    <form aria-label="form">
      {diagnosisError && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {t(diagnosisError.message || '')}
          </Alert>
        </Snackbar>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal" error={!!diagnosisError?.name}>
            <InputLabel>{t('patient.diagnoses.diagnosisName')}</InputLabel>
            <TextField
              value={diagnosis.name || ''}
              onChange={(event) => onFieldChange('name', event.currentTarget.value)}
              disabled={disabled}
              required
            />
            <FormHelperText>{t(diagnosisError?.name || '')}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal" error={!!diagnosisError?.diagnosisDate}>
            <InputLabel>{t('patient.diagnoses.diagnosisDate')}</InputLabel>
            <TextField
              type="date"
              value={diagnosis.diagnosisDate ? format(new Date(diagnosis.diagnosisDate), 'yyyy-MM-dd') : ''}
              onChange={(event) => onFieldChange('diagnosisDate', event.currentTarget.value)}
              disabled={disabled}
              required
              InputLabelProps={{ shrink: true }}
            />
            <FormHelperText>{t(diagnosisError?.diagnosisDate || '')}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal" error={!!diagnosisError?.onsetDate}>
            <InputLabel>{t('patient.diagnoses.onsetDate')}</InputLabel>
            <TextField
              type="date"
              value={diagnosis.onsetDate ? format(new Date(diagnosis.onsetDate), 'yyyy-MM-dd') : ''}
              onChange={(event) => onFieldChange('onsetDate', event.currentTarget.value)}
              disabled={disabled}
              required
              InputLabelProps={{ shrink: true }}
            />
            <FormHelperText>{t(diagnosisError?.onsetDate || '')}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal" error={!!diagnosisError?.abatementDate}>
            <InputLabel>{t('patient.diagnoses.abatementDate')}</InputLabel>
            <TextField
              type="date"
              value={diagnosis.abatementDate ? format(new Date(diagnosis.abatementDate), 'yyyy-MM-dd') : ''}
              onChange={(event) => onFieldChange('abatementDate', event.currentTarget.value)}
              disabled={disabled}
              required
              InputLabelProps={{ shrink: true }}
            />
            <FormHelperText>{t(diagnosisError?.abatementDate || '')}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal" disabled={disabled}>
            <InputLabel>{t('patient.diagnoses.visit')}</InputLabel>
            <Select
              value={diagnosis.visit || ''}
              onChange={(event) => onFieldChange('visit', event.target.value)}
              renderValue={(selected) => patientVisits.find((option) => option.value === selected)?.label || ''}
            >
              {patientVisits.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{t(diagnosisError?.visit || '')}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal" error={!!diagnosisError?.status} disabled={disabled}>
            <InputLabel>{t('patient.diagnoses.status')}</InputLabel>
            <Select
              value={status || ''}
              onChange={(event) => {
                onFieldChange('status', event.target.value);
                setStatus(event.target.value);
              }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{t(diagnosisError?.status || '')}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal" error={!!diagnosisError?.note} disabled={disabled}>
            <TextField
              value={diagnosis.note || ''}
              onChange={(event) => onFieldChange('note', event.currentTarget.value)}
              label={t('patient.diagnoses.note')}
              multiline
              rows={4}
            />
            <FormHelperText>{t(diagnosisError?.note || '')}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

DiagnosisForm.defaultProps = {
  disabled: false,
};

export default DiagnosisForm;