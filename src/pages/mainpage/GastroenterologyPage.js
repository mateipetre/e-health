import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider, Link, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HICModal from '../../components/HICModal'; // Correct path for HICModal
import { WarningToaster } from '../../components/ToasterTypes'; // Correct path for WarningToaster
import { Link as RouterLink } from 'react-router-dom';

const pastelBlue = '#6faaff'; // Pastel blue color
const pastelRed = '#ff6f6f'; // Pastel red color

const GastroenterologyPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const conditions = [
    { name: 'Gastritis', info: 'Gastritis is the inflammation of the stomach lining. Explore treatment options and preventive measures on our platform.' },
    { name: 'Irritable Bowel Syndrome (IBS)', info: 'IBS affects the large intestine and causes symptoms like cramping and bloating. Learn more about managing IBS here.' },
    // Add more conditions here as needed
  ];

  const handleOpenModal = (condition) => {
    setSelectedCondition(condition);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCondition(null);
  };

  const handleOpenToaster = () => {
    setToasterOpen(true);
  };

  const handleCloseToaster = () => {
    setToasterOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
              component={RouterLink}
              to="/"
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
          <ListItem button component={RouterLink} to="/cardiology">
            <ListItemText primary="Cardiology" />
          </ListItem>
          <ListItem button component={RouterLink} to="/oncology">
            <ListItemText primary="Oncology" />
          </ListItem>
          <ListItem button component={RouterLink} to="/dermatology">
            <ListItemText primary="Dermatology" />
          </ListItem>
          <ListItem button component={RouterLink} to="/neurology">
            <ListItemText primary="Neurology" />
          </ListItem>
          <ListItem button component={RouterLink} to="/orthopedics">
            <ListItemText primary="Orthopedics" />
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
        {/* Content Section */}
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          {/* Page Title */}
          <Typography variant="h3" sx={{ color: pastelRed, mb: 3 }}>
            Gastroenterology
          </Typography>

          {/* Subtitle */}
          <Typography variant="h5" sx={{ color: pastelBlue, mb: 2 }}>
            Digestive Health Matters
          </Typography>

          {/* Author */}
          <Typography variant="subtitle1" sx={{ color: '#444', mb: 2 }}>
            Author: Campus Health Team
          </Typography>

          {/* Mission Statement */}
          <Card sx={{ mb: 4, backgroundColor: pastelBlue, color: '#ffffff', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Our Mission</Typography>
              <Typography>
                Our mission is to offer comprehensive care for digestive health issues, from diagnosing common gastrointestinal
                conditions to providing effective treatments and preventive measures.
              </Typography>
            </CardContent>
          </Card>

          {/* What You Can Find */}
          <Typography variant="h6" sx={{ color: pastelRed, mb: 1 }}>
            What You Can Find on This Platform
          </Typography>
          <Typography paragraph>
            On our platform, you can access detailed information about various digestive health conditions, including causes,
            symptoms, and treatment options. Our specialists are here to provide expert advice and guidance.
          </Typography>

          {/* Conditions */}
          <Typography variant="h6" sx={{ color: pastelRed, mt: 4, mb: 1 }}>
            Common Digestive Conditions Treated
          </Typography>
          <Grid container spacing={2}>
            {conditions.map((condition) => (
              <Grid item xs={12} sm={6} key={condition.name}>
                <Card sx={{ boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: pastelBlue }}>{condition.name}</Typography>
                    <Typography>
                      {condition.info}
                    </Typography>
                    <Button
                      sx={{ mt: 2 }}
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        handleOpenModal(condition);
                        handleOpenToaster();
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Treatments */}
          <Typography variant="h6" sx={{ color: pastelRed, mt: 4, mb: 1 }}>
            Treatment Options
          </Typography>
          <Typography paragraph>
            Treatments for gastrointestinal conditions vary from lifestyle changes and dietary modifications to medications
            and specialized therapies. Discover personalized treatment options and expert advice on our platform.
          </Typography>

          {/* Info Links */}
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" sx={{ color: pastelRed, mb: 1 }}>
            Additional Resources
          </Typography>
          <Typography>
            <Link href="https://www.gastro.org/patients" target="_blank" rel="noopener" sx={{ color: pastelBlue }}>
              American Gastroenterological Association - Patient Resources
            </Link>
          </Typography>
          <Typography>
            <Link href="https://www.mayoclinic.org/diseases-conditions" target="_blank" rel="noopener" sx={{ color: pastelBlue }}>
              Mayo Clinic - Gastrointestinal Conditions Overview
            </Link>
          </Typography>
          <Typography>
            <Link href="https://www.nhs.uk/conditions/digestive-system/" target="_blank" rel="noopener" sx={{ color: pastelBlue }}>
              NHS - Digestive System
            </Link>
          </Typography>
        </Box>

        {/* Modals and Toasters */}
        {selectedCondition && (
          <HICModal
            open={modalOpen}
            onClose={handleCloseModal}
            title={selectedCondition.name}
            content={
              <Typography variant="body1">{selectedCondition.info}</Typography>
            }
            actions={[
              {
                label: 'Close',
                onClick: handleCloseModal,
              }
            ]}
          />
        )}

        <WarningToaster
          message="Please consult a doctor for specific advice regarding your condition."
          isOpen={toasterOpen}
          onClose={handleCloseToaster}
          type="warning"
        />
      </Box>
    </Box>
  );
};

export default GastroenterologyPage;