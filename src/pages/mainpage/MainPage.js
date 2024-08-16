import React from 'react';
import { Box, Button, Menu, MenuItem, Grid, Typography, Chip } from '@mui/material';
import { ArrowDropDown, LocalHospital, MedicalServices, Healing, Login as LoginIcon, PersonAdd, FlashOn, EmojiEmotions, BuildCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AnimatedArrow from '../../app-components/AnimatedArrow';
import TagCloudComponent from './TagCloudComponent';
import MouseScrollIndicator from '../../app-components/MouseScrollIndicator';
import Footer from './Footer';

const pastelRed = '#ff6f6f'; // Pastel red color
const pastelBlue = '#6faaff'; // Pastel blue color

const MainPage = () => {
  const [anchorElDoctors, setAnchorElDoctors] = React.useState(null);
  const [anchorElSpecialties, setAnchorElSpecialties] = React.useState(null);
  const [anchorElConditions, setAnchorElConditions] = React.useState(null);

  const handleMenuOpen = (setAnchorEl) => (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (setAnchorEl) => () => {
    setAnchorEl(null);
  };

  return (
    <div>
    <Box
      sx={{
        flexGrow: 1,
        p: 4,
        backgroundColor: '#ffffff',
        fontFamily: 'ABeeZee, sans-serif',
        minHeight: '100vh', // Ensure full viewport height
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container alignItems="center">
        {/* Logo Section */}
        <Grid item xs={3}>
          <Button component={Link} to="/" sx={{ padding: 0 }}>
            <img src="logo-no-background.png" alt="Logo" style={{ height: '35px' }} />
          </Button>
        </Grid>

        {/* Center Section */}
        <Grid item xs={6} container justifyContent="center" spacing={2}>
          {/* Online Doctors Dropdown */}
          <Grid item>
            <Button
              onClick={handleMenuOpen(setAnchorElDoctors)}
              endIcon={<ArrowDropDown />}
              variant="text"
              sx={{ textTransform: 'none', fontFamily: 'ABeeZee, sans-serif', fontSize: '1rem' }}
            >
              <LocalHospital sx={{ mr: 1, color: pastelRed }} />
              Online Doctors
            </Button>
            <Menu
              anchorEl={anchorElDoctors}
              open={Boolean(anchorElDoctors)}
              onClose={handleMenuClose(setAnchorElDoctors)}
            >
              <MenuItem onClick={handleMenuClose(setAnchorElDoctors)}>Doctor 1</MenuItem>
              <MenuItem onClick={handleMenuClose(setAnchorElDoctors)}>Doctor 2</MenuItem>
              <MenuItem onClick={handleMenuClose(setAnchorElDoctors)}>Doctor 3</MenuItem>
            </Menu>
          </Grid>

          {/* Medical Specialties Dropdown */}
          <Grid item>
            <Button
              onClick={handleMenuOpen(setAnchorElSpecialties)}
              endIcon={<ArrowDropDown />}
              variant="text"
              sx={{ textTransform: 'none', fontFamily: 'ABeeZee, sans-serif', fontSize: '1rem' }}
            >
              <MedicalServices sx={{ mr: 1, color: pastelRed }} />
              Medical Specialties
            </Button>
            <Menu
              anchorEl={anchorElSpecialties}
              open={Boolean(anchorElSpecialties)}
              onClose={handleMenuClose(setAnchorElSpecialties)}
              PaperProps={{ style: { maxHeight: 400 } }}
            >
              <Grid container sx={{ p: 2 }} spacing={2}>
                <Grid item>
                  <MenuItem component={Link} to="/cardiology" onClick={handleMenuClose(setAnchorElSpecialties)}>Cardiology</MenuItem>
                  <MenuItem component={Link} to="/neurology" onClick={handleMenuClose(setAnchorElSpecialties)}>Neurology</MenuItem>
                  <MenuItem component={Link} to="/dermatology" onClick={handleMenuClose(setAnchorElSpecialties)}>Dermatology</MenuItem>
                </Grid>
                <Grid item>
                  <MenuItem component={Link} to="/gastroenterology" onClick={handleMenuClose(setAnchorElSpecialties)}>Gastroenterology</MenuItem>
                  <MenuItem component={Link} to="/oncology" onClick={handleMenuClose(setAnchorElSpecialties)}>Oncology</MenuItem>
                  <MenuItem component={Link} to="/orthopedics" onClick={handleMenuClose(setAnchorElSpecialties)}>Orthopedics</MenuItem>
                </Grid>
              </Grid>
            </Menu>
          </Grid>

          {/* Medical Conditions Dropdown */}
          <Grid item>
            <Button
              onClick={handleMenuOpen(setAnchorElConditions)}
              endIcon={<ArrowDropDown />}
              variant="text"
              sx={{ textTransform: 'none', fontFamily: 'ABeeZee, sans-serif', fontSize: '1rem' }}
            >
              <Healing sx={{ mr: 1, color: pastelRed }} />
              Medical Conditions
            </Button>
            <Menu
              anchorEl={anchorElConditions}
              open={Boolean(anchorElConditions)}
              onClose={handleMenuClose(setAnchorElConditions)}
              PaperProps={{ style: { maxHeight: 400 } }}
            >
              <Grid container sx={{ p: 2 }} spacing={2}>
                <Grid item>
                  <MenuItem component={Link} to="https://www.reginamaria.ro/articole-medicale/intrebari-frecvente-despre-diabet" target="_blank" rel="noopener noreferrer" onClick={handleMenuClose(setAnchorElConditions)}>Diabetes</MenuItem>
                  <MenuItem component={Link} to="https://www.reginamaria.ro/utile/dictionar-de-afectiuni/hipertensiune-arteriala" target="_blank" rel="noopener noreferrer" onClick={handleMenuClose(setAnchorElConditions)}>Hypertension</MenuItem>
                  <MenuItem component={Link} to="https://www.reginamaria.ro/utile/dictionar-de-afectiuni/astmul-bronsic" target="_blank" rel="noopener noreferrer" onClick={handleMenuClose(setAnchorElConditions)}>Asthma</MenuItem>
                </Grid>
                <Grid item>
                  <MenuItem component={Link} to="https://www.reginamaria.ro/articole-medicale/cum-se-manifesta-infectia-covid-19-semne-simptome-si-diferente-fata-de-gripa" target="_blank" rel="noopener noreferrer" onClick={handleMenuClose(setAnchorElConditions)}>COVID-19</MenuItem>
                  <MenuItem component={Link} to="https://www.reginamaria.ro/utile/dictionar-de-afectiuni/reumatismul-articular-acut-raa" target="_blank" rel="noopener noreferrer" onClick={handleMenuClose(setAnchorElConditions)}>Rheumatism</MenuItem>
                  <MenuItem component={Link} to="https://www.reginamaria.ro/utile/dictionar-de-afectiuni/boala-de-reflux-gastroesofagian-brge" target="_blank" rel="noopener noreferrer" onClick={handleMenuClose(setAnchorElConditions)}>Gastroesophageal Reflux Disease</MenuItem>
                </Grid>
              </Grid>
            </Menu>
          </Grid>

          {/* Doctor Registration Link */}
          <Grid item>
            <Button
              component={Link}
              to="/doctor-registration"
              variant="contained"
              color="primary"
              startIcon={<PersonAdd />}
              sx={{ textTransform: 'none', backgroundColor: '#2196f3', fontFamily: 'ABeeZee, sans-serif', fontSize: '1rem' }}
            >
              Register as Doctor
            </Button>
          </Grid>
        </Grid>

        {/* Login Section */}
        <Grid item xs={3} container justifyContent="flex-end">
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            sx={{ textTransform: 'none', fontFamily: 'ABeeZee, sans-serif', fontSize: '1rem' }}
          >
            Login
          </Button>
        </Grid>
      </Grid>

      {/* Center Content Section */}
      <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
        {/* Picture */}
        <Grid item xs={12} md={5} container justifyContent="center" sx={{ position: 'relative', top: '100px', left: '170px' }}>
          <img src="chatbot_talk.jpg" alt="Medical Campus Chatbot" style={{ width: '100%', maxWidth: '800px' }} />
        </Grid>

        {/* Text and Button */}
        <Grid item xs={12} md={5} container alignItems="center" direction="column" sx={{ position: 'relative', top: '75px', right: '170px' }}>
          <Typography variant="h3" sx={{ mb: 2, fontFamily: 'ABeeZee, sans-serif', fontSize: '2.5rem', textAlign: 'center' }}>
            Ask about your condition
          </Typography>

          {/* Custom Pills */}
          <Grid container justifyContent="center" spacing={2} sx={{ mb: 3 }}>
            <Grid item>
              <Chip
                icon={<FlashOn sx={{ color: pastelRed }} />}
                label="Fast"
                sx={{
                  backgroundColor: pastelBlue,
                  color: '#ffffff',
                  boxShadow: 2,
                  fontFamily: 'ABeeZee, sans-serif',
                  fontSize: '1rem',
                }}
              />
            </Grid>
            <Grid item>
              <Chip
                icon={<EmojiEmotions sx={{ color: pastelRed }} />}
                label="Easy"
                sx={{
                  backgroundColor: pastelBlue,
                  color: '#ffffff',
                  boxShadow: 2,
                  fontFamily: 'ABeeZee, sans-serif',
                  fontSize: '1rem',
                }}
              />
            </Grid>
            <Grid item>
              <Chip
                icon={<BuildCircle sx={{ color: pastelRed }} />}
                label="Useful"
                sx={{
                  backgroundColor: pastelBlue,
                  color: '#ffffff',
                  boxShadow: 2,
                  fontFamily: 'ABeeZee, sans-serif',
                  fontSize: '1rem',
                }}
              />
            </Grid>
          </Grid>

          <Button
            component={Link}
            to="/chatbot"
            variant="contained"
            sx={{ textTransform: 'none', backgroundColor: pastelRed, color: '#ffffff', fontFamily: 'ABeeZee, sans-serif', fontSize: '1.5rem', px: 4, display: 'flex', alignItems: 'center' }}
          >
            Talk to Campus Chatbot
            <AnimatedArrow />
          </Button>
        </Grid>
      </Grid>
    {/* Tag Cloud Section */}
    <Box sx={{ mt: 4, flexGrow: 1, pt: 4, height: 350 }}>
      </Box>
      <MouseScrollIndicator />
      {/* Tag Cloud Section */}
    </Box>
    <Box
      sx={{mt: 4,
        flexGrow: 1,
        pt: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        width: '100%', // Full width of the container
        backgroundColor: '#f0f0f0', // Optional background color
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontFamily: 'ABeeZee, sans-serif' }}>
          Explore terms searched by our users
        </Typography>
      <Box sx={{ width: 1000 }}><TagCloudComponent /></Box>
      <Box sx={{ mt: 4, flexGrow: 1, pt: 4, height: 50 }}>
      </Box>
    </Box>
    <Box><Footer></Footer></Box>
    </div>
  );
};

export default MainPage;