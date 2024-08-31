import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Modal, Box, Typography, IconButton, TextField, Button,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal'; // Import success modal
import { useNavigate } from 'react-router-dom';

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '600px',
  width: '100%',
  border: '4px solid #6faaff',
}));

const pastelRed = '#ff6f6f';

const Header = styled(Box)({
  borderBottom: '2px solid #e0e0e0',
  paddingBottom: '12px',
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CloseButton = styled(IconButton)({
  color: '#336699',
});

const UpdateDiagnosisModal = ({ open, onClose, diagnosis, onUpdate }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [code, setCode] = useState('');
  const [cause, setCause] = useState('');
  const [recurrent, setRecurrent] = useState('');
  const [infectious, setInfectious] = useState('');
  const [principalSymptom, setPrincipalSymptom] = useState('');
  
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState('');

  const [successModalOpen, setSuccessModalOpen] = useState(false); // State for success modal
  const [successModalContent, setSuccessModalContent] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (diagnosis) {
      setName(diagnosis.name || ''); 
      setType(diagnosis.type || '');
      setCode(diagnosis.code || '');
      setCause(diagnosis.cause || '');
      setRecurrent(diagnosis.recurrent || '');
      setInfectious(diagnosis.infectious || '');
      setPrincipalSymptom(diagnosis.principalSymptom || '');
    }
  }, [diagnosis]);

  const types = ['Normal', 'Acute', 'Chronic'];
  const recurrentOptions = ['Yes', 'No', 'Not Known'];
  const infectiousOptions = ['Yes', 'No', 'Not Known'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const updatedDiagnosis = {
      ...diagnosis,
      name,
      type,
      code,
      cause,
      recurrent,
      infectious,
      principalSymptom,
    };
  
    try {
      await axios.put(
        `/patients/66cb68934f5769ec17d174a9/diagnoses/${diagnosis._id}`,
        updatedDiagnosis
      );

      setSuccessModalContent('Diagnosis updated successfully!');
      setSuccessModalOpen(true);
    } catch (error) {
      console.error('Error updating diagnosis:', error);
      setErrorModalContent('Failed to update the diagnosis. Please try again.');
      setErrorModalOpen(true);
    }
  };  

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <CustomBox>
          <Header>
            <Typography variant="h6" color="#6faaff">
              Update Diagnosis
            </Typography>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </Header>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Diagnosis Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                label="Type"
              >
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Cause"
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Recurrent</InputLabel>
              <Select
                value={recurrent}
                onChange={(e) => setRecurrent(e.target.value)}
                label="Recurrent"
              >
                {recurrentOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Infectious</InputLabel>
              <Select
                value={infectious}
                onChange={(e) => setInfectious(e.target.value)}
                label="Infectious"
              >
                {infectiousOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Principal Symptom"
              value={principalSymptom}
              onChange={(e) => setPrincipalSymptom(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: pastelRed,
                '&:hover': {
                  backgroundColor: '#e64a19',
                },
                maxWidth: '200px',
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                transform: 'none'
              }}
            >
              Update Diagnosis
            </Button>
          </Box>
        </CustomBox>
      </Modal>

      {/* Error Modal */}
      <HICErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Error"
        content={errorModalContent}
        actions={[
          {
            label: 'OK',
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
          onClose(); // Close the main modal
        }}
        title="Success"
        content={successModalContent}
        actions={[
          {
            label: 'View Diagnoses',
            onClick: () => {
              setSuccessModalOpen(false);
              navigate('/diagnoses/view')
            },
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </>
  );
};

UpdateDiagnosisModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  diagnosis: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateDiagnosisModal;