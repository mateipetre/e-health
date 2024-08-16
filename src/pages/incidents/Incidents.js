import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import useAddBreadcrumbs from '../page-header/breadcrumbs/useAddBreadcrumbs';
import Permissions from '../../app-components/Permissions';
import ViewIncidents from './list/ViewIncidents';
import ReportIncident from './report/ReportIncident';
import ViewIncident from './view/ViewIncident';
import VisualizeIncidents from './visualize/VisualizeIncidents';

// Function to check permissions
const withPermission = (element, permission) => {
  return (props) => {
    const { permissions } = useSelector((state) => state.user);
    return permissions.includes(permission) ? element : <Navigate to="/unauthorized" />;
  };
};

const Incidents = () => {
  const breadcrumbs = [
    {
      i18nKey: 'incidents.label',
      location: `/incidents`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs, true);

  return (
    <Routes>
      <Route
        path="/incidents"
        element={withPermission(<ViewIncidents />, Permissions.ViewIncidents)}
      />
      <Route
        path="/incidents/new"
        element={withPermission(<ReportIncident />, Permissions.ReportIncident)}
      />
      <Route
        path="/incidents/visualize"
        element={withPermission(<VisualizeIncidents />, Permissions.ViewIncidentWidgets)}
      />
      <Route
        path="/incidents/:id"
        element={withPermission(<ViewIncident />, Permissions.ViewIncident)}
      />
    </Routes>
  );
};

export default Incidents;