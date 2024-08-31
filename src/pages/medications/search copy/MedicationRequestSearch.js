import React from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Grid } from '@material-ui/core';
import useTranslator from '../../../hooks/useTranslator';

const MedicationRequestSearch = (props) => {
  const { searchRequest, onChange } = props;
  const { t } = useTranslator();

  // Filter options
  const filterOptions = [
    { label: t('medications.filter.all'), value: 'all' },
    { label: t('medications.status.draft'), value: 'draft' },
    { label: t('medications.status.active'), value: 'active' },
    { label: t('medications.status.onHold'), value: 'on hold' },
    { label: t('medications.status.completed'), value: 'completed' },
    { label: t('medications.status.enteredInError'), value: 'entered in error' },
    { label: t('medications.status.canceled'), value: 'canceled' },
    { label: t('medications.status.unknown'), value: 'unknown' },
  ];

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    onChange({
      ...searchRequest,
      text: query,
    });
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    onChange({
      ...searchRequest,
      status: filter,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={3} lg={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="filterStatusLabel">{t('medications.filterTitle')}</InputLabel>
          <Select
            labelId="filterStatusLabel"
            id="filterStatus"
            value={searchRequest.status}
            onChange={handleFilterChange}
            label={t('medications.filterTitle')}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs>
        <TextField
          label={t('medications.search')}
          placeholder={t('medications.search')}
          variant="outlined"
          fullWidth
          value={searchRequest.text}
          onChange={handleSearchQueryChange}
        />
      </Grid>
    </Grid>
  );
};

export default MedicationRequestSearch;