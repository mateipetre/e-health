import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Typography } from '@material-ui/core';

import { useButtonToolbarSetter } from '../../page-header/button-toolbar/ButtonBarProvider';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import useTranslator from '../../../hooks/useTranslator';
import Permissions from '../../../app-components/Permissions';
import MedicationRequestSearch from './MedicationRequestSearch';
import MedicationRequestTable from './MedicationRequestTable';

const ViewMedications = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const setButtons = useButtonToolbarSetter();
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle(t('medications.label'));
  }, [updateTitle, t]);

  const { permissions } = useSelector((state) => state.user);

  const getButtons = useCallback(() => {
    const buttons = [];

    if (permissions.includes(Permissions.RequestMedication)) {
      buttons.push(
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/medications/new')}
          key="medication.requests.new"
        >
          {t('medications.requests.new')}
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

  const [searchRequest, setSearchRequest] = useState({
    text: '',
    status: 'all',
  });

  const onSearchRequestChange = (newSearchRequest) => {
    setSearchRequest(newSearchRequest);
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        {t('medications.label')}
      </Typography>
      <MedicationRequestSearch searchRequest={searchRequest} onChange={onSearchRequestChange} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MedicationRequestTable searchRequest={searchRequest} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewMedications;
