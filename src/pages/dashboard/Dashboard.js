import React, { useEffect } from 'react';
import { useUpdateTitle } from '../page-header/title/TitleContext';
import useTranslator from '../../hooks/useTranslator';

const Dashboard = () => {
  const { t } = useTranslator();
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle(t('dashboard.label'));
  }, [t, updateTitle]);

  return <h3>Example</h3>;
};

export default Dashboard;