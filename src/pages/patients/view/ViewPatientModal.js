import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import LanguageIcon from '@mui/icons-material/Language';
import HeightIcon from '@mui/icons-material/Height';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import CakeIcon from '@mui/icons-material/Cake';

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
  maxHeight: '80vh', // Ensure the modal is smaller than the screen height
  border: '4px solid #6faaff',
  display: 'flex',
  flexDirection: 'column',
}));

const ScrollContainer = styled(Box)({
  overflowY: 'auto', // Enable scrolling
  maxHeight: '100%', // Allow full height for scrolling
});

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

const ViewPatientModal = ({ open, onClose, patient }) => {
  if (!patient) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <ScrollContainer>
          <Header>
            <Typography variant="h6" color="#6faaff">
              Patient Details
            </Typography>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </Header>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="First Name"
              variant="outlined"
              value={patient.firstName}
              InputProps={{
                startAdornment: <PersonIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={patient.lastName}
              InputProps={{
                startAdornment: <PersonIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Username"
              variant="outlined"
              value={patient.username}
              InputProps={{
                startAdornment: <PersonIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Birth Date"
              variant="outlined"
              value={patient.birthDate}
              InputProps={{
                startAdornment: <CakeIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Occupation"
              variant="outlined"
              value={patient.occupation}
              InputProps={{
                startAdornment: <WorkIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              value={patient.email}
              InputProps={{
                startAdornment: <EmailIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              value={patient.phoneNumber}
              InputProps={{
                startAdornment: <PhoneIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Blood Type"
              variant="outlined"
              value={patient.bloodType}
              InputProps={{
                startAdornment: <BloodtypeIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Principal Language"
              variant="outlined"
              value={patient.principalLanguage}
              InputProps={{
                startAdornment: <LanguageIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Height (cm)"
              variant="outlined"
              value={patient.height}
              InputProps={{
                startAdornment: <HeightIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Weight (kg)"
              variant="outlined"
              value={patient.weight}
              InputProps={{
                startAdornment: <FitnessCenterIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Last Blood Pressure Systolic"
              variant="outlined"
              value={patient.lastBloodPressureSystolic}
              InputProps={{
                startAdornment: <MonitorHeartIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Last Blood Pressure Diastolic"
              variant="outlined"
              value={patient.lastBloodPressureDiastolic}
              InputProps={{
                startAdornment: <MonitorHeartIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Smoking Status"
              variant="outlined"
              value={patient.smokingStatus}
              InputProps={{
                startAdornment: <SmokingRoomsIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Creation Date"
              variant="outlined"
              value={patient.creationDate}
              InputProps={{
                startAdornment: <CalendarTodayIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Update Date"
              variant="outlined"
              value={patient.updateDate}
              InputProps={{
                startAdornment: <HistoryIcon style={iconStyle} />,
                readOnly: true,
              }}
              fullWidth
            />
          </Box>
        </ScrollContainer>
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

ViewPatientModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    index: PropTypes.number,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    birthDate: PropTypes.string,
    occupation: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    bloodType: PropTypes.string,
    principalLanguage: PropTypes.string,
    height: PropTypes.number,
    weight: PropTypes.number,
    lastBloodPressureSystolic: PropTypes.number,
    lastBloodPressureDiastolic: PropTypes.number,
    smokingStatus: PropTypes.string,
  }),
};

ViewPatientModal.defaultProps = {
  patient: null,
};

export default ViewPatientModal;