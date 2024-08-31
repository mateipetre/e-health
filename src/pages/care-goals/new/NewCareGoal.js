import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import FlagIcon from '@mui/icons-material/Flag';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import CareGoalIcon from '@mui/icons-material/Stars';
import axios from 'axios';
import HICErrorModal from '../../../components/HICErrorModal'; // Ensure this can be used for error messages
import HICSuccessModal from '../../../components/HICSuccessModal'; // Assume you have a separate success modal component

const NewCareGoal = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('');

  // State variables for modals
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  // Options for select fields
  const durationOptions = ['Few Days', 'Few Weeks', 'Few Months', 'Few Years', 'Permanent'];
  const typeOptions = ['Prevention', 'Treatment'];

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newCareGoal = {
        name,
        description,
        duration,
        type,
      };

      // Replace with the actual patient ID
      const response = await axios.post(`/patients/66cb68934f5769ec17d174a9/careGoals`, newCareGoal);

      if (response.status === 201) {
        setModalMessage('Care goal added successfully!');
        setSuccessModalOpen(true);
        // Reset form fields after successful submission
        setName('');
        setDescription('');
        setDuration('');
        setType('');
      }
    } catch (error) {
      setModalMessage('An error occurred while adding the care goal.');
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
        to="/care-goals"
        startIcon={<CareGoalIcon />}
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
        Back to Care Goals Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: '50px', color: '#ff6f6f' }}>
        Add a New Care Goal
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
                  <FlagIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          />
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
                  <DescriptionIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          />
        </FormControl>

        {/* Duration Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Duration
          </Typography>
          <TextField
            select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {durationOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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
            sx={{ boxSizing: 'border-box' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {typeOptions.map((option) => (
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
          sx={{
            backgroundColor: '#ff6f6f',
            '&:hover': {
              backgroundColor: '#e64a19',
            },
          }}
        >
          Add Care Goal
        </Button>
      </Box>

      {/* Success Modal */}
      <HICSuccessModal
        open={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          navigate('/care-goals');
        }}
        title="Success"
        content={modalMessage}
        actions={[
          {
            label: 'View Care Goals',
            onClick: () => navigate('/care-goals/view'),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />

      {/* Error Modal */}
      <HICErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Error"
        content={modalMessage}
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

export default NewCareGoal;