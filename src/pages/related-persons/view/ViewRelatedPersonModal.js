import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import BadgeIcon from '@mui/icons-material/Badge';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';

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
  border: '4px solid #6faaff', // Dark Blue border for consistency
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
  color: '#003366',
});

const iconStyle = { marginRight: '8px' };

const ViewRelatedPersonModal = ({ open, onClose, person }) => {
  if (!person) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Typography variant="h6" color="#003366">
            Related Person Details
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="First Name"
            variant="outlined"
            value={person.firstName}
            InputProps={{
              startAdornment: <PersonIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={person.lastName}
            InputProps={{
              startAdornment: <BadgeIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Relation"
            variant="outlined"
            value={person.relation}
            InputProps={{
              startAdornment: <FamilyRestroomIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Patient Name"
            variant="outlined"
            value={person.patientName}
            InputProps={{
              startAdornment: <PersonIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Blood Relative"
            variant="outlined"
            value={person.bloodRelative}
            InputProps={{
              startAdornment: <FamilyRestroomIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Blood Type"
            variant="outlined"
            value={person.bloodType}
            InputProps={{
              startAdornment: <BloodtypeIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Blood Rh"
            variant="outlined"
            value={person.bloodRh}
            InputProps={{
              startAdornment: <BloodtypeIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Creation Date"
            variant="outlined"
            value={person.creationDate}
            InputProps={{
              startAdornment: <CalendarTodayIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Update Date"
            variant="outlined"
            value={person.updateDate}
            InputProps={{
              startAdornment: <HistoryIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          {/* New Fields */}
          <TextField
            label="Email"
            variant="outlined"
            value={person.email}
            InputProps={{
              startAdornment: <EmailIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            value={person.phoneNumber}
            InputProps={{
              startAdornment: <PhoneIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Principal Language"
            variant="outlined"
            value={person.principalLanguage}
            InputProps={{
              startAdornment: <LanguageIcon style={iconStyle} />,
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

ViewRelatedPersonModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  person: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    relation: PropTypes.string,
    patientName: PropTypes.string,
    bloodRelative: PropTypes.string,
    bloodType: PropTypes.string,
    bloodRh: PropTypes.string,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    principalLanguage: PropTypes.string,
  }),
};

ViewRelatedPersonModal.defaultProps = {
  person: null,
};

export default ViewRelatedPersonModal;