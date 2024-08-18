import React, { useState, useEffect, useCallback } from 'react';
import { Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useButtonToolbarSetter } from '../../page-header/button-toolbar/ButtonBarProvider';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import useTranslator from '../../../hooks/useTranslator';
import ImagingRequestTable from './ImagingRequestTable';

const ViewImagings = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const setButtons = useButtonToolbarSetter();
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle(t('imagings.label'));
  }, [t, updateTitle]);

  const [searchRequest, setSearchRequest] = useState({
    status: 'all',
    text: '',
  });

  const getButtons = useCallback(() => {
    const buttons = [];

    buttons.push(
      <Button
        variant="outlined"
        color="success"
        onClick={() => navigate('/imaging/new')}
        key="imaging.requests.new"
      >
        {t('imagings.requests.new')}
      </Button>
    );

    return buttons;
  }, [navigate, t]);

  useEffect(() => {
    setSearchRequest((previousRequest) => ({ ...previousRequest, status: 'all' }));
  }, []);

  useEffect(() => {
    setButtons(getButtons());
    return () => {
      setButtons([]);
    };
  }, [getButtons, setButtons]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ImagingRequestTable searchRequest={searchRequest} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewImagings;