/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent,
  Button, List, ListItem, ListItemText,
  IconButton, ListItemIcon
} from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DateRangeIcon from '@mui/icons-material/DateRange';
import HomeIcon from '@mui/icons-material/Home';
import AppointmentIcon from '@mui/icons-material/Event';
import IncidentIcon from '@mui/icons-material/Warning';
import NotesIcon from '@mui/icons-material/Note';
import Permissions from '../../app-components/Permissions';
import LabIcon from '@mui/icons-material/LocalHospital';
import RelatedPersonsIcon from '@mui/icons-material/People';
import CarePlanIcon from '@mui/icons-material/Assignment';
import PatientIcon from '@mui/icons-material/Person';
import ImagingIcon from '@mui/icons-material/CameraAlt';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPermissions } from '../../user/userActions';
import HICErrorModal from '../../components/HICErrorModal';
import { styled } from '@mui/system';
import axios from 'axios';

const pastelRed = '#ff6f6f';
const pastelBlue = '#6faaff';

const OperationIcon = styled('img')({
  width: '70px',
  height: '70px'
});

const Medications = () => {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permissions = useSelector((state) => state.user.permissions);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [patientFullName, setPatientFullName] = useState('');

  useEffect(() => {
    dispatch(fetchUserPermissions());

     // Fetch the patient's full name
     const fetchPatientFullName = async () => {
      try {
        const response = await axios.get(`/patients/${patientId}/fullname`);
        setPatientFullName(response.data.fullName);
      } catch (error) {
        console.error('Failed to fetch patient full name', error);
      }
    };

    fetchPatientFullName();

    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, patientId]);

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
                src="/logo-no-background.png"
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
          <ListItem button component={RouterLink} to="/appointments">
            <ListItemIcon><AppointmentIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItem>
          <ListItem button component={RouterLink} to="/patients">
            <ListItemIcon><PatientIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Patients" />
          </ListItem>
          <ListItem button component={RouterLink} to="/labs">
            <ListItemIcon><LabIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Labs" />
          </ListItem>
          <ListItem button component={RouterLink} to="/incidents">
            <ListItemIcon><IncidentIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Incidents" />
          </ListItem>
          <ListItem button component={RouterLink} to="/imaging">
            <ListItemIcon><ImagingIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Imagings" />
          </ListItem>
          <ListItem button component={RouterLink} to="/care-plans">
            <ListItemIcon><CarePlanIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Care Plans" />
          </ListItem>
          <ListItem button component={RouterLink} to="/notes">
            <ListItemIcon><NotesIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button component={RouterLink} to="/related-persons">
            <ListItemIcon><RelatedPersonsIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Related Persons" />
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
          {`${patientFullName}'s Medications`}
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
              onClick={() => navigate('/patients/view')}
              startIcon={<HomeIcon />}
              sx={{
                backgroundColor: pastelBlue,
                '&:hover': {
                  backgroundColor: '#005bb5',
                },
                textTransform: 'none',
              }}
            >
              Back to Patients List
            </Button>
          </Box>
        </Box>

        <Box height="50px"></Box>

        {/* Description Section */}
        <Card sx={{ mb: 15, p: 1, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography paragraph>
              Manage medications effectively. Use the options below to view, add, or edit medications based on your permissions.
            </Typography>
          </CardContent>
        </Card>

        {/* Content Section */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, marginLeft: '100px' }}>
          {/* Image */}
          <Box sx={{ flex: 1 }}>
            <img
              src="/medications.jpg"
              alt="Medications Dashboard Image"
              style={{ width: '220%', height: 'auto' }}
            />
          </Box>

          {/* Cards Section */}
          <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 3, marginLeft: '450px', marginTop: '100px' }}>
            {/* Cards Row 1 */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Card
                onClick={() =>
                  handleCardClick(
                    `/patients/medications/view/${patientId}`,
                    Permissions.ViewMedications,
                    'You do not have permission to view medications.'
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
                  <OperationIcon src="/view-medications.png" alt="View Medications Icon" />
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontFamily: 'ABeeZee, sans-serif', fontWeight: 'bold' }}
                  >
                    View Medications
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'ABeeZee, sans-serif' }}>
                    Access all medication records
                  </Typography>
                </CardContent>
              </Card>

              <Card
                onClick={() =>
                  handleCardClick(
                    `/patients/medications/new/${patientId}`,
                    Permissions.RequestMedication,
                    'You do not have permission to request medications.'
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
                  <OperationIcon src="/request-medication.png" alt="Add Medication Icon" />
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontFamily: 'ABeeZee, sans-serif', fontWeight: 'bold' }}
                  >
                    Request Medication
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'ABeeZee, sans-serif' }}>
                    Request a medication
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Cards Row 2 */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Card
                onClick={() =>
                  handleCardClick(
                    `/patients/medications/update/${patientId}`,
                    Permissions.EditMedication,
                    'You do not have permission to update medications.'
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
                  <OperationIcon src="/edit-medication.png" alt="Edit Medication Icon" />
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontFamily: 'ABeeZee, sans-serif', fontWeight: 'bold' }}
                  >
                    Update Medication
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'ABeeZee, sans-serif' }}>
                    Modify existing medications
                  </Typography>
                </CardContent>
              </Card>

              <Card
                onClick={() =>
                  handleCardClick(
                    `/patients/medications/cancel/${patientId}`,
                    Permissions.CancelMedication,
                    'You do not have permission to cancel medications.'
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
                  <OperationIcon src="/cancel-medication.png" alt="Delete Medication Icon" />
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontFamily: 'ABeeZee, sans-serif', fontWeight: 'bold' }}
                  >
                    Cancel Medication
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'ABeeZee, sans-serif' }}>
                    Delete existing medications
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

export default Medications;