import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { useButtonToolbarSetter } from '../../page-header/button-toolbar/ButtonBarProvider';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import useTranslator from '../../../hooks/useTranslator';
import IncidentFilter from '../IncidentFilter';
import ViewIncidentsTable from './ViewIncidentsTable';

const ViewIncidents = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const setButtonToolBar = useButtonToolbarSetter();
  const updateTitle = useUpdateTitle();
  
  useEffect(() => {
    updateTitle(t('incidents.reports.label'));
  }, [t, updateTitle]);
  
  const [searchFilter, setSearchFilter] = useState(IncidentFilter.REPORTED);

  useEffect(() => {
    setButtonToolBar([
      <Button
        key="newIncidentButton"
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => navigate('/incidents/new')}
      >
        {t('incidents.reports.new')}
      </Button>,
    ]);

    return () => {
      setButtonToolBar([]);
    };
  }, [setButtonToolBar, t, navigate]);

  const filterOptions = Object.values(IncidentFilter).map((filter) => ({
    label: t(`incidents.status.${filter}`),
    value: filter,
  }));

  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel id="incident-filter-label">{t('incidents.filterTitle')}</InputLabel>
        <Select
          labelId="incident-filter-label"
          id="incident-filter"
          value={searchFilter}
          onChange={(event) => setSearchFilter(event.target.value)}
        >
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ViewIncidentsTable searchRequest={{ status: searchFilter }} />
    </Container>
  );
};

export default ViewIncidents;