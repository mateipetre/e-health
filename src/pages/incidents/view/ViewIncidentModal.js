import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // For Creation Date
import HistoryIcon from '@mui/icons-material/History'; // For Update Date
import InfoIcon from '@mui/icons-material/Info'; // For Description
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // For Severity Level
import CategoryIcon from '@mui/icons-material/Category'; // For Type
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; // For Cause
import TaskAltIcon from '@mui/icons-material/TaskAlt'; // For Status

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

const ViewIncidentModal = ({ open, onClose, incident }) => {
  if (!incident) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Typography variant="h6" color="#6faaff">
            Incident Details
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Name"
            variant="outlined"
            value={incident.name || ''}
            InputProps={{
              startAdornment: <InfoIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Type"
            variant="outlined"
            value={incident.type || ''}
            InputProps={{
              startAdornment: <CategoryIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            value={incident.description || ''}
            InputProps={{
              startAdornment: <InfoIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Severity Level"
            variant="outlined"
            value={incident.severityLevel || ''}
            InputProps={{
              startAdornment: <WarningAmberIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Cause"
            variant="outlined"
            value={incident.cause || ''}
            InputProps={{
              startAdornment: <ReportProblemIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Status"
            variant="outlined"
            value={incident.status || ''}
            InputProps={{
              startAdornment: <TaskAltIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Creation Date"
            variant="outlined"
            value={incident.creation_date || ''}
            InputProps={{
              startAdornment: <CalendarTodayIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Update Date"
            variant="outlined"
            value={incident.update_date || ''}
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

ViewIncidentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  incident: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    severityLevel: PropTypes.string,
    cause: PropTypes.string,
    status: PropTypes.string,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
  }),
};

ViewIncidentModal.defaultProps = {
  incident: null,
};

export default ViewIncidentModal;