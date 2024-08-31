import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryIcon from '@mui/icons-material/History';

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

const StatusText = styled(Typography)(({ statusColor }) => ({
  color: statusColor,
  fontWeight: 'bold'
}));

const iconStyle = { marginRight: '8px' };

const statusColors = {
  Pending: '#f5c542', // Dark pastel yellow
  Confirmed: '#6faaff', // Dark pastel blue
  Done: '#4caf50', // Dark pastel green
  Cancelled: '#ff6f6f', // Dark pastel red
};

const ViewAppointmentModal = ({ open, onClose, appointment }) => {
  if (!appointment) return null;

  const statusColor = statusColors[appointment.status] || '#000';

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Typography variant="h6" color="#6faaff">
            Your Appointment
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Visit Type"
            variant="outlined"
            value={appointment.visitType}
            InputProps={{
              startAdornment: <DescriptionIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Creation Date"
            variant="outlined"
            value={appointment.creationDate}
            InputProps={{
              startAdornment: <CalendarTodayIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Update Date"
            variant="outlined"
            value={appointment.updateDate}
            InputProps={{
              startAdornment: <HistoryIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Doctor"
            variant="outlined"
            value={appointment.doctor}
            InputProps={{
              startAdornment: <PersonIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Date"
            variant="outlined"
            value={appointment.date}
            InputProps={{
              startAdornment: <CalendarTodayIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Starting Hour"
            variant="outlined"
            value={appointment.startingHour}
            InputProps={{
              startAdornment: <AccessTimeIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Duration"
            variant="outlined"
            value={`${appointment.duration} min`}
            InputProps={{
              startAdornment: <WatchLaterIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Meeting Room"
            variant="outlined"
            value={`${appointment.meetingRoomName}`}
            InputProps={{
              startAdornment: <MeetingRoomIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography variant="body1"><strong>Status:</strong></Typography>
            <StatusText statusColor={statusColor}>
              {appointment.status}
            </StatusText>
          </Box>
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

ViewAppointmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointment: PropTypes.shape({
    visitType: PropTypes.string,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
    doctor: PropTypes.string,
    date: PropTypes.string,
    startingHour: PropTypes.string,
    duration: PropTypes.number,
    status: PropTypes.string,
  }),
};

ViewAppointmentModal.defaultProps = {
  appointment: null,
};

export default ViewAppointmentModal;