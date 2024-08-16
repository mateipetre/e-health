import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputLabel,
  FormControl,
} from '@mui/material';
import useDebounce from '../../hooks/useDebounce';
import useTranslator from '../../hooks/useTranslator';
import useLabsSearch from './hooks/useLabsSearch';
import Permissions from '../../app-components/Permissions';
import { useButtonToolbarSetter } from '../page-header/button-toolbar/ButtonBarProvider';
import { useUpdateTitle } from '../page-header/title/TitleContext';

const ViewLabs = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const setButtons = useButtonToolbarSetter();
  const updateTitle = useUpdateTitle();
  useEffect(() => {
    updateTitle(t('labs.label'));
  }, [updateTitle, t]);

  const { permissions } = useSelector((state) => state.user);
  const [searchFilter, setSearchFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);
  const { data: labs } = useLabsSearch({
    text: debouncedSearchText,
    status: searchFilter,
  });

  const getButtons = useCallback(() => {
    const buttons = [];

    if (permissions.includes(Permissions.RequestLab)) {
      buttons.push(
        <Button
          variant="outlined"
          color="success"
          onClick={() => navigate('/labs/new')}
          key="lab.requests.new"
        >
          {t('labs.requests.new')}
        </Button>
      );
    }

    return buttons;
  }, [permissions, navigate, t]);

  useEffect(() => {
    setButtons(getButtons());
    return () => {
      setButtons([]);
    };
  }, [getButtons, setButtons]);

  const onViewClick = (lab) => {
    navigate(`/labs/${lab.id}`);
  };

  const onSearchBoxChange = (event) => {
    setSearchText(event.target.value);
  };

  const filterOptions = [
    { label: t('labs.status.requested'), value: 'requested' },
    { label: t('labs.status.completed'), value: 'completed' },
    { label: t('labs.status.canceled'), value: 'canceled' },
    { label: t('labs.filter.all'), value: 'all' },
  ];

  return (
    <Container>
      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item md={3} lg={2}>
          <FormControl fullWidth>
            <InputLabel id="filter-select-label">{t('labs.filterTitle')}</InputLabel>
            <Select
              labelId="filter-select-label"
              id="filter"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            >
              {filterOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t('labs.search')}
            placeholder={t('labs.search')}
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={onSearchBoxChange}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('labs.lab.code')}</TableCell>
              <TableCell>{t('labs.lab.type')}</TableCell>
              <TableCell>{t('labs.lab.requestedOn')}</TableCell>
              <TableCell>{t('labs.lab.status')}</TableCell>
              <TableCell>{t('actions.label')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labs?.map((lab) => (
              <TableRow key={lab.id}>
                <TableCell>{lab.code}</TableCell>
                <TableCell>{lab.type}</TableCell>
                <TableCell>{lab.requestedOn ? format(new Date(lab.requestedOn), 'yyyy-MM-dd hh:mm a') : ''}</TableCell>
                <TableCell>{lab.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onViewClick(lab)}>
                    {t('actions.view')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewLabs;