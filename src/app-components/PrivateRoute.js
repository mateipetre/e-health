import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, element }) => {
  return isAuthenticated ? element : <Navigate to="/homepage" />;
};

export default PrivateRoute;