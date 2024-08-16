import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider, Link, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HICModal from '../../components/HICModal'; // Correct path for HICModal
import { WarningToaster } from '../../components/ToasterTypes'; // Correct path for WarningToaster
import { Link as RouterLink } from 'react-router-dom';

const pastelBlue = '#6faaff'; // Pastel blue color
const pastelRed = '#ff6f6f'; // Pastel red color

const OrthopedicsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const conditions = [
    { name: 'Fractures', info: 'Fractures are breaks in bones, often caused by trauma. Learn about symptoms, treatments, and recovery tips.' },
    { name: 'Osteoarthritis', info: 'Osteoarthritis is a degenerative joint disease that causes pain and stiffness. Explore management strategies and treatments.' },
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
          <ListItem button component={RouterLink} to="/gastroenterology">
            <ListItemText primary="Gastroenterology" />
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
            Orthopedics
          </Typography>

          {/* Subtitle */}
          <Typography variant="h5" sx={{ color: pastelBlue, mb: 2 }}>
            Your Bone and Joint Health Matters
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
                Our mission is to support students with orthopedic care, from injury prevention to rehabilitation, ensuring optimal bone and joint health.
              </Typography>
            </CardContent>
          </Card>

          {/* What You Can Find */}
          <Typography variant="h6" sx={{ color: pastelRed, mb: 1 }}>
            What You Can Find on This Platform
          </Typography>
          <Typography paragraph>
            On our platform, you can find information about various orthopedic conditions, including fractures, arthritis, and other joint-related issues. Our experts offer guidance on treatment options, rehabilitation, and preventive measures.
          </Typography>

          {/* Conditions */}
          <Typography variant="h6" sx={{ color: pastelRed, mt: 4, mb: 1 }}>
            Common Orthopedic Conditions
          </Typography>
          <Grid container spacing={2}>
            {conditions.map((condition) => (
              <Grid item xs={12} sm={6} md={4} key={condition.name}>
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
            Treatment options for orthopedic conditions may include physical therapy, medication, surgery, or lifestyle adjustments. Our platform provides comprehensive resources to help you understand your treatment options and make informed decisions.
          </Typography>

          {/* Info Links */}
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" sx={{ color: pastelRed, mb: 1 }}>
            Additional Resources
          </Typography>
          <Typography>
            <Link href="https://www.aaos.org/" target="_blank" rel="noopener" sx={{ color: pastelBlue }}>
              American Academy of Orthopaedic Surgeons - Patient Information
            </Link>
          </Typography>
          <Typography>
            <Link href="https://www.mayoclinic.org/diseases-conditions/osteoarthritis/symptoms-causes/syc-20350609" target="_blank" rel="noopener" sx={{ color: pastelBlue }}>
              Mayo Clinic - Osteoarthritis Overview
            </Link>
          </Typography>
          <Typography>
            <Link href="https://www.nhs.uk/conditions/arthritis/" target="_blank" rel="noopener" sx={{ color: pastelBlue }}>
              NHS - Arthritis Information
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

export default OrthopedicsPage;