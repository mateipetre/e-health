import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HealingIcon from '@mui/icons-material/Healing';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal'; // Import Success Modal
import CarePlanIcon from '@mui/icons-material/Assignment';
import axios from 'axios';

const NewCarePlan = () => {
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [type, setType] = useState('');
  const [pdfDocument, setPdfDocument] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const carePlanTypes = ['Permanent', 'Temporary'];
  const patientsNames = ['Ion Popescu', 'Maria Ionescu', 'Andrei Georgescu', 'Elena Dumitrescu', 'Petre Matei'];

  const navigate = useNavigate();

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadedPdf = file.name;
      setPdfDocument(`/care-plans/${uploadedPdf}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object
    const newCarePlan = {
      name,
      purpose,
      patientName,
      patientCondition,
      type,
      pdfDocument
    };

    try {
      // Send data to the server
      await axios.post('/doctors/66cbb31025bfefa0333b2882/care-plans', newCarePlan);
      setSuccessModalOpen(true); // Show success modal
    } catch (error) {
      console.error('Error adding new care plan record:', error);
      setErrorModalOpen(true); // Show error modal
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    navigate('/care-plans/view');
  };

  const handleCloseErrorModal = () => {
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
        to="/care-plans"
        startIcon={<CarePlanIcon />}
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
        Back to Care Plans Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: '50px', color: '#ff6f6f' }}>
        Create a New Care Plan
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
        {/* Care Plan Name */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Care Plan Name
          </Typography>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          />
        </FormControl>

        {/* Purpose */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Purpose
          </Typography>
          <TextField
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
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

        {/* Patient Name */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Patient Name
          </Typography>
          <TextField
            select
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {patientsNames.map((patientName) => (
              <MenuItem key={patientName} value={patientName}>
                {patientName}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Patient Condition */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Patient Condition
          </Typography>
          <TextField
            value={patientCondition}
            onChange={(e) => setPatientCondition(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LineWeightIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          />
        </FormControl>

        {/* Care Plan Type */}
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
                  <HealingIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {carePlanTypes.map((typeOption) => (
              <MenuItem key={typeOption} value={typeOption}>
                {typeOption}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* PDF Document Upload */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Upload PDF Document
          </Typography>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ boxSizing: 'border-box' }}
          >
            Upload File
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={handlePdfUpload}
            />
          </Button>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {pdfDocument}
            </Typography>
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
          Add Care Plan
        </Button>
      </Box>

      {/* Error Modal */}
      <HICErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Error"
        content="An error occurred while adding the care plan."
        actions={[
          {
            label: 'Close',
            onClick: handleCloseErrorModal,
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />

      {/* Success Modal */}
      <HICSuccessModal
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Success"
        content="Care Plan added successfully!"
        actions={[
          {
            label: 'Close',
            onClick: handleCloseSuccessModal,
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </Box>
  );
};

export default NewCarePlan;