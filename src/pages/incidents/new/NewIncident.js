import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal'; // Import Success Modal

const NewIncident = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [severityLevel, setSeverityLevel] = useState('');
  const [cause, setCause] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false); // Success modal state
  const [errorModalOpen, setErrorModalOpen] = useState(false); // Error modal state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  const incidentTypes = ['data breach', 'misdiagnosis', 'unauthorized access', 'system outage', 'other'];
  const severityLevels = ['minor', 'medium', 'critical'];
  const causes = ['malfunction', 'human error', 'cyberattack', 'procedural failures'];

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newIncident = {
      name,
      type,
      description,
      severityLevel: severityLevel,
      cause,
    };

    try {
      const response = await fetch(`/patients/66cb68934f5769ec17d174a9/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIncident),
      });

      if (response.ok) {
        setSuccessModalOpen(true); // Open success modal
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add incident');
        setErrorModalOpen(true); // Open error modal
      }
    } catch (error) {
      console.error('Error adding new incident:', error);
      setErrorMessage('Server error while adding incident');
      setErrorModalOpen(true); // Open error modal
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    navigate('/incidents');
    // Optionally, redirect or clear form here
  };


  const handleSuccessModalCloseOnClick = () => {
    setSuccessModalOpen(false);
    navigate('/incidents/view');
    // Optionally, redirect or clear form here
  };

  const handleErrorModalClose = () => {
    setErrorModalOpen(false);
  };

  return (
    <Box sx={{ padding: '20px', boxSizing: 'border-box', maxWidth: '2100px' }}>
      {/* Logo Button */}
      <Button
        component={RouterLink}
        to="/"
        sx={{
          position: 'fixed',
          top: 30,
          left: 30,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200,
          backgroundColor: 'transparent',
          '& img': {
            height: '35px',
          },
        }}
      >
        <img
          src="/logo-no-background.png"
          alt="Logo"
          style={{ height: '35px' }}
        />
      </Button>

      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/incidents"
        startIcon={<InfoIcon />}
        sx={{
          position: 'fixed',
          top: 30,
          right: 30,
          backgroundColor: '#6faaff',
          '&:hover': {
            backgroundColor: '#005bb5',
          },
          textTransform: 'none',
        }}
      >
        Back to Incidents Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: '50px', color: '#ff6f6f' }}>
        Add a New Incident
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignItems: 'center',
          maxWidth: 500,
          margin: '0 auto',
          padding: '20px',
          border: `4px solid ${'#b5ccfe'}`,
          borderRadius: '16px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
        onSubmit={handleSubmit}
      >
        {/* Name Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Name
          </Typography>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InfoIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        {/* Type Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Type
          </Typography>
          <TextField
            select
            value={type}
            onChange={(e) => setType(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {incidentTypes.map((incidentType) => (
              <MenuItem key={incidentType} value={incidentType}>
                {incidentType}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Description Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Description
          </Typography>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InfoIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        {/* Severity Level Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Severity Level
          </Typography>
          <TextField
            select
            value={severityLevel}
            onChange={(e) => setSeverityLevel(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WarningAmberIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {severityLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Cause Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Cause
          </Typography>
          <TextField
            select
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ReportProblemIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {causes.map((causeOption) => (
              <MenuItem key={causeOption} value={causeOption}>
                {causeOption}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#ff6f6f',
            '&:hover': {
              backgroundColor: '#e64a19',
            },
          }}
        >
          Add Incident
        </Button>
      </Box>

      {/* Error Modal */}
      <HICErrorModal
        open={errorModalOpen}
        onClose={handleErrorModalClose}
        title="Error"
        content={errorMessage}
        actions={[
          {
            label: 'Close',
            onClick: handleErrorModalClose,
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />

      {/* Success Modal */}
      <HICSuccessModal
        open={successModalOpen}
        onClose={handleSuccessModalClose}
        title="Success"
        content="Incident has been successfully added."
        actions={[
          {
            label: 'View incidents',
            onClick: handleSuccessModalCloseOnClick,
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </Box>
  );
};

export default NewIncident;