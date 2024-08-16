import React from 'react';
import { TextField, FormControl, InputLabel, FormGroup, FormControlLabel, Checkbox, MenuItem, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { differenceInYears, startOfDay, subYears } from 'date-fns';
import { useTranslation } from 'react-i18next';
import ContactInfo from './ContactInfo';

const GeneralInformation = (props) => {
  const { t } = useTranslation();
  const { patient, isEditable, onChange, error } = props;

  const onFieldChange = (name, value) => {
    if (onChange) {
      const newPatient = { ...patient, [name]: value };
      onChange(newPatient);
    }
  };

  const guessDateOfBirthFromApproximateAge = (value) => {
    const age = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    const dateOfBirth = subYears(new Date(), age);
    return startOfDay(dateOfBirth).toISOString();
  };

  const onApproximateAgeChange = (event) => {
    const { value } = event.target;
    onFieldChange('dateOfBirth', guessDateOfBirthFromApproximateAge(value));
  };

  const onUnknownDateOfBirthChange = (event) => {
    const { checked } = event.target;
    onFieldChange('isApproximateDateOfBirth', checked);
  };

  const sexOptions = [
    { label: t('sex.male'), value: 'male' },
    { label: t('sex.female'), value: 'female' },
    { label: t('sex.other'), value: 'other' },
    { label: t('sex.unknown'), value: 'unknown' },
  ];

  const typeOptions = [
    { label: t('patient.types.charity'), value: 'charity' },
    { label: t('patient.types.private'), value: 'private' },
  ];

  const bloodTypeOptions = [
    { label: t('bloodType.apositive'), value: 'A+' },
    { label: t('bloodType.anegative'), value: 'A-' },
    { label: t('bloodType.abpositive'), value: 'AB+' },
    { label: t('bloodType.abnegative'), value: 'AB-' },
    { label: t('bloodType.bpositive'), value: 'B+' },
    { label: t('bloodType.bnegative'), value: 'B-' },
    { label: t('bloodType.opositive'), value: 'O+' },
    { label: t('bloodType.onegative'), value: 'O-' },
    { label: t('bloodType.unknown'), value: 'unknown' },
  ];

  return (
    <div>
      <FormGroup>
        <FormControl fullWidth>
          <InputLabel>{t('patient.prefix')}</InputLabel>
          <TextField
            label={t('patient.prefix')}
            name="prefix"
            value={patient.prefix || ''}
            onChange={(event) => onFieldChange('prefix', event.target.value)}
            disabled={!isEditable}
            error={!!error?.prefix}
            helperText={t(error?.prefix || '')}
            margin="normal"
          />
          <TextField
            label={t('patient.givenName')}
            name="givenName"
            value={patient.givenName || ''}
            onChange={(event) => onFieldChange('givenName', event.target.value)}
            disabled={!isEditable}
            required
            error={!!error?.givenName}
            helperText={t(error?.givenName || '')}
            margin="normal"
          />
          <TextField
            label={t('patient.familyName')}
            name="familyName"
            value={patient.familyName || ''}
            onChange={(event) => onFieldChange('familyName', event.target.value)}
            disabled={!isEditable}
            error={!!error?.familyName}
            helperText={t(error?.familyName || '')}
            margin="normal"
          />
          <TextField
            label={t('patient.suffix')}
            name="suffix"
            value={patient.suffix || ''}
            onChange={(event) => onFieldChange('suffix', event.target.value)}
            disabled={!isEditable}
            error={!!error?.suffix}
            helperText={t(error?.suffix || '')}
            margin="normal"
          />
          <FormControl fullWidth>
            <InputLabel>{t('patient.sex')}</InputLabel>
            <Select
              value={patient.sex || ''}
              onChange={(event) => onFieldChange('sex', event.target.value)}
              disabled={!isEditable}
            >
              {sexOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>{t('patient.type')}</InputLabel>
            <Select
              value={patient.type || ''}
              onChange={(event) => onFieldChange('type', event.target.value)}
              disabled={!isEditable}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>{t('patient.bloodType')}</InputLabel>
            <Select
              value={patient.bloodType || ''}
              onChange={(event) => onFieldChange('bloodType', event.target.value)}
              disabled={!isEditable}
            >
              {bloodTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label={t('patient.occupation')}
            name="occupation"
            value={patient.occupation || ''}
            onChange={(event) => onFieldChange('occupation', event.target.value)}
            disabled={!isEditable}
            margin="normal"
          />
          <TextField
            label={t('patient.preferredLanguage')}
            name="preferredLanguage"
            value={patient.preferredLanguage || ''}
            onChange={(event) => onFieldChange('preferredLanguage', event.target.value)}
            disabled={!isEditable}
            error={!!error?.preferredLanguage}
            helperText={t(error?.preferredLanguage || '')}
            margin="normal"
          />
          {patient.isApproximateDateOfBirth ? (
            <TextField
              label={t('patient.approximateAge')}
              name="approximateAge"
              type="number"
              value={`${differenceInYears(new Date(), new Date(patient.dateOfBirth))}`}
              onChange={onApproximateAgeChange}
              disabled={!isEditable}
              margin="normal"
            />
          ) : (
            <FormControl fullWidth>
              <DatePicker
                label={t('patient.dateOfBirth')}
                value={
                  patient.dateOfBirth && patient.dateOfBirth.length > 0
                    ? new Date(patient.dateOfBirth)
                    : null
                }
                onChange={(date) => onFieldChange('dateOfBirth', date ? date.toISOString() : '')}
                disabled={!isEditable}
                renderInput={(params) => (
                  <TextField {...params} margin="normal" helperText={t(error?.dateOfBirth || '')} error={!!error?.dateOfBirth} />
                )}
                maxDate={new Date()}
              />
            </FormControl>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={patient.isApproximateDateOfBirth || false}
                onChange={onUnknownDateOfBirthChange}
                disabled={!isEditable}
              />
            }
            label={t('patient.unknownDateOfBirth')}
          />
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormControl fullWidth>
          <InputLabel>{t('patient.contactInformation')}</InputLabel>
          <ContactInfo
            component="TextInputWithLabelFormGroup"
            data={patient.phoneNumbers}
            errors={error?.phoneNumbers}
            label={t('patient.phoneNumber')}
            name="phoneNumber"
            isEditable={isEditable}
            onChange={(newPhoneNumbers) => onFieldChange('phoneNumbers', newPhoneNumbers)}
          />
          <ContactInfo
            component="TextInputWithLabelFormGroup"
            data={patient.emails}
            errors={error?.emails}
            label={t('patient.email')}
            name="email"
            isEditable={isEditable}
            onChange={(newEmails) => onFieldChange('emails', newEmails)}
          />
          <ContactInfo
            component="TextFieldWithLabelFormGroup"
            data={patient.addresses}
            label={t('patient.address')}
            name="address"
            isEditable={isEditable}
            onChange={(newAddresses) => onFieldChange('addresses', newAddresses)}
          />
        </FormControl>
      </FormGroup>
    </div>
  );
};

export default GeneralInformation;