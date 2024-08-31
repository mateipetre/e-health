import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Box, Typography, IconButton, TextField, Button,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal';
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

const UpdateIncidentModal = ({ open, onClose, incident, onUpdate }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [severityLevel, setSeverityLevel] = useState('');
  const [cause, setCause] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (incident) {
      setName(incident.name || '');
      setType(incident.type || '');
      setSeverityLevel(incident.severityLevel || '');
      setCause(incident.cause || '');
      setDescription(incident.description || '');
      setStatus(incident.status || '');
    }
  }, [incident]);

  const incidentTypes = ['data breach', 'system outage', 'unauthorized access', 'misdiagnosis', 'other'];
  const severityLevels = ['minor', 'medium', 'critical'];
  const causes = ['malfunction', 'human error', 'cyberattack', 'procedural failures'];
  const statuses = ['waiting_for_resolution', 'unresolved', 'resolved', 'waiting_for_response'];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedIncident = {
      ...incident,
      name,
      type,
      severityLevel: severityLevel,
      cause,
      description,
      status,
    };

    try {
      const response = await axios.put(`/doctors/66cbb31025bfefa0333b2882/incidents/${incident._id}`, updatedIncident); 
      if (response.status === 200) {
        setSuccessModalOpen(true);
      }
    } catch (error) {
      console.error('Error updating incident:', error);
      setErrorModalContent('Server error while updating incident');
      setErrorModalOpen(true);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <CustomBox>
          <Header>
            <Typography variant="h6" color="#6faaff">
              Update Incident
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

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                label="Type"
              >
                {incidentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Severity Level</InputLabel>
              <Select
                value={severityLevel}
                onChange={(e) => setSeverityLevel(e.target.value)}
                label="Severity Level"
              >
                {severityLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Cause</InputLabel>
              <Select
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                label="Cause"
              >
                {causes.map((cause) => (
                  <MenuItem key={cause} value={cause}>
                    {cause}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 3 }}
            />

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
                alignContent: 'center',
                justifyContent: 'center',
                transform: 'none'
              }}
            >
              Update Incident
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
          onClose(); // Close the update modal after success
        }}
        title="Success"
        content="Incident successfully updated."
        actions={[
          {
            label: 'View Incidents',
            onClick: () => {
              setSuccessModalOpen(false);
              navigate('/doctor/incidents/view');
            },
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </>
  );
};

UpdateIncidentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  incident: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateIncidentModal;