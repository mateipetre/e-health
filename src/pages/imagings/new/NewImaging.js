import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import RadiologyIcon from '@mui/icons-material/LocalHospital';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';
import LabelIcon from '@mui/icons-material/Label';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal';
import axios from 'axios';

const NewImaging = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [conditionSuspicion, setConditionSuspicion] = useState('');
  const [code, setCode] = useState('');
  const [patientName, setPatientName] = useState('');
  const [status, setStatus] = useState('');
  const [image, setimage] = useState(''); // State for image name
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const patientNames = ['Ion Popescu', 'Maria Ionescu', 'Andrei Georgescu', 'Elena Dumitrescu', 'Petre Matei'];
  const imagingTypes = ['radiography', 'computed tomography', 'fluoroscopy'];
  const statusTypes = ['Need Result', 'Done'];

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadedimageWithExtension = file.name;
       console.log(uploadedimageWithExtension);
      setimage(`/images/${uploadedimageWithExtension}`); // Set the image path string
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object
    const newImaging = {
      name,
      type,
      conditionSuspicion,
      code,
      patientName,
      image,
      status
    };

    try {
      // Send data to the server
      await axios.post('/doctors/66cbb31025bfefa0333b2882/imagings', newImaging);
      setSuccessModalOpen(true); // Show success modal
    } catch (error) {
      console.error('Error adding new imaging record:', error);
      setErrorModalOpen(true); // Show error modal
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    navigate('/imagings/view');
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
        to="/imaging"
        startIcon={<RadiologyIcon />}
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
        Back to Imaging Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: '50px', color: '#ff6f6f' }}>
        Add New Imaging
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
                  <InsertDriveFileIcon />
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
                  <RadiologyIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {imagingTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Condition Suspicion Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Condition Suspicion
          </Typography>
          <TextField
            value={conditionSuspicion}
            onChange={(e) => setConditionSuspicion(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LabelIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        {/* Code Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Code
          </Typography>
          <TextField
            value={code}
            onChange={(e) => setCode(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InsertDriveFileIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        {/* Patient Name Input Field */}
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
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {patientNames.map((patientName) => (
              <MenuItem key={patientName} value={patientName}>
                {patientName}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Status Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Status
          </Typography>
          <TextField
            select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ImageIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statusTypes.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Image Upload */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Image
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'block', width: '100%' }}
          />
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
          Add Imaging Data
        </Button>
      </Box>

      {/* Success Modal */}
      <HICSuccessModal
        open={successModalOpen}
        onClose={handleCloseSuccessModal}
        title="Success"
        content="The imaging data has been successfully added."
        actions={[
          {
            label: 'View imagings',
            onClick: handleCloseSuccessModal,
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />

      {/* Error Modal */}
      <HICErrorModal
        open={errorModalOpen}
        onClose={handleCloseErrorModal}
        title="Error"
        content="An error occurred while adding the imaging data."
        actions={[
          {
            label: 'Close',
            onClick: handleCloseErrorModal,
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </Box>
  );
};

export default NewImaging;