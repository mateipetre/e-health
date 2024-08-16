import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import useAddBreadcrumbs from '../page-header/breadcrumbs/useAddBreadcrumbs';
import Permissions from '../../app-components/Permissions';
import NewLabRequest from './requests/NewLabRequest';
import ViewLab from './ViewLab';
import LabRequests from './ViewLabs';

// PrivateRoute component to handle authentication
const PrivateRoute = ({ isAuthenticated, element }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const Labs = () => {
  const { permissions } = useSelector((state) => state.user);

  const breadcrumbs = [
    {
      i18nKey: 'labs.label',
      location: `/labs`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs, true);

  return (
    <Routes>
      <Route
        path="/labs"
        element={
          <PrivateRoute
            isAuthenticated={permissions.includes(Permissions.ViewLabs)}
            element={<LabRequests />}
          />
        }
      />
      <Route
        path="/labs/new"
        element={
          <PrivateRoute
            isAuthenticated={permissions.includes(Permissions.RequestLab)}
            element={<NewLabRequest />}
          />
        }
      />
      <Route
        path="/labs/:id"
        element={
          <PrivateRoute
            isAuthenticated={permissions.includes(Permissions.ViewLab)}
            element={<ViewLab />}
          />
        }
      />
    </Routes>
  );
};

export default Labs;