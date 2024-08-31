import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Box, Typography, IconButton, TextField, Button,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal'; // Add this import if you have a success modal component
import axios from 'axios';
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

const UpdateMedicationModal = ({ open, onClose, medication, onUpdate }) => {
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [condition, setCondition] = useState('');
  const [provider, setProvider] = useState('');
  const [status, setStatus] = useState('');

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (medication) {
      setName(medication.name || '');
      setDose(medication.dose || '');
      setFrequency(medication.frequency || '');
      setQuantity(medication.quantity || '');
      setType(medication.type || '');
      setCondition(medication.condition || '');
      setProvider(medication.provider || '');
      setStatus(medication.status || '');
    }
  }, [medication]);

  const medicationTypes = ['allergy', 'disease', 'wellness'];
  const statuses = ['on-going', 'on-pause', 'cancelled'];
  const providers = ['Cardiologist - Andrei Dumitru', 'Dermatologist - Elena Ionescu', 'Oncologist - Ioan Popescu', 'General practitioner - Alex Matei', 'Endocrinologist - Maria Popescu'];

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`/patients/66cb68934f5769ec17d174a9/medications/${medication._id}`, {
        name,
        dose,
        frequency,
        quantity,
        type,
        condition,
        provider,
        status,
      });

      if (response.status === 200) {
        setSuccessModalOpen(true);
      }
    } catch (error) {
      console.error('Error updating medication:', error);
      setErrorModalContent('Server error while updating medication');
      setErrorModalOpen(true);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <CustomBox>
          <Header>
            <Typography variant="h6" color="#6faaff">
              Update Medication
            </Typography>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </Header>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Dose"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                label="Type"
              >
                {medicationTypes.map((medicationType) => (
                  <MenuItem key={medicationType} value={medicationType}>
                    {medicationType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Provider</InputLabel>
              <Select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                label="Provider"
              >
                {providers.map((providerOption) => (
                  <MenuItem key={providerOption} value={providerOption}>
                    {providerOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                {statuses.map((statusOption) => (
                  <MenuItem key={statusOption} value={statusOption}>
                    {statusOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
                transform: 'none',
              }}
            >
              Update Medication
            </Button>
          </Box>
        </CustomBox>
      </Modal>

      {/* Success Modal */}
      <HICSuccessModal
        open={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          onClose(); // Close the main modal
        }}
        title="Success"
        content="Medication updated successfully"
        actions={[
          {
            label: 'View Medications',
            onClick: () => {
              setSuccessModalOpen(false);
              navigate('/medications/view');
            },
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
    </>
  );
};

UpdateMedicationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  medication: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateMedicationModal;