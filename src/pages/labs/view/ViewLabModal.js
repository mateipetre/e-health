import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Icon for Test Name
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Icon for Creation Date
import HistoryIcon from '@mui/icons-material/History'; // Icon for Update Date
import CodeIcon from '@mui/icons-material/Code'; // Icon for Code
import ScheduleIcon from '@mui/icons-material/Schedule'; // Icon for Date
import AssessmentIcon from '@mui/icons-material/Assessment'; // Icon for Result
import HdrWeakIcon from '@mui/icons-material/HdrWeak'; // Icon for Unit
import PersonIcon from '@mui/icons-material/Person'; // Icon for Patient Name
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'; // Icon for Status

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

const ViewLabModal = ({ open, onClose, lab }) => {
  if (!lab) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Typography variant="h6" color="#6faaff">
            Lab Test Details
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Patient Name"
            variant="outlined"
            value={lab.patientName}
            InputProps={{
              startAdornment: <PersonIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Test Name"
            variant="outlined"
            value={lab.testName}
            InputProps={{
              startAdornment: <LocalHospitalIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Result"
            variant="outlined"
            value={lab.result}
            InputProps={{
              startAdornment: <AssessmentIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Unit"
            variant="outlined"
            value={lab.unit}
            InputProps={{
              startAdornment: <HdrWeakIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Creation Date"
            variant="outlined"
            value={lab.creationDate}
            InputProps={{
              startAdornment: <CalendarTodayIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Update Date"
            variant="outlined"
            value={lab.updateDate}
            InputProps={{
              startAdornment: <HistoryIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Date"
            variant="outlined"
            value={lab.date}
            InputProps={{
              startAdornment: <ScheduleIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Code"
            variant="outlined"
            value={lab.code}
            InputProps={{
              startAdornment: <CodeIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Status"
            variant="outlined"
            value={lab.status}
            InputProps={{
              startAdornment: <PriorityHighIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Recurrent"
            variant="outlined"
            value={lab.recurrent}
            InputProps={{
              startAdornment: <PriorityHighIcon style={iconStyle} />,
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

ViewLabModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  lab: PropTypes.shape({
    patientName: PropTypes.string,
    testName: PropTypes.string,
    result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    unit: PropTypes.string,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
    date: PropTypes.string,
    code: PropTypes.string,
    status: PropTypes.string,
    recurrent: PropTypes.string,
  }),
};

ViewLabModal.defaultProps = {
  lab: null,
};

export default ViewLabModal;