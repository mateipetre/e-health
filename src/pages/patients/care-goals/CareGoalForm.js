import React, { useState } from 'react';
import { TextField, MenuItem, InputLabel, FormControl, FormHelperText, Grid } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import useTranslator from '../../../hooks/useTranslator';
import { CareGoalStatus, CareGoalAchievementStatus } from '../../model/CareGoal';

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

const statusOptions = Object.values(CareGoalStatus).map((v) => ({
  label: v,
  value: v,
}));

const achievementsStatusOptions = Object.values(CareGoalAchievementStatus).map((v) => ({
  label: v,
  value: v,
}));

const CareGoalForm = ({ careGoal, careGoalError, disabled, onChange }) => {
  const { t } = useTranslator();
  const [priority, setPriority] = useState(careGoal.priority || '');
  const [status, setStatus] = useState(careGoal.status || '');
  const [achievementStatus, setAchievementStatus] = useState(careGoal.achievementStatus || '');

  const onFieldChange = (name, value) => {
    if (onChange) {
      onChange({ ...careGoal, [name]: value });
    }
  };

  return (
    <form aria-label="care-goal-form">
      {careGoalError?.message && (
        <FormHelperText error>{t(careGoalError.message)}</FormHelperText>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label={t('patient.careGoal.description')}
            value={careGoal.description || ''}
            onChange={(event) => onFieldChange('description', event.target.value)}
            error={!!careGoalError?.description}
            helperText={t(careGoalError?.description || '')}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required error={!!careGoalError?.priority} disabled={disabled}>
            <InputLabel htmlFor="prioritySelect">{t('patient.careGoal.priority.label')}</InputLabel>
            <TextField
              select
              id="prioritySelect"
              value={priority}
              onChange={(event) => {
                const value = event.target.value;
                onFieldChange('priority', value);
                setPriority(value);
              }}
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(`patient.careGoal.priority.${option.value}`)}
                </MenuItem>
              ))}
            </TextField>
            <FormHelperText>{t(careGoalError?.priority || '')}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required error={!!careGoalError?.status} disabled={disabled}>
            <InputLabel htmlFor="statusSelect">{t('patient.careGoal.status')}</InputLabel>
            <TextField
              select
              id="statusSelect"
              value={status}
              onChange={(event) => {
                const value = event.target.value;
                onFieldChange('status', value);
                setStatus(value);
              }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(`patient.careGoal.status.${option.value}`)}
                </MenuItem>
              ))}
            </TextField>
            <FormHelperText>{t(careGoalError?.status || '')}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required error={!!careGoalError?.achievementStatus} disabled={disabled}>
            <InputLabel htmlFor="achievementStatusSelect">{t('patient.careGoal.achievementStatus')}</InputLabel>
            <TextField
              select
              id="achievementStatusSelect"
              value={achievementStatus}
              onChange={(event) => {
                const value = event.target.value;
                onFieldChange('achievementStatus', value);
                setAchievementStatus(value);
              }}
            >
              {achievementsStatusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(`patient.careGoal.achievementStatus.${option.value}`)}
                </MenuItem>
              ))}
            </TextField>
            <FormHelperText>{t(careGoalError?.achievementStatus || '')}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={t('patient.careGoal.startDate')}
            value={careGoal.startDate ? new Date(careGoal.startDate) : null}
            onChange={(date) => date && onFieldChange('startDate', date.toISOString())}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                required
                error={!!careGoalError?.startDate}
                helperText={t(careGoalError?.startDate || '')}
                disabled={disabled}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={t('patient.careGoal.dueDate')}
            value={careGoal.dueDate ? new Date(careGoal.dueDate) : null}
            onChange={(date) => date && onFieldChange('dueDate', date.toISOString())}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                required
                error={!!careGoalError?.dueDate}
                helperText={t(careGoalError?.dueDate || '')}
                disabled={disabled}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={t('patient.careGoal.note')}
            value={careGoal.note || ''}
            onChange={(event) => onFieldChange('note', event.target.value)}
            error={!!careGoalError?.note}
            helperText={t(careGoalError?.note || '')}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </form>
  );
};

CareGoalForm.defaultProps = {
  disabled: false,
};

export default CareGoalForm;