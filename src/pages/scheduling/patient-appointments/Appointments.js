import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, 
  Button, List, ListItem, ListItemText, 
  IconButton, ListItemIcon
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DateRangeIcon from '@mui/icons-material/DateRange';
import HomeIcon from '@mui/icons-material/Home';
import IncidentIcon from '@mui/icons-material/Warning';
import NotesIcon from '@mui/icons-material/Note';
import CareGoalsIcon from '@mui/icons-material/Stars';
import AllergyIcon from '@mui/icons-material/Healing';
import DiagnosisIcon from '@mui/icons-material/LocalHospital';
import MedicationsIcon from '@mui/icons-material/Medication';
import Permissions from '../../../app-components/Permissions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPermissions } from '../../../user/userActions';
import HICErrorModal from '../../../components/HICErrorModal';
import { styled } from '@mui/system';

const pastelBlue = '#6faaff';
const pastelRed = '#ff6f6f';

const OperationIcon = styled('img')({
  width: '70px',
  height: '70px'
});

const Appointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permissions = useSelector((state) => state.user.permissions);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchUserPermissions());

    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const hasPermission = (permission) => permissions.includes(permission);

  const handleCardClick = (path, permission, message) => {
    if (hasPermission(permission)) {
      navigate(path);
    } else {
      setErrorMessage(message);
      setErrorModalOpen(true);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseModal = () => {
    setErrorModalOpen(false);
    setErrorMessage('');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarOpen ? 320 : 50,
          backgroundColor: pastelBlue,
          color: '#ffffff',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: sidebarOpen ? 'flex-start' : 'center',
          transition: 'width 0.3s',
          position: 'relative',
        }}
      >
        {/* Logo and Toggle Button */}
        {sidebarOpen && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              mb: 2,
            }}
          >
            <Button
              onClick={() => navigate('/')}
              sx={{
                padding: 0,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                width: '100%',
              }}
            >
              <img
                src="logo-no-background.png"
                alt="Logo"
                style={{ height: '35px' }}
              />
            </Button>
            <IconButton onClick={toggleSidebar} sx={{ color: '#ffffff' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        {/* Sidebar Links */}
        <List sx={{ display: sidebarOpen ? 'block' : 'none', width: '100%' }}>
          <ListItem button component={RouterLink} to="/allergies">
            <ListItemIcon><AllergyIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Allergies" />
          </ListItem>
          <ListItem button component={RouterLink} to="/diagnoses">
            <ListItemIcon><DiagnosisIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Diagnoses" />
          </ListItem>
          <ListItem button component={RouterLink} to="/care-goals">
            <ListItemIcon><CareGoalsIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Care Goals" />
          </ListItem>
          <ListItem button component={RouterLink} to="/medications">
            <ListItemIcon><MedicationsIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Medications" />
          </ListItem>
          <ListItem button component={RouterLink} to="/notes">
            <ListItemIcon><NotesIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button component={RouterLink} to="/incidents">
            <ListItemIcon><IncidentIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Incidents" />
          </ListItem>
        </List>

        {!sidebarOpen && (
          <IconButton onClick={toggleSidebar} sx={{ color: '#ffffff', marginTop: '16px' }}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#ffffff',
          fontFamily: 'ABeeZee, sans-serif',
          overflowY: 'auto',
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ color: pastelRed }}>
            Appointments Dashboard
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Date and Time */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: pastelRed,
                color: '#ffffff',
                p: 1,
                borderRadius: 1,
              }}
            >
              <DateRangeIcon sx={{ mr: 1 }} />
              <Typography>
                {dateTime.toLocaleString('en-GB', {
                  timeZone: 'Europe/Bucharest',
                  hour12: false,
                  dateStyle: 'medium',
                  timeStyle: 'medium',
                })}
              </Typography>
            </Box>

            {/* Back to Dashboard Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/patient-dashboard')}
              startIcon={<HomeIcon />}
              sx={{
                backgroundColor: pastelBlue,
                '&:hover': {
                  backgroundColor: '#005bb5',
                },
                textTransform: 'none',
              }}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Box>

        <Box height="50px"></Box>

        {/* Description Section */}
        <Card sx={{ mb: 15, p: 1, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography paragraph>
              Manage and view your appointments efficiently. Use the options below to navigate through different appointment functions, such as viewing, scheduling, or updating your appointments.
            </Typography>
          </CardContent>
        </Card>

        {/* Content Section */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, marginLeft: '100px' }}>
          {/* Image */}
          <Box sx={{ flex: 1 }}>
            <img
              src="appointments.jpg"
              alt="Appointments Dashboard"
              style={{ width: '160%', height: 'auto' }}
            />
          </Box>

          {/* Cards Section */}
          <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 3, marginLeft: '400px', marginTop: '150px' }}>
            {/* Cards Row 1 */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Card
                onClick={() =>
                  handleCardClick(
                    '/appointments/view',
                    Permissions.ReadAppointments,
                    'You do not have permission to view appointments.'
                  )
                }
                sx={{
                  boxShadow: 5,
                  borderRadius: 3,
                  backgroundColor: '#f5f5f5',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '300px',
                  '&:hover': { boxShadow: 10 },
                }}
              >
                <CardContent>
                  <OperationIcon src={'view-appointments.png'} alt="view-appointments-icon" />
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontFamily: 'ABeeZee, sans-serif', fontWeight: 'bold' }}
                  >
                    View Appointments
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'ABeeZee, sans-serif' }}>
                    Access all appointment records
                  </Typography>
                </CardContent>
              </Card>
              <Card
                onClick={() =>
                  handleCardClick(
                    '/appointments/new',
                    Permissions.WriteAppointments,
                    'You do not have permission to schedule appointments.'
                  )
                }
                sx={{
                  boxShadow: 5,
                  borderRadius: 3,
                  backgroundColor: '#f5f5f5',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '300px',
                  '&:hover': { boxShadow: 10 },
                }}
              >
                <CardContent>
                  <OperationIcon src={'add-appointment.png'} alt="schedule-appointment-icon" />
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontFamily: 'ABeeZee, sans-serif', fontWeight: 'bold' }}
                  >
                    Schedule Appointment
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'ABeeZee, sans-serif' }}>
                    Schedule a new appointment
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Cards Row 2 */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Card
                onClick={() =>
                  handleCardClick(
                    '/appointments/update',
                    Permissions.EditAppointment,
                    'You do not have permission to edit appointments.'
                  )
                }
                sx={{
                  boxShadow: 5,
                  borderRadius: 3,
                  backgroundColor: '#f5f5f5',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '300px',
                  '&:hover': { boxShadow: 10 },
                }}
              >
                <CardContent>
                  <OperationIcon src={'update-appointment.png'} alt="edit-appointments-icon" />
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontFamily: 'ABeeZee, sans-serif', fontWeight: 'bold' }}
                  >
                    Update Appointments
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'ABeeZee, sans-serif' }}>
                    Modify existing appointments
                  </Typography>
                </CardContent>
              </Card>

              <Card
                onClick={() =>
                  handleCardClick(
                    '/appointments/delete',
                    Permissions.DeleteAppointment,
                    'You do not have permission to delete appointments.'
                  )
                }
                sx={{
                  boxShadow: 5,
                  borderRadius: 3,
                  backgroundColor: '#f5f5f5',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '300px',
                  '&:hover': { boxShadow: 10 },
                }}
              >
                <CardContent>
                  <OperationIcon src={'delete-appointment.png'} alt="delete-appointments-icon" />
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontFamily: 'ABeeZee, sans-serif', fontWeight: 'bold' }}
                  >
                    Delete Appointments
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'ABeeZee, sans-serif' }}>
                    Delete existing appointments
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Error Modal */}
      <HICErrorModal
          open={errorModalOpen}
          onClose={handleCloseModal}
          title="Permission Denied"
          content={<Typography>{errorMessage}</Typography>}
          actions={[
            {
              label: 'Close',
              onClick: handleCloseModal,
              variant: 'contained',
              color: 'primary',
            },
          ]}
          bgcolor="#fff"
          padding="24px"
          borderRadius="12px"
          boxShadow="5px 5px 15px rgba(0, 0, 0, 0.3)"
          headerBorderBottom="1px solid #e0e0e0"
        />
    </Box>
  );
};

export default Appointments;