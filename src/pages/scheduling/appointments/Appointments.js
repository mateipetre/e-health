import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import PrivateRoute from '../../../app-components/PrivateRoute';
import Permissions from '../../../app-components/Permissions';
import EditAppointment from './edit/EditAppointment';
import NewAppointment from './new/NewAppointment';
import ViewAppointment from './view/ViewAppointment';
import ViewAppointments from './ViewAppointments';

const Appointments = () => {
  const permissions = useSelector((state) => state.user.permissions);

  return (
    <Box sx={{ p: 3 }}>
      <Routes>
        <Route
          path="/appointments"
          element={
            <PrivateRoute
              isAuthenticated={permissions.includes(Permissions.ReadAppointments)}
              element={<ViewAppointments />}
            />
          }
        />
        <Route
          path="/appointments/new"
          element={
            <PrivateRoute
              isAuthenticated={permissions.includes(Permissions.WriteAppointments)}
              element={<NewAppointment />}
            />
          }
        />
        <Route
          path="/appointments/edit/:id"
          element={
            <PrivateRoute
              isAuthenticated={
                permissions.includes(Permissions.WriteAppointments) &&
                permissions.includes(Permissions.ReadAppointments)
              }
              element={<EditAppointment />}
            />
          }
        />
        <Route
          path="/appointments/:id"
          element={
            <PrivateRoute
              isAuthenticated={permissions.includes(Permissions.ReadAppointments)}
              element={<ViewAppointment />}
            />
          }
        />
        <Route path="*" element={<Navigate to="/appointments" />} />
      </Routes>
    </Box>
  );
};

export default Appointments;