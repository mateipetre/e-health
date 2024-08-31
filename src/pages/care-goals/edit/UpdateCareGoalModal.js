import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Box, Typography, IconButton, TextField, Button,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal';

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

const UpdateCareGoalModal = ({ open, onClose, careGoal, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState('');
  
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalContent, setSuccessModalContent] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (careGoal) {
      setName(careGoal.name || '');
      setDescription(careGoal.description || '');
      setDuration(careGoal.duration || '');
      setType(careGoal.type || '');
      setStatus(careGoal.status || '');
    }
  }, [careGoal]);

  const types = ['Prevention', 'Treatment'];
  const statuses = ['On-going', 'Stopped', 'On-pause'];
  const durationOptions = ['Few Days', 'Few Weeks', 'Few Months', 'Few Years', 'Permanent'];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCareGoal = {
      ...careGoal,
      name,
      description,
      duration,
      type,
      status,
    };

    try {
      const response = await axios.put(`/patients/66cb68934f5769ec17d174a9/careGoals/${careGoal._id}`, updatedCareGoal);

      if (response.status === 200) {
        setSuccessModalContent('Care goal updated successfully!');
        setSuccessModalOpen(true);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error updating care goal:', error);
      setErrorModalContent('Failed to update care goal. Please try again.');
      setErrorModalOpen(true);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <CustomBox>
          <Header>
            <Typography variant="h6" color="#6faaff">
              Update Care Goal
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
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Duration</InputLabel>
              <Select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                label="Duration"
              >
                {durationOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
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
                transform: 'none'
              }}
            >
              Update Care Goal
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
            label: 'View Care Goals',
            onClick: () => {
              setSuccessModalOpen(false);
              navigate('/care-goals/view');
            },
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </>
  );
};

UpdateCareGoalModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  careGoal: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default UpdateCareGoalModal;