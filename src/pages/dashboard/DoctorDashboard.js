import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, 
  Button, List, ListItem, ListItemText, 
  IconButton, Badge, Popover, ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AppointmentIcon from '@mui/icons-material/Event';
import PatientIcon from '@mui/icons-material/Person';
import LabIcon from '@mui/icons-material/LocalHospital'; // Example icon
import IncidentIcon from '@mui/icons-material/Warning'; // Example icon
import CarePlanIcon from '@mui/icons-material/Assignment'; // Example icon
import ImagingIcon from '@mui/icons-material/CameraAlt'; // Example icon
import DateRangeIcon from '@mui/icons-material/DateRange';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import NotesIcon from '@mui/icons-material/Note';
import RelatedPersonsIcon from '@mui/icons-material/People';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registering components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const pastelBlue = '#6faaff';
const pastelRed = '#ff6f6f';
const pastelSoftRed = '#ff9999';  // Softer red color for badges

const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dateTime, setDateTime] = useState(new Date());
  const [anchorNotif, setAnchorNotif] = useState(null);
  const [anchorMsg, setAnchorMsg] = useState(null);
  const [notifCount, setNotifCount] = useState(3);
  const [msgCount, setMsgCount] = useState(5);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNotifClick = (event) => {
    setAnchorNotif(event.currentTarget);
    setNotifCount(0);  // Reset notification count on click
  };

  const handleMsgClick = (event) => {
    setAnchorMsg(event.currentTarget);
    setMsgCount(0);  // Reset message count on click
  };

  const handleClose = () => {
    setAnchorNotif(null);
    setAnchorMsg(null);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const openNotif = Boolean(anchorNotif);
  const openMsg = Boolean(anchorMsg);

  // Hardcoded data for charts
  const barData = {
    labels: ['Echocardiogram', 'Stress Test', 'Blood Test', 'Chest X-Ray'],
    datasets: [
      {
        label: 'Lab Analysis Appreciations',
        data: [15, 25, 10, 5],
        backgroundColor: pastelBlue,
      },
    ],
  };

  const pieData = {
    labels: ['Coronary Artery Disease', 'Heart Failure', 'Arrhythmias', 'Hypertension'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
      },
    ],
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
          <ListItem button component={RouterLink} to="/doctor/appointments">
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
          <ListItem button component={RouterLink} to="/doctor/incidents">
            <ListItemIcon><IncidentIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Incidents" />
          </ListItem>
          <ListItem button component={RouterLink} to="/care-plans">
            <ListItemIcon><CarePlanIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Care Plans" />
          </ListItem>
          <ListItem button component={RouterLink} to="/imaging">
            <ListItemIcon><ImagingIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Imagings" />
          </ListItem>
            <ListItem button component={RouterLink} to="/doctor/notes">
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
            Doctor Dashboard
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={handleNotifClick} sx={{ color: '#1976d2' }}>
              <Badge badgeContent={notifCount} color="error" sx={{ '& .MuiBadge-colorError': { backgroundColor: pastelSoftRed } }}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Popover
              open={openNotif}
              anchorEl={anchorNotif}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <List sx={{ width: '300px' }}>
                <ListItem>
                  <ListItemText primary="New Dashboard Feature: Enhanced Charts!" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="New Alerts: Important updates!" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Maintenance Notice: Server downtime at 2 AM" />
                </ListItem>
              </List>
            </Popover>

            <IconButton onClick={handleMsgClick} sx={{ color: '#1976d2' }}>
              <Badge badgeContent={msgCount} color="error" sx={{ '& .MuiBadge-colorError': { backgroundColor: pastelSoftRed } }}>
                <MessageIcon />
              </Badge>
            </IconButton>
            <Popover
              open={openMsg}
              anchorEl={anchorMsg}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <List sx={{ width: '300px' }}>
                <ListItem>
                  <ListItemText primary="Welcome to your dashboard!" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Reminder: Your meeting with Dr. Smith is scheduled." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="New message from your team." />
                </ListItem>
              </List>
            </Popover>

            <Button
              component={RouterLink}
              to="/doctor-profile"
              variant="contained"
              startIcon={<PatientIcon />}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                textTransform: 'none',
              }}
            >
              User Profile
            </Button>

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

            <Button
              variant="contained"
              color="primary"
              startIcon={<ExitToAppIcon />}
              onClick={handleLogout}
              sx={{
                backgroundColor: pastelBlue,
                '&:hover': {
                  backgroundColor: '#005bb5',
                },
                textTransform: 'none',
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {/* Content Section */}
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ color: pastelBlue }}>
              Welcome to your Doctor Dashboard
            </Typography>
            <Typography paragraph>
              Here you can manage your appointments, view patient records, and analyze lab results.
            </Typography>

            {/* Centered Image */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                mt: 4,
              }}
            >
              <img
                src="doctor-dashboard.jpg"
                alt="Doctor Dashboard Illustration"
                style={{ maxWidth: '35%', height: 'auto' }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* New Card with Charts */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: pastelBlue }}>
              Health Overview
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 4,
                mt: 2,
              }}
            >
              {/* Pie Chart */}
              <Box sx={{ width: '30%', p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  My principal diagnoses
                </Typography>
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                      tooltip: {
                        callbacks: {
                          label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                          },
                        },
                      },
                    },
                  }}
                />
              </Box>

              {/* Bar Chart */}
              <Box sx={{ width: '30%', p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  My lab analysis appreciations
                </Typography>
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      title: {
                        display: true,
                        text: 'Appreciations for Laboratory Analysis',
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;