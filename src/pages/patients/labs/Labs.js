
import React from 'react';
import { Route } from 'react-router-dom';
import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import LabsList from './LabsList';

// Labs component
const Labs = (props) => {
  const { patient } = props;

  // Define breadcrumbs
  const breadcrumbs = [
    {
      i18nKey: 'patient.labs.label',
      location: `/patients/${patient.id}/labs`,
    },
  ];
  
  // Use breadcrumbs hook
  useAddBreadcrumbs(breadcrumbs);

  return (
    <Route path="/patients/:id/labs">
      <LabsList patient={patient} />
    </Route>
  );
};

export default Labs;