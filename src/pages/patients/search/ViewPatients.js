import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import { useButtonToolbarSetter } from '../../page-header/button-toolbar/ButtonBarProvider';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import useTranslator from '../../../hooks/useTranslator';
import SearchPatients from './SearchPatients';

const breadcrumbs = [{ i18nKey: 'patients.label', location: '/patients' }];

const ViewPatients = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const updateTitle = useUpdateTitle();
  
  useEffect(() => {
    updateTitle(t('patients.label'));
  }, [updateTitle, t]);

  const dispatch = useDispatch();
  const setButtonToolBar = useButtonToolbarSetter();

  useAddBreadcrumbs(breadcrumbs, true);

  useEffect(() => {
    setButtonToolBar([
      <Button
        key="newPatientButton"
        variant="outlined"
        color="success"
        startIcon={<AddIcon />}
        onClick={() => navigate('/patients/new')}
      >
        {t('patients.newPatient')}
      </Button>,
    ]);
    return () => {
      setButtonToolBar([]);
    };
  }, [dispatch, setButtonToolBar, t, navigate]);

  return <SearchPatients />;
};

export default ViewPatients;