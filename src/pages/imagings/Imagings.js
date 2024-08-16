import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PrivateRoute from '../../app-components/PrivateRoute';
import Permissions from '../../app-components/Permissions';
import NewImagingRequest from './requests/NewImagingRequest';
import ImagingRequests from './search/ViewImagings';
import { fetchUserPermissions } from '../../user/userActions';

const Imagings = () => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.user.permissions || []);

  useEffect(() => {
    dispatch(fetchUserPermissions());
  }, [dispatch]);

  const hasPermission = (permission) => permissions.includes(permission);

  return (
    <Routes>
      <Route
        path="/imaging"
        element={
          <PrivateRoute
            isAuthenticated={hasPermission(Permissions.ViewImagings)}
            element={<ImagingRequests />}
          />
        }
      />
      <Route
        path="/imaging/new"
        element={
          <PrivateRoute
            isAuthenticated={hasPermission(Permissions.RequestImaging)}
            element={<NewImagingRequest />}
          />
        }
      />
    </Routes>
  );
};

export default Imagings;