import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, FormControl, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HdrWeakIcon from '@mui/icons-material/HdrWeak';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CodeIcon from '@mui/icons-material/Code';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal';

const patientNames = ['Ion Popescu', 'Maria Ionescu', 'Andrei Georgescu', 'Elena Dumitrescu', 'Petre Matei'];

const NewLab = () => {
  const [testName, setTestName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [result, setResult] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const [recurrent, setRecurrent] = useState('');
  
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const statusOptions = ['Need Result', 'Done'];
  const recurrentOptions = ['Yes', 'No', 'Not Known'];

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newLab = {
      testName: testName,
      patientName: patientName,
      result,
      unit,
      date,
      code,
      status,
      recurrent,
    };

    try {
      const response = await axios.post(`/doctors/66cbb31025bfefa0333b2882/labs`, newLab);  // Replace DOCTOR_ID with the actual doctor ID
      if (response.status === 201) {
        setSuccessModalOpen(true);
      }
    } catch (error) {
      console.error('Error adding new lab:', error);
      setErrorModalOpen(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    navigate('/labs/view');
  };

  return (
    <Box sx={{ padding: '20px', boxSizing: 'border-box', maxWidth: '2100px' }}>
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
        <img src="/logo-no-background.png" alt="Logo" style={{ height: '35px' }} />
      </Button>

      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/labs"
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
        Back to Labs Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: '50px', color: '#ff6f6f' }}>
        Add a New Lab Test
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
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Test Name
          </Typography>
          <TextField
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalHospitalIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          />
        </FormControl>

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
            {patientNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Result
          </Typography>
          <TextField
            value={result}
            onChange={(e) => setResult(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssessmentIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Unit
          </Typography>
          <TextField
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HdrWeakIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Date
          </Typography>
          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ScheduleIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          />
        </FormControl>

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
                  <PriorityHighIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

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
                  <PriorityHighIcon />
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#6faaff',
            '&:hover': {
              backgroundColor: '#005bb5',
            },
          }}
        >
          Submit
        </Button>
      </Box>

      {/* Success Modal */}
      <HICSuccessModal
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Success"
        content="The lab test has been successfully added."
        actions={[
          {
            label: 'View labs',
            onClick: handleCloseSuccessModal,
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
        content="There was an error adding the lab test. Please try again."
      />
    </Box>
  );
};

export default NewLab;