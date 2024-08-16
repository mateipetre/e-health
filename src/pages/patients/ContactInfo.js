import React, { useEffect } from 'react';
import { Select, MenuItem, InputLabel, FormControl, CircularProgress, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useTranslator from '../../hooks/useTranslator';
import uuid from '../../util/uuid';
import ContactInfoTypes from './ContactInfoTypes';

const ContactInfo = ({ component, data, errors = [], label, name, isEditable = true, onChange }) => {
  const { t } = useTranslator();

  useEffect(() => {
    if (onChange && data.length === 0) {
      onChange([...data, { id: uuid(), value: '' }]);
    }
  }, [data, onChange]);

  const typeOptions = Object.values(ContactInfoTypes).map(value => ({
    label: t(`patient.contactInfoType.options.${value}`),
    value: `${value}`,
  }));

  const onTypeChange = (newType, index) => {
    if (onChange) {
      const updatedContact = { ...data[index], type: newType };
      const updatedContacts = [...data];
      updatedContacts.splice(index, 1, updatedContact);
      onChange(updatedContacts);
    }
  };

  const onValueChange = (event, index) => {
    if (onChange) {
      const newValue = event.target.value;
      const updatedContact = { ...data[index], value: newValue };
      const updatedContacts = [...data];
      updatedContacts.splice(index, 1, updatedContact);
      onChange(updatedContacts);
    }
  };

  const entries = data.map((entry, i) => {
    const error = errors[i];
    return (
      <div key={entry.id} style={{ display: 'flex', marginBottom: '8px' }}>
        <FormControl variant="outlined" style={{ marginRight: '16px', width: '150px' }}>
          <InputLabel htmlFor={`${name}Type${i}`}>{`${name}Type${i}`}</InputLabel>
          <Select
            id={`${name}Type${i}`}
            value={entry.type || ''}
            onChange={event => onTypeChange(event.target.value, i)}
            disabled={!isEditable}
            label={`${name}Type${i}`}
          >
            {typeOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {component === 'TextInputWithLabelFormGroup' ? (
          <TextField
            variant="outlined"
            fullWidth
            value={entry.value}
            onChange={event => onValueChange(event, i)}
            helperText={error ? t(error) : ''}
            error={!!error}
            disabled={!isEditable}
          />
        ) : (
          <TextField
            variant="outlined"
            fullWidth
            value={entry.value}
            onChange={event => onValueChange(event, i)}
            helperText={error ? t(error) : ''}
            error={!!error}
            disabled={!isEditable}
          />
        )}
      </div>
    );
  });

  const onAddClick = () => {
    if (onChange) {
      const newData = data.filter(({ value }) => value.trim() !== '');
      newData.push({ id: uuid(), value: '' });
      onChange(newData);
    }
  };

  const addButton = (
    <div style={{ textAlign: 'right', marginTop: '16px' }}>
      <Button
        variant="outlined"
        onClick={onAddClick}
        startIcon={<AddIcon />} // Use the AddIcon component
      >
        {t('actions.add')}
      </Button>
    </div>
  );

  if (isEditable && data.length === 0) {
    return (
      <CircularProgress size={20} />
    );
  }

  return (
    <div>
      {data.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', marginBottom: '8px' }}>
            <div style={{ flex: 1 }}>{t('patient.contactInfoType.label')}</div>
            <div>{t(label)}</div>
          </div>
        </div>
      )}
      {entries}
      {isEditable && addButton}
    </div>
  );
};

export default ContactInfo;