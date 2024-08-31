import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Box, Typography, IconButton, Button,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'; // Import axios
import HICErrorModal from '../../../../components/HICErrorModal';
import HICSuccessModal from '../../../../components/HICSuccessModal'; // Import HICSuccessModal

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

const UpdateAppointmentModal = ({ open, onClose, appointment, onUpdate }) => {
  const [visitType, setVisitType] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false); // Add state for success modal
  const [successModalContent, setSuccessModalContent] = useState(''); // Add content for success modal
  const [appointmentId, setAppointmentId] = useState('');

  useEffect(() => {
    if (appointment) {
      setVisitType(appointment.visitType || '');
      setDuration(appointment.duration || '');
      setStatus(appointment.status || '');
      setAppointmentId(appointment._id);
    }
  }, [appointment]);

  const visitTypes = ['Urgent', 'Follow-up', 'New Symptom'];
  const durations = [30, 45, 60];
  const statuses = ['Pending', 'Confirmed', 'Cancelled', 'Done'];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedAppointment = {
      visitType,
      duration,
      status,
    };

    try {
      await axios.put(`http://localhost:5000/appointments/${appointmentId}`, updatedAppointment);
      setSuccessModalContent('Appointment successfully updated.');
      setSuccessModalOpen(true);
      onUpdate(updatedAppointment); // Notify parent component of update
      onClose();
    } catch (error) {
      setErrorModalContent('Error updating the appointment. Please try again.');
      setErrorModalOpen(true);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <CustomBox>
          <Header>
            <Typography variant="h6" color="#6faaff">
              Update Appointment
            </Typography>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </Header>
          <Box sx={{ marginBottom: '50px'}}></Box>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Select Visit Type</InputLabel>
              <Select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
                label="Visit Type"
              >
                {visitTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Duration (minutes)</InputLabel>
              <Select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                label="Duration"
              >
                {durations.map((dur) => (
                  <MenuItem key={dur} value={dur}>
                    {dur} minutes
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
                {statuses.map((stat) => (
                  <MenuItem key={stat} value={stat}>
                    {stat}
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
                  backgroundColor: '#e64a19 ',
                },
                maxWidth: '200px',
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                transform: 'none'
              }}
            >
              Update appointment
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
        onClose={() => setSuccessModalOpen(false)}
        title="Success"
        content={successModalContent}
        actions={[
          {
            label: 'OK',
            onClick: () => setSuccessModalOpen(false),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </>
  );
};

UpdateAppointmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointment: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateAppointmentModal;