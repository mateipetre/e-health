import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import HealingIcon from '@mui/icons-material/Healing';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'; // Icon for Manifestation

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

const ViewAllergyModal = ({ open, onClose, allergy }) => {
  if (!allergy) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Typography variant="h6" color="#6faaff">
            Allergy Details
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Allergy Type"
            variant="outlined"
            value={allergy.type}
            InputProps={{
              startAdornment: <HealingIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Severity Level"
            variant="outlined"
            value={allergy.severityLevel}
            InputProps={{
              startAdornment: <PriorityHighIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Trigger"
            variant="outlined"
            value={allergy.trigger}
            InputProps={{
              startAdornment: <WhatshotIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Manifestation"
            variant="outlined"
            value={allergy.manifestation}
            InputProps={{
              startAdornment: <SentimentDissatisfiedIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Creation Date"
            variant="outlined"
            value={allergy.creationDate}
            InputProps={{
              startAdornment: <CalendarTodayIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Update Date"
            variant="outlined"
            value={allergy.updateDate}
            InputProps={{
              startAdornment: <HistoryIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Onset"
            variant="outlined"
            value={allergy.onset}
            InputProps={{
              startAdornment: <AccessTimeIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Genetic"
            variant="outlined"
            value={allergy.genetic}
            InputProps={{
              startAdornment: <LineWeightIcon style={iconStyle} />,
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

ViewAllergyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  allergy: PropTypes.shape({
    type: PropTypes.string,
    severityLevel: PropTypes.string,
    trigger: PropTypes.string,
    manifestation: PropTypes.string,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
    onset: PropTypes.string,
    genetic: PropTypes.string,
  }),
};

ViewAllergyModal.defaultProps = {
  allergy: null,
};

export default ViewAllergyModal;