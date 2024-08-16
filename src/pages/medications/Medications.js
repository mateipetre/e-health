import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import useAddBreadcrumbs from '../page-header/breadcrumbs/useAddBreadcrumbs';
import PrivateRoute from '../../app-components/PrivateRoute';
import Permissions from '../../app-components/Permissions';
import NewMedicationRequest from './requests/NewMedicationRequest';
import MedicationRequests from './search/ViewMedications';
import ViewMedication from './ViewMedication';

const Medications = () => {
  const { permissions } = useSelector((state) => state.user);

  const breadcrumbs = [
    {
      i18nKey: 'medications.label',
      location: `/medications`,
    },
  ];

  useAddBreadcrumbs(breadcrumbs, true);

  return (
    <Routes>
      <Route
        path="/medications"
        element={
          <PrivateRoute
            isAuthenticated={permissions.includes(Permissions.ViewMedications)}
            element={<MedicationRequests />}
          />
        }
      />
      <Route
        path="/medications/new"
        element={
          <PrivateRoute
            isAuthenticated={permissions.includes(Permissions.RequestMedication)}
            element={<NewMedicationRequest />}
          />
        }
      />
      <Route
        path="/medications/:id"
        element={
          <PrivateRoute
            isAuthenticated={permissions.includes(Permissions.ViewMedication)}
            element={<ViewMedication />}
          />
        }
      />
    </Routes>
  );
};

export default Medications;