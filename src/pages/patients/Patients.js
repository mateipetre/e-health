import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from '../../app-components/PrivateRoute';
import Permissions from '../../app-components/Permissions';
import EditPatient from './edit/EditPatient';
import NewPatient from './new/NewPatient';
import ViewPatients from './search/ViewPatients';
import ViewPatient from './view/ViewPatient';

const Patients = () => {
  const permissions = useSelector((state) => state.user.permissions);

  return (
    <Routes>
      <Route
        path="/patients"
        element={
          <PrivateRoute
            isAuthenticated={permissions.includes(Permissions.ReadPatients)}
            element={ViewPatients}
          />
        }
      />
      <Route
        path="/patients/new"
        element={
          <PrivateRoute
            isAuthenticated={permissions.includes(Permissions.WritePatients)}
            element={NewPatient}
          />
        }
      />
      <Route
        path="/patients/edit/:id"
        element={
          <PrivateRoute
            isAuthenticated={
              permissions.includes(Permissions.WritePatients) &&
              permissions.includes(Permissions.ReadPatients)
            }
            element={EditPatient}
          />
        }
      />
      <Route
        path="/patients/:id"
        element={
          <PrivateRoute
            isAuthenticated={permissions.includes(Permissions.ReadPatients)}
            element={ViewPatient}
          />
        }
      />
      <Route path="*" element={<Navigate to="/patients" />} />
    </Routes>
  );
};

export default Patients;