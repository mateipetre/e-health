import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid'; // MUI Grid component
import { useUpdateTitle } from '../pages/page-header/title/TitleContext';
import HICLanguageSelector from '../components/HICLanguageSelector';
import useTranslator from '../hooks/useTranslator';

/**
 * Settings component.
 * @returns {JSX.Element} The Settings component.
 */
const Settings = () => {
  const { t } = useTranslator();
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle(t('settings.label'));
  }, [t, updateTitle]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={9}>
        <HICLanguageSelector />
      </Grid>
      <Grid item xs={0} sm={3} />
    </Grid>
  );
};

export default Settings;