import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import HealingIcon from '@mui/icons-material/Healing'; // You might need to change this icon
import CodeIcon from '@mui/icons-material/Code'; // New icon for code
import CauseIcon from '@mui/icons-material/LocalHospital'; // New icon for cause
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Reused icon for Recurrent
import UpdateIcon from '@mui/icons-material/History'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // New icon for Infectious
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'; // New icon for Principal Symptom

// Custom styled components
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
  border: '4px solid #6faaff', // Darker blue pastel border
}));

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

const iconStyle = { marginRight: '8px' };

const ViewDiagnosisModal = ({ open, onClose, diagnosis }) => {
  if (!diagnosis) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Typography variant="h6" color="#6faaff">
            Diagnosis Details
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Diagnosis Type"
            variant="outlined"
            value={diagnosis.type}
            InputProps={{
              startAdornment: <HealingIcon style={iconStyle} />, // Adjust icon as necessary
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Code"
            variant="outlined"
            value={diagnosis.code}
            InputProps={{
              startAdornment: <CodeIcon style={iconStyle} />, // New icon for code
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Cause"
            variant="outlined"
            value={diagnosis.cause}
            InputProps={{
              startAdornment: <CauseIcon style={iconStyle} />, // New icon for cause
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Recurrent"
            variant="outlined"
            value={diagnosis.recurrent}
            InputProps={{
              startAdornment: <AccessTimeIcon style={iconStyle} />, // Reused icon for Recurrent
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Infectious"
            variant="outlined"
            value={diagnosis.infectious}
            InputProps={{
              startAdornment: <LocalHospitalIcon style={iconStyle} />, // New icon for Infectious
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Principal Symptom"
            variant="outlined"
            value={diagnosis.principalSymptom}
            InputProps={{
              startAdornment: <EmojiNatureIcon style={iconStyle} />, // New icon for Principal Symptom
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Creation Date"
            variant="outlined"
            value={diagnosis.creationDate}
            InputProps={{
              startAdornment: <AccessTimeIcon style={iconStyle} />, // Reused icon for Creation Date
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Update Date"
            variant="outlined"
            value={diagnosis.updateDate}
            InputProps={{
              startAdornment: <UpdateIcon style={iconStyle} />, // Reused icon for Update Date
              readOnly: true,
            }}
            fullWidth
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            sx={{ borderRadius: '50px', textTransform: 'none', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)' }}
          >
            Close
          </Button>
        </Box>
      </CustomBox>
    </Modal>
  );
};

ViewDiagnosisModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  diagnosis: PropTypes.shape({
    type: PropTypes.string,
    code: PropTypes.string,
    cause: PropTypes.string,
    recurrent: PropTypes.string,
    infectious: PropTypes.string,
    principalSymptom: PropTypes.string,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
  }),
};

ViewDiagnosisModal.defaultProps = {
  diagnosis: null,
};

export default ViewDiagnosisModal;