import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Alert,
  Grid,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import useTranslator from '../../../hooks/useTranslator';
import { CarePlanIntent, CarePlanStatus } from '../../model/CarePlan';

const CarePlanForm = ({ patient, carePlan, carePlanError, onChange, disabled }) => {
  const { t } = useTranslator();
  const [condition, setCondition] = useState(carePlan.diagnosisId);
  const [status, setStatus] = useState(carePlan.status);
  const [intent, setIntent] = useState(carePlan.intent);

  const onFieldChange = (name, value) => {
    if (onChange) {
      const newCarePlan = {
        ...carePlan,
        [name]: value,
      };
      onChange(newCarePlan);
    }
  };

  const conditionOptions =
    patient.diagnoses?.map((d) => ({ label: d.name, value: d.id })) || [];

  const statusOptions = Object.values(CarePlanStatus).map((v) => ({
    label: v,
    value: v,
  }));

  const intentOptions = Object.values(CarePlanIntent).map((v) => ({
    label: v,
    value: v,
  }));

  return (
    <form aria-label="form">
      {carePlanError?.message && <Alert severity="error">{t(carePlanError.message)}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            value={carePlan.title}
            label={t('patient.carePlan.title')}
            name="title"
            error={!!carePlanError?.title}
            helperText={t(carePlanError?.title || '')}
            disabled={disabled}
            onChange={(event) => onFieldChange('title', event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            value={carePlan.description}
            label={t('patient.carePlan.description')}
            name="description"
            error={!!carePlanError?.description}
            helperText={t(carePlanError?.description || '')}
            disabled={disabled}
            onChange={(event) => onFieldChange('description', event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required error={!!carePlanError?.condition}>
            <InputLabel>{t('patient.carePlan.condition')}</InputLabel>
            <Select
              value={condition}
              onChange={(event) => {
                onFieldChange('diagnosisId', event.target.value);
                setCondition(event.target.value);
              }}
              disabled={disabled}
            >
              {conditionOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required error={!!carePlanError?.status}>
            <InputLabel>{t('patient.carePlan.status')}</InputLabel>
            <Select
              value={status}
              onChange={(event) => {
                onFieldChange('status', event.target.value);
                setStatus(event.target.value);
              }}
              disabled={disabled}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required error={!!carePlanError?.intent}>
            <InputLabel>{t('patient.carePlan.intent')}</InputLabel>
            <Select
              value={intent}
              onChange={(event) => {
                onFieldChange('intent', event.target.value);
                setIntent(event.target.value);
              }}
              disabled={disabled}
            >
              {intentOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={t('patient.carePlan.startDate')}
            value={carePlan.startDate ? new Date(carePlan.startDate) : new Date()}
            onChange={(date) => onFieldChange('startDate', date.toISOString())}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                fullWidth
                error={!!carePlanError?.startDate}
                helperText={t(carePlanError?.startDate || '')}
                disabled={disabled}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={t('patient.carePlan.endDate')}
            value={carePlan.endDate ? new Date(carePlan.endDate) : new Date()}
            onChange={(date) => onFieldChange('endDate', date.toISOString())}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                fullWidth
                error={!!carePlanError?.endDate}
                helperText={t(carePlanError?.endDate || '')}
                disabled={disabled}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={carePlan.note}
            label={t('patient.carePlan.note')}
            name="note"
            error={!!carePlanError?.note}
            helperText={carePlanError?.note}
            disabled={disabled}
            onChange={(event) => onFieldChange('note', event.target.value)}
          />
        </Grid>
      </Grid>
    </form>
  );
};

CarePlanForm.defaultProps = {
  disabled: false,
};

export default CarePlanForm;