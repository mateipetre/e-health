import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import TitleIcon from '@mui/icons-material/Title';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HistoryIcon from '@mui/icons-material/History'; // Icon for Update Date

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

const ViewNoteModal = ({ open, onClose, note }) => {
  if (!note) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Typography variant="h6" color="#6faaff">
            Note Details
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Name"
            variant="outlined"
            value={note.name}
            InputProps={{
              startAdornment: <TitleIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Creation Date"
            variant="outlined"
            value={note.creationDate}
            InputProps={{
              startAdornment: <CalendarTodayIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Update Date"
            variant="outlined"
            value={note.updateDate}
            InputProps={{
              startAdornment: <HistoryIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Type"
            variant="outlined"
            value={note.type}
            InputProps={{
              startAdornment: <CategoryIcon style={iconStyle} />,
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Content"
            variant="outlined"
            value={note.content}
            InputProps={{
              startAdornment: <ContentPasteIcon style={iconStyle} />,
              readOnly: true,
            }}
            multiline
            rows={6}
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

ViewNoteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  note: PropTypes.shape({
    index: PropTypes.number,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
  }),
};

ViewNoteModal.defaultProps = {
  note: null,
};

export default ViewNoteModal;