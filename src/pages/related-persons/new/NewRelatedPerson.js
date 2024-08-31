import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, FormControl, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal';

const NewRelatedPerson = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [relation, setRelation] = useState('');
  const [patientName, setPatientName] = useState('');
  const [bloodRelative, setBloodRelative] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [bloodRh, setBloodRh] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [principalLanguage, setPrincipalLanguage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const navigate = useNavigate();

  // Options for dropdowns
  const bloodTypes = ['O', 'A', 'B', 'AB'];
  const bloodRhs = ['Positive', 'Negative'];
  const bloodRelatives = ['Yes', 'No', 'Not Known'];
  const patientNames = ['Ion Popescu', 'Maria Ionescu', 'Andrei Georgescu', 'Elena Dumitrescu', 'Petre Matei'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPerson = {
      firstName,
      lastName,
      relation,
      patientName,
      bloodRelative,
      bloodType,
      bloodRh,
      email,
      phoneNumber,
      principalLanguage,
    };

    try {
      // Replace DOCTOR_ID with the actual ID
      await axios.post('/doctors/66cbb31025bfefa0333b2882/relatedpersons', newPerson);
      setSuccessOpen(true);
      // Clear form fields
      setFirstName('');
      setLastName('');
      setRelation('');
      setPatientName('');
      setBloodRelative('');
      setBloodType('');
      setBloodRh('');
      setEmail('');
      setPhoneNumber('');
      setPrincipalLanguage('');
    } catch (error) {
      console.error('Error adding new related person:', error);
      setErrorOpen(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessOpen(false);
    navigate('/related-persons/view');
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
        to="/related-persons"
        startIcon={<PersonIcon />}
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
        Back to Related Persons Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: '50px', color: '#ff6f6f' }}>
        Add a New Related Person
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
        {/* First Name Input Field */}
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
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        {/* Last Name Input Field */}
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
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        {/* Relation Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Relation
          </Typography>
          <TextField
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FamilyRestroomIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>

        {/* Patient Name Select */}
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
            {patientNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Blood Relative Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Blood Relative
          </Typography>
          <TextField
            select
            value={bloodRelative}
            onChange={(e) => setBloodRelative(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FamilyRestroomIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {bloodRelatives.map((rel) => (
              <MenuItem key={rel} value={rel}>
                {rel}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Blood Type Select */}
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
            {bloodTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Blood Rh Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Blood Rh
          </Typography>
          <TextField
            select
            value={bloodRh}
            onChange={(e) => setBloodRh(e.target.value)}
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
            {bloodRhs.map((rh) => (
              <MenuItem key={rh} value={rh}>
                {rh}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Email Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Email
          </Typography>
          <TextField
            type="email"
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

        {/* Phone Number Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Phone Number
          </Typography>
          <TextField
            type="tel"
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

        {/* Principal Language Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Principal Language
          </Typography>
          <TextField
            type="lang"
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
          Add Related Person
        </Button>
      </Box>

      {/* Success Modal */}
      <HICSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Success"
        content="The related person was added successfully."
        actions={[
          {
            label: 'View related persons',
            onClick: handleCloseSuccessModal,
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />

      {/* Error Modal */}
      <HICErrorModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        title="Error"
        content="An error occurred while adding the related person."
        actions={[
          {
            label: 'Close',
            onClick: () => setErrorOpen(false),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </Box>
  );
};

export default NewRelatedPerson;