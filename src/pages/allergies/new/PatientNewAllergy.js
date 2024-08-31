import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import HealingIcon from '@mui/icons-material/Healing';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal'; // Import Success Modal

const NewAllergy = () => {
  const { patientId } = useParams();
  const [allergyType, setAllergyType] = useState('');
  const [severityLevel, setSeverityLevel] = useState('');
  const [trigger, setTrigger] = useState('');
  const [manifestation, setManifestation] = useState('');
  const [onset, setOnset] = useState('');
  const [genetic, setGenetic] = useState('');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigate = useNavigate();

  const allergyTypes = ['Food', 'Medication', 'Environmental', 'Skin'];
  const severityLevels = ['Mild', 'Moderate', 'Severe'];
  const onsetOptions = ['Immediate', 'Delayed'];
  const geneticOptions = ['Yes', 'No', 'Not Known'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newAllergy = {
      type: allergyType,
      severityLevel,
      trigger,
      manifestation,
      onset,
      genetic,
    };

    try {
      const response = await fetch(`http://localhost:5000/patients/${patientId}/allergies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAllergy),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('New allergy created:', result);
        setSuccessModalOpen(true); // Open Success Modal on success
      } else {
        const errorData = await response.json();
        setModalContent(`Error: ${errorData.message}`);
        setErrorModalOpen(true);
      }
    } catch (error) {
      console.error('Error creating new allergy:', error);
      setModalContent('Server error while adding allergy.');
      setErrorModalOpen(true);
    }
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
        to={`/patients/allergies/${patientId}`}
        startIcon={<HealingIcon />}
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
        Back to Allergies Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: '50px', color: '#ff6f6f' }}>
        Add a New Allergy
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
          overflow: 'hidden', // Prevents overflow issues
          boxSizing: 'border-box', // Ensures padding and border do not affect width
        }}
        onSubmit={handleSubmit}
      >
        {/* Allergy Type Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Allergy Type
          </Typography>
          <TextField
            select
            value={allergyType}
            onChange={(e) => setAllergyType(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HealingIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {allergyTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
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
                  <PriorityHighIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
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

        {/* Trigger Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Trigger
          </Typography>
          <TextField
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WhatshotIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          />
        </FormControl>

        {/* Manifestation Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Manifestation
          </Typography>
          <TextField
            value={manifestation}
            onChange={(e) => setManifestation(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SentimentDissatisfiedIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          />
        </FormControl>

        {/* Onset Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Onset
          </Typography>
          <TextField
            select
            value={onset}
            onChange={(e) => setOnset(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {onsetOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Genetic Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Genetic?
          </Typography>
          <TextField
            select
            value={genetic}
            onChange={(e) => setGenetic(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LineWeightIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {geneticOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Allergy
        </Button>
      </Box>

      {/* Success Modal */}
      <HICSuccessModal
        open={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          navigate('/allergies'); // Redirect after closing the modal
        }}
        title="Allergy Created"
        content="Allergy has been successfully created."
        actions={[
          {
            label: 'View Allergies',
            onClick: () => navigate(`/patient/allergies/view/${patientId}`),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />

      <HICErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Error"
        content={modalContent}
        actions={[
          {
            label: 'Close',
            onClick: () => setErrorModalOpen(false),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />  
    </Box>
  );
};

export default NewAllergy;
