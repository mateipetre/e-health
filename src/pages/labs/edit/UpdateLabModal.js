import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Box, Typography, IconButton, TextField, Button,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import HICErrorModal from '../../../components/HICErrorModal';

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

const UpdateAllergyModal = ({ open, onClose, allergy, onUpdate }) => {
  const [type, setType] = useState('');
  const [severityLevel, setSeverityLevel] = useState('');
  const [trigger, setTrigger] = useState('');
  const [manifestation, setManifestation] = useState('');
  const [onset, setOnset] = useState('');
  const [genetic, setGenetic] = useState('');

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorModalContent] = useState('');

  useEffect(() => {
    if (allergy) {
      setType(allergy.type || '');
      setSeverityLevel(allergy.severityLevel || '');
      setTrigger(allergy.trigger || '');
      setManifestation(allergy.manifestation || '');
      setOnset(allergy.onset || '');
      setGenetic(allergy.genetic || '');
    }
  }, [allergy]);

  const types = ['Medication', 'Food', 'Environmental', 'Skin'];
  const severityLevels = ['Severe', 'Moderate', 'Mild'];
  const onsets = ['Immediate', 'Delayed'];
  const geneticOptions = ['Yes', 'No', 'Not Known'];

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Add your validation logic here if needed

    const updatedAllergy = {
      ...allergy,
      type,
      severityLevel,
      trigger,
      manifestation,
      onset,
      genetic,
    };

    onUpdate(updatedAllergy);
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <CustomBox>
          <Header>
            <Typography variant="h6" color="#6faaff">
              Update Allergy
            </Typography>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </Header>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit}>
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

            <TextField
              fullWidth
              label="Trigger"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Manifestation"
              value={manifestation}
              onChange={(e) => setManifestation(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Onset</InputLabel>
              <Select
                value={onset}
                onChange={(e) => setOnset(e.target.value)}
                label="Onset"
              >
                {onsets.map((onset) => (
                  <MenuItem key={onset} value={onset}>
                    {onset}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Genetic</InputLabel>
              <Select
                value={genetic}
                onChange={(e) => setGenetic(e.target.value)}
                label="Genetic"
              >
                {geneticOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
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
              Update Allergy
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
    </>
  );
};

UpdateAllergyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  allergy: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateAllergyModal;
