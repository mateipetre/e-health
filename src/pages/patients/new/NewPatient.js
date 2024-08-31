import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import LanguageIcon from '@mui/icons-material/Language';
import HeightIcon from '@mui/icons-material/Height';
import WeightIcon from '@mui/icons-material/FitnessCenter';
import axios from 'axios';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal';

const OCCUPATION_ENUM = {
  Employed: 'Employed Student',
  Student: 'Unemployed Student',
};

const SMOKING_STATUS_ENUM = {
  Smoker: 'Smoker',
  None: 'None',
};

const BLOOD_TYPE_ENUM = {
  O_PLUS: 'O+',
  O_MINUS: 'O-',
  A_PLUS: 'A+',
  A_MINUS: 'A-',
  B_PLUS: 'B+',
  B_MINUS: 'B-',
  AB_PLUS: 'AB+',
  AB_MINUS: 'AB-',
};

const NewPatient = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [principalLanguage, setPrincipalLanguage] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [lastBloodPressureSystolic, setLastBloodPressureSystolic] = useState('');
  const [lastBloodPressureDiastolic, setLastBloodPressureDiastolic] = useState('');
  const [smokingStatus, setSmokingStatus] = useState('');
  
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newPatient = {
      firstName,
      lastName,
      username,
      birthDate,
      occupation,
      email,
      phoneNumber,
      bloodType,
      principalLanguage,
      height,
      weight,
      lastBloodPressureSystolic,
      lastBloodPressureDiastolic,
      smokingStatus,
    };

    try {
      const response = await axios.post('/doctors/66cbb31025bfefa0333b2882/patients', newPatient);
      if (response.status === 201) {
        setSuccessModalOpen(true);
      }
    } catch (error) {
      console.error('Error adding new patient:', error);
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
        <img src="/logo-no-background.png" alt="Logo" style={{ height: '35px' }} />
      </Button>

      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/patients"
        startIcon={<PersonAddIcon />}
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
        Back to Patients Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: '50px', color: '#ff6f6f' }}>
        Add a New Patient
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
        }}
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            First Name
          </Typography>
          <TextField
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonAddIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Last Name
          </Typography>
          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonAddIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Username
          </Typography>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonAddIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Birth Date
          </Typography>
          <TextField
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Occupation
          </Typography>
          <TextField
            select
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.values(OCCUPATION_ENUM).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Email
          </Typography>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Phone Number
          </Typography>
          <TextField
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Blood Type
          </Typography>
          <TextField
            select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BloodtypeIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.values(BLOOD_TYPE_ENUM).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Principal Language
          </Typography>
          <TextField
            value={principalLanguage}
            onChange={(e) => setPrincipalLanguage(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Height (cm)
          </Typography>
          <TextField
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HeightIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Weight (kg)
          </Typography>
          <TextField
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WeightIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Last Blood Pressure (Systolic/Diastolic)
          </Typography>
          <TextField
            value={lastBloodPressureSystolic}
            onChange={(e) => setLastBloodPressureSystolic(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HeightIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Systolic"
            fullWidth
          />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
          <TextField
            value={lastBloodPressureDiastolic}
            onChange={(e) => setLastBloodPressureDiastolic(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HeightIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Diastolic"
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Smoking Status
          </Typography>
          <TextField
            select
            value={smokingStatus}
            onChange={(e) => setSmokingStatus(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HeightIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.values(SMOKING_STATUS_ENUM).map((option) => (
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
            backgroundColor: '#ff6f6f',
            '&:hover': {
              backgroundColor: '#e64a19',
            },
          }}
        >
          Add Patient
        </Button>
      </Box>

      {/* Error Modal */}
      <HICErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Error"
        content="An error occurred while adding the patient. Please try again."
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
        onClose={() => setSuccessModalOpen(false)}
        title="Success"
        content="Patient has been successfully added."
        actions={[
          {
            label: 'View patients',
            onClick: () => navigate('/patients/view'),
            variant: 'contained',
            color: 'primary',
          },
          {
            label: 'Add Another Patient',
            onClick: () => window.location.reload(),
            variant: 'outlined',
            color: 'primary',
          },
        ]}
      />
    </Box>
  );
};

export default NewPatient;