import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, FormControl, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import MedicationIcon from '@mui/icons-material/Medication';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import NotesIcon from '@mui/icons-material/Notes';
import PersonIcon from '@mui/icons-material/Person';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal'; // Import the success modal

const NewMedication = () => {
  const { patientId } = useParams();
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [condition, setCondition] = useState('');
  const [provider, setProvider] = useState('');

  const navigate = useNavigate();

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const medicationTypes = ['allergy', 'disease', 'wellness'];
  const providers = ['Cardiologist - Andrei Dumitru', 'Dermatologist - Elena Ionescu', 'Oncologist - Ioan Popescu', 'General practitioner - Alex Matei', 'Endocrinologist - Maria Popescu'];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newMedication = {
      name,
      dose,
      frequency,
      quantity,
      type,
      condition,
      provider,
    };

    try {
      const response = await axios.post(`/patients/${patientId}/medications`, newMedication);
      
      // If the request is successful, open the success modal
      if (response.status === 201) {
        setSuccessModalOpen(true);
      }
    } catch (error) {
      console.error('Error adding new medication:', error);
      setErrorMessage(error.response?.data?.message || 'Server error while adding medication');
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
        to={`/patients/medications/${patientId}`}
        startIcon={<MedicationIcon />}
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
        Back to Medications Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: '50px', color: '#ff6f6f' }}>
        Add a New Medication
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
        {/* Medication Name */}
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
                  <MedicationIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          />
        </FormControl>

        {/* Dose Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Dose
          </Typography>
          <TextField
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LineWeightIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          />
        </FormControl>

        {/* Frequency Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Frequency
          </Typography>
          <TextField
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          />
        </FormControl>

        {/* Quantity Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Quantity
          </Typography>
          <TextField
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NotesIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          />
        </FormControl>

        {/* Medication Type Select */}
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
                  <MedicationIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {medicationTypes.map((typeOption) => (
              <MenuItem key={typeOption} value={typeOption}>
                {typeOption.charAt(0).toUpperCase() + typeOption.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Condition Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Condition
          </Typography>
          <TextField
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NotesIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          />
        </FormControl>

        {/* Provider Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Provider
          </Typography>
          <TextField
            select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {providers.map((providerOption) => (
              <MenuItem key={providerOption} value={providerOption}>
                {providerOption}
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
          Add Medication
        </Button>
      </Box>

      {/* Success Modal */}
      <HICSuccessModal
        open={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          navigate(`/patients/medications/${patientId}`);
        }
        }
        title="Success"
        content="The medication has been successfully added."
        actions={[
          {
            label: 'View medications',
            onClick: () => navigate(`/patients/medications/view/${patientId}`),
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
        content={errorMessage}
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

export default NewMedication;