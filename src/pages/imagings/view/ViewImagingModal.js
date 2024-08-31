import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import HealingIcon from '@mui/icons-material/Healing'; // For Condition Suspicion
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // For Creation Date
import UpdateIcon from '@mui/icons-material/Update'; // For Update Date
import DescriptionIcon from '@mui/icons-material/Description'; // For Name
import CodeIcon from '@mui/icons-material/Code'; // For Code
import PersonIcon from '@mui/icons-material/Person'; // For Patient Name
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; // For Status

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

const ViewImagingModal = ({ open, onClose, imaging }) => {
  if (!imaging) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Typography variant="h6" color="#6faaff">
            Imaging Details
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Name"
            variant="outlined"
            value={imaging.name}
            InputProps={{
              startAdornment: <DescriptionIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Type"
            variant="outlined"
            value={imaging.type}
            InputProps={{
              startAdornment: <HealingIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Condition Suspicion"
            variant="outlined"
            value={imaging.conditionSuspicion}
            InputProps={{
              startAdornment: <HealingIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Code"
            variant="outlined"
            value={imaging.code}
            InputProps={{
              startAdornment: <CodeIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Patient Name"
            variant="outlined"
            value={imaging.patientName}
            InputProps={{
              startAdornment: <PersonIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Creation Date"
            variant="outlined"
            value={imaging.creationDate}
            InputProps={{
              startAdornment: <CalendarTodayIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Update Date"
            variant="outlined"
            value={imaging.updateDate}
            InputProps={{
              startAdornment: <UpdateIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Status"
            variant="outlined"
            value={imaging.status}
            InputProps={{
              startAdornment: <AssignmentTurnedInIcon style={iconStyle} />,
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

ViewImagingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imaging: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    conditionSuspicion: PropTypes.string,
    code: PropTypes.string,
    patientName: PropTypes.string,
    image: PropTypes.string,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
    status: PropTypes.string,
  }),
};

ViewImagingModal.defaultProps = {
  imaging: null,
};

export default ViewImagingModal;