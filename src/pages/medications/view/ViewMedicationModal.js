import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import MedicationIcon from '@mui/icons-material/Medication';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import NotesIcon from '@mui/icons-material/Notes'; // Icon for Condition
import PersonIcon from '@mui/icons-material/Person'; // Icon for Provider
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icon for Status

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

const ViewMedicationModal = ({ open, onClose, medication }) => {
  if (!medication) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Typography variant="h6" color="#6faaff">
            Medication Details
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Name"
            variant="outlined"
            value={medication.name}
            InputProps={{
              startAdornment: <MedicationIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Dose"
            variant="outlined"
            value={medication.dose}
            InputProps={{
              startAdornment: <LineWeightIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Frequency"
            variant="outlined"
            value={medication.frequency}
            InputProps={{
              startAdornment: <AccessTimeIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Quantity"
            variant="outlined"
            value={medication.quantity}
            InputProps={{
              startAdornment: <NotesIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Type"
            variant="outlined"
            value={medication.type}
            InputProps={{
              startAdornment: <MedicationIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Condition"
            variant="outlined"
            value={medication.condition}
            InputProps={{
              startAdornment: <NotesIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Provider"
            variant="outlined"
            value={medication.provider}
            InputProps={{
              startAdornment: <PersonIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Status"
            variant="outlined"
            value={medication.status}
            InputProps={{
              startAdornment: <CheckCircleIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Creation Date"
            variant="outlined"
            value={medication.creationDate}
            InputProps={{
              startAdornment: <CalendarTodayIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Update Date"
            variant="outlined"
            value={medication.updateDate}
            InputProps={{
              startAdornment: <HistoryIcon style={iconStyle} />,
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

ViewMedicationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  medication: PropTypes.shape({
    name: PropTypes.string,
    dose: PropTypes.string,
    frequency: PropTypes.string,
    quantity: PropTypes.string,
    type: PropTypes.string,
    condition: PropTypes.string,
    provider: PropTypes.string,
    status: PropTypes.string,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
  }),
};

ViewMedicationModal.defaultProps = {
  medication: null,
};

export default ViewMedicationModal;