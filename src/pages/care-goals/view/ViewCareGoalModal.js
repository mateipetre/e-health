import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import UpdateIcon from '@mui/icons-material/Update';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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

const ViewCareGoalModal = ({ open, onClose, careGoal }) => {
  if (!careGoal) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Typography variant="h6" color="#6faaff">
            CareGoal Details
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="CareGoal Name"
            variant="outlined"
            value={careGoal.name}
            InputProps={{
              startAdornment: <AssignmentTurnedInIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            value={careGoal.description}
            InputProps={{
              startAdornment: <DescriptionIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Duration"
            variant="outlined"
            value={careGoal.duration}
            InputProps={{
              startAdornment: <AccessTimeIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Type"
            variant="outlined"
            value={careGoal.type}
            InputProps={{
              startAdornment: <CategoryIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Status"
            variant="outlined"
            value={careGoal.status}
            InputProps={{
              startAdornment: <CheckCircleOutlineIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Creation Date"
            variant="outlined"
            value={careGoal.creationDate}
            InputProps={{
              startAdornment: <EventIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Update Date"
            variant="outlined"
            value={careGoal.updateDate}
            InputProps={{
              startAdornment: <UpdateIcon style={iconStyle} />,
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

ViewCareGoalModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  careGoal: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.string,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
  }),
};

ViewCareGoalModal.defaultProps = {
  careGoal: null,
};

export default ViewCareGoalModal;