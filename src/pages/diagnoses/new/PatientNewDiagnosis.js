import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, FormControl, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import CodeIcon from '@mui/icons-material/Code';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LoopIcon from '@mui/icons-material/Loop';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal';

const NewDiagnosis = () => {
  const { patientId } = useParams();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [code, setCode] = useState('');
  const [cause, setCause] = useState('');
  const [recurrent, setRecurrent] = useState('');
  const [infectious, setInfectious] = useState('');
  const [principalSymptom, setPrincipalSymptom] = useState('');

  const navigate = useNavigate();

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('Diagnosis successfully added!');

  // Possible values for selection fields
  const diagnosisTypes = ['Normal', 'Acute', 'Chronic'];
  const recurrentOptions = ['Yes', 'No', 'Not Known'];
  const infectiousOptions = ['Yes', 'No', 'Not Known'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDiagnosis = {
      name,
      type,
      code,
      cause,
      recurrent,
      infectious,
      principalSymptom,
    };

    try {
      await axios.post(`/patients/${patientId}/diagnoses`, newDiagnosis);
      setSuccessMessage('Diagnosis successfully added!'); // Set success message here
      setSuccessModalOpen(true);
    } catch (error) {
      console.error('Error adding new diagnosis:', error);
      setErrorMessage('Failed to add the diagnosis. Please try again.');
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
        to={`/patients/diagnoses/${patientId}`}
        startIcon={<LocalHospitalIcon />}
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
        Back to Diagnoses Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: '50px', color: '#ff6f6f' }}>
        Add a New Diagnosis
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
            Diagnosis Name
          </Typography>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HealingIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          />
        </FormControl>

        {/* Diagnosis Type Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Diagnosis Type
          </Typography>
          <TextField
            select
            value={type}
            onChange={(e) => setType(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssessmentIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {diagnosisTypes.map((typeOption) => (
              <MenuItem key={typeOption} value={typeOption}>
                {typeOption}
              </MenuItem>
            ))}
          </TextField>
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
                  <CodeIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          />
        </FormControl>

        {/* Cause Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Cause
          </Typography>
          <TextField
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
            sx={{ boxSizing: 'border-box' }}
          />
        </FormControl>

        {/* Recurrent Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Recurrent
          </Typography>
          <TextField
            select
            value={recurrent}
            onChange={(e) => setRecurrent(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LoopIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {recurrentOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Infectious Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Infectious
          </Typography>
          <TextField
            select
            value={infectious}
            onChange={(e) => setInfectious(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CoronavirusIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {infectiousOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Principal Symptom Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Principal Symptom
          </Typography>
          <TextField
            value={principalSymptom}
            onChange={(e) => setPrincipalSymptom(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SentimentDissatisfiedIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{
            backgroundColor: '#ff6f6f',
            '&:hover': {
              backgroundColor: '#e64a19',
            },
          }}
        >
          Add Diagnosis
        </Button>
      </Box>

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

      {/* Success Modal */}
      <HICSuccessModal
        open={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          navigate(`/patients/diagnoses/${patientId}`); // Redirect after closing the modal
        }}
        title="Success"
        content={successMessage}
        actions={[
          {
            label: 'View Diagnoses',
            onClick: () => navigate(`/patients/diagnoses/view/${patientId}`),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </Box>
  );
};

export default NewDiagnosis;