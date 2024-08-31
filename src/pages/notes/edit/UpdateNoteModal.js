import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Box, Typography, IconButton, TextField, Button,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import TitleIcon from '@mui/icons-material/Title';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import axios from 'axios'; // For making HTTP requests
import HICErrorModal from '../../../components/HICErrorModal'; // Adjust path as necessary
import HICSuccessModal from '../../../components/HICSuccessModal'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

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

const UpdateNoteModal = ({ open, onClose, note, onUpdate }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (note) {
      setName(note.name || '');
      setType(note.type || '');
      setContent(note.content || '');
    }
  }, [note]);

  const noteTypes = ['Doctor', 'Patient', 'System', 'Other'];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add your validation logic here if needed

    const updatedNote = {
      ...note,
      name,
      type,
      content,
    };

    try {
      await axios.put(`/patients/66cb68934f5769ec17d174a9/notes/${note._id}`, updatedNote);
      setSuccessModalOpen(true);
    } catch (error) {
      console.error('Error updating note:', error);
      setErrorModalOpen(true);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Typography variant="h6" color="#6faaff">
            Edit Note
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: <TitleIcon style={iconStyle} />,
            }}
            fullWidth
            required
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel sx={{ top: '-8px' }}>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Type"
            >
              {noteTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Content"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            InputProps={{
              startAdornment: <ContentPasteIcon style={iconStyle} />,
            }}
            multiline
            rows={6}
            fullWidth
            required
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#ff6f6f', // Pastel Red
                '&:hover': {
                  backgroundColor: '#e64a19',
                },
                maxWidth: '200px',
                alignSelf: 'center',
                textTransform: 'none',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              }}
            >
              Update Note
            </Button>
          </Box>
        </Box>

        {/* Success Modal */}
        <HICSuccessModal
          open={successModalOpen}
          onClose={() => {
            setSuccessModalOpen(false);
            onClose(); // Close the main modal
          }}
          title="Success"
          content="Note updated successfully"
          actions={[
            {
              label: 'OK',
              onClick: () => {
                setSuccessModalOpen(false);
                onClose(); // Close the main modal
              },
              variant: 'contained',
              color: 'primary',
            },
          ]}
        />

        {/* Error Modal */}
        <HICErrorModal
          open={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          title="Error"
          content={"Failed to update note. Try again."}
          actions={[
            {
              label: 'View notes',
              onClick: () => {
                setErrorModalOpen(false);
                navigate('/notes/view');
              },
              variant: 'contained',
              color: 'primary',
            },
          ]}
        />
      </CustomBox>
    </Modal>
  );
};

UpdateNoteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    patientId: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

UpdateNoteModal.defaultProps = {
  note: null,
};

export default UpdateNoteModal;