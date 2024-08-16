import React, { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, AppBar, Toolbar, IconButton, Menu, MenuItem, Drawer, List, ListItemIcon, ListItemText, Divider, ListItemButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuIcon from '@mui/icons-material/Menu';
import Dashboard from './pages/dashboard/Dashboard';
import Imagings from './pages/imagings/Imagings';
import Incidents from './pages/incidents/Incidents';
import Labs from './pages/labs/Labs';
import Medications from './pages/medications/Medications';
import Breadcrumbs from './pages/page-header/breadcrumbs/Breadcrumbs';
import ButtonToolBar from './pages/page-header/button-toolbar/ButtonToolBar';
import { useTitle } from './pages/page-header/title/TitleContext';
import Patients from './pages/patients/Patients';
import Appointments from './pages/scheduling/appointments/Appointments';
import Settings from './app-components/Settings';
import NetworkStatusMessage from './network-status/NetworkStatusMessage';
import { fetchUserPermissions } from './user/userActions'

const HealthInCampus = () => {
  const { title } = useTitle();
  const sidebarCollapsed = useSelector((state) => state.components?.sidebarCollapsed) || false;
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch permissions on component mount
    dispatch(fetchUserPermissions());
  }, [dispatch]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);  
  };

  return (
    <div>
      <NetworkStatusMessage />
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: sidebarCollapsed ? 60 : 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarCollapsed ? 60 : 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          <ListItemButton onClick={() => handleNavigation('/dashboard')}>
            <ListItemIcon>
              <MenuIcon /> 
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Dashboard" />}
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation('/appointments')}>
            <ListItemIcon>
              <MenuIcon /> 
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Appointments" />}
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation('/patients')}>
            <ListItemIcon>
              <MenuIcon /> 
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Patients" />}
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation('/labs')}>
            <ListItemIcon>
              <MenuIcon /> 
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Labs" />}
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation('/medications')}>
            <ListItemIcon>
              <MenuIcon /> 
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Medications" />}
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation('/incidents')}>
            <ListItemIcon>
              <MenuIcon /> 
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Incidents" />}
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation('/settings')}>
            <ListItemIcon>
              <MenuIcon /> 
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Settings" />}
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation('/imaging')}>
            <ListItemIcon>
              <MenuIcon /> 
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Imaging" />}
          </ListItemButton>
        </List>
        <Divider />
      </Drawer>
      <Container maxWidth="xl" sx={{ display: 'flex', height: '100vh' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: drawerOpen ? (sidebarCollapsed ? 2 : 3) : 0,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3, pt: 3 }}>
            <ButtonToolBar />
          </Box>
          <Breadcrumbs />
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/medications" element={<Medications />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/imaging" element={<Imagings />} />
            </Routes>
          </Box>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="success">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </div>
  );
};

export default HealthInCampus;
