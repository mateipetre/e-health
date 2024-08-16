import React, { useState } from 'react'
import {
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Alert,
  Autocomplete,
} from '@mui/material'
import DateTimePicker from '@mui/lab/DateTimePicker'
import useTranslator from '../../../hooks/useTranslator'
import axios from 'axios'

const AppointmentDetailForm = (props) => {
  const { onFieldChange, appointment, patient, isEditable, error } = props
  const { t } = useTranslator()

  const [patientsOptions, setPatientsOptions] = useState([])

  const onDateChange = (date, fieldName) => {
    onFieldChange && onFieldChange(fieldName, date.toISOString())
  }

  const onInputElementChange = (event, fieldName) => {
    onFieldChange && onFieldChange(fieldName, event.target.value)
  }

  const fetchPatients = async (query) => {
    try {
      const response = await axios.get('/api/patients/search', {
        params: { query }, // Assuming your API has a query parameter for searching patients
      })
      setPatientsOptions(response.data)
    } catch (error) {
      console.error('Error fetching patients:', error)
    }
  }

  const typeOptions = [
    { label: t('scheduling.appointment.types.checkup'), value: 'checkup' },
    { label: t('scheduling.appointment.types.emergency'), value: 'emergency' },
    { label: t('scheduling.appointment.types.followUp'), value: 'follow up' },
    { label: t('scheduling.appointment.types.routine'), value: 'routine' },
    { label: t('scheduling.appointment.types.walkIn'), value: 'walk in' },
  ]

  return (
    <>
      {error?.message && (
        <Alert severity="error">{t(error?.message)}</Alert>
      )}
      <div className="row">
        <div className="col">
          <FormControl fullWidth margin="normal">
            <InputLabel required>{t('scheduling.appointment.patient')}</InputLabel>
            <Autocomplete
              id="patientTypeahead"
              disabled={!isEditable || patient !== undefined}
              options={patientsOptions}
              getOptionLabel={(option) => option.fullName}
              value={patient || null}
              onChange={(event, newValue) => {
                onFieldChange && newValue && onFieldChange('patient', newValue.id)
              }}
              onInputChange={async (event, newInputValue) => {
                if (newInputValue) {
                  await fetchPatients(newInputValue)
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t('scheduling.appointment.patient')}
                  error={!!error?.patient}
                  helperText={t(error?.patient)}
                />
              )}
            />
          </FormControl>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormControl fullWidth margin="normal">
            <DateTimePicker
              label={t('scheduling.appointment.startDate')}
              value={
                appointment.startDateTime && appointment.startDateTime.length > 0
                  ? new Date(appointment.startDateTime)
                  : null
              }
              onChange={(date) => {
                onDateChange(date, 'startDateTime')
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  disabled={!isEditable}
                  error={!!error?.startDateTime}
                  helperText={t(error?.startDateTime)}
                />
              )}
            />
          </FormControl>
        </div>
        <div className="col">
          <FormControl fullWidth margin="normal">
            <DateTimePicker
              label={t('scheduling.appointment.endDate')}
              value={
                appointment.endDateTime && appointment.endDateTime.length > 0
                  ? new Date(appointment.endDateTime)
                  : null
              }
              onChange={(date) => {
                onDateChange(date, 'endDateTime')
              }}
              renderInput={(params) => (
                <TextField {...params} disabled={!isEditable} />
              )}
            />
          </FormControl>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormControl fullWidth margin="normal">
            <TextField
              label={t('scheduling.appointment.location')}
              value={appointment.location}
              onChange={(event) => {
                onInputElementChange(event, 'location')
              }}
              disabled={!isEditable}
            />
          </FormControl>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('scheduling.appointment.type')}</InputLabel>
            <Select
              value={appointment.type || ''}
              onChange={(event) => onFieldChange && onFieldChange('type', event.target.value)}
              disabled={!isEditable}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormControl fullWidth margin="normal">
            <TextField
              label={t('scheduling.appointment.reason')}
              value={appointment.reason}
              onChange={(event) => {
                onInputElementChange(event, 'reason')
              }}
              disabled={!isEditable}
              multiline
              rows={4}
            />
          </FormControl>
        </div>
      </div>
    </>
  )
}

AppointmentDetailForm.defaultProps = {
  isEditable: true,
}

export default AppointmentDetailForm