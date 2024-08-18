import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, 
  Button, List, ListItem, ListItemText, 
  IconButton, Badge, Popover, ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AppointmentIcon from '@mui/icons-material/Event';
import AllergyIcon from '@mui/icons-material/Healing';
import DiagnosisIcon from '@mui/icons-material/LocalHospital';
import CareGoalsIcon from '@mui/icons-material/Stars';
import MedicationsIcon from '@mui/icons-material/Medication';
import ChatIcon from '@mui/icons-material/Chat';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
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

const PatientDashboard = () => {
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
  labels: ['Diabetes', 'Hypertension', 'Gastroesophageal reflux disease', 'Heart Disease', 'Other'],
  datasets: [
    {
      label: 'Problems Experienced',
      data: [12, 15, 8, 10, 5],
      backgroundColor: pastelBlue,
    },
  ],
};

const pieData = {
  labels: ['Betalok', 'Sevikar', 'Helides', 'Diabetyn'],
  datasets: [
    {
      data: [40, 25, 20, 15],
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
          <ListItem button component={RouterLink} to="/appointments">
            <ListItemIcon><AppointmentIcon sx={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItem>
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
            justifyContent: 'space-between',  // Space between for title and right-aligned elements
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ color: pastelRed }}>
            Patient Dashboard
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
                  <ListItemText primary="Chatbot Update: Now Supporting Voice Commands!" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Scheduled Maintenance: 12 AM - 2 AM Tomorrow" />
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
                  <ListItemText primary="Reminder: Your appointment is tomorrow at 10 AM." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="New message from Dr. Smith." />
                </ListItem>
              </List>
            </Popover>

            <Button
            component={RouterLink}
            to="/patient-profile"
            variant="contained"
            startIcon={<PersonIcon />}
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
                backgroundColor: pastelBlue,
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
              component={RouterLink}
              to="/chatbot"
              variant="contained"
              color="secondary"
              startIcon={<ChatIcon />}
              sx={{
                backgroundColor: pastelRed,
                '&:hover': {
                  backgroundColor: '#e64a19',
                },
                textTransform: 'none',
              }}
            >
              Ask Chatbot
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<ExitToAppIcon />}
              onClick={handleLogout}  // Logout and navigate to login page
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
              Welcome to your Patient Dashboard
            </Typography>
            <Typography paragraph>
              Here you can manage your appointments, view your medical history, and keep track of your health goals and medications.
            </Typography>

            {/* Centered Image */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'left',  // Center the image horizontally
                alignItems: 'left',
                mt: 4,
              }}
            >
              <img
                src="dashboard.jpg"
                alt="Dashboard Illustration"
                style={{ maxWidth: '40%', height: 'auto' }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* New Card with Charts */}
        <Card sx={{ mt: 4 }}> {/* Thicker border */}
          <CardContent>
            <Typography variant="h6" sx={{ color: pastelBlue }}>
              Health Overview
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',  // Align charts to the left
                alignItems: 'flex-start',
                gap: 4,  // Adjust spacing between the charts
                mt: 2,
              }}
            >
              {/* Bar Chart */}
              <Box sx={{ width: '30%', p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Principal Conditions
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
                        text: 'Conditions Experienced by Patient',
                      },
                    },
                  }}
                />
              </Box>

              {/* Pie Chart */}
              <Box sx={{ width: '30%', p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Medication Effectiveness
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default PatientDashboard;