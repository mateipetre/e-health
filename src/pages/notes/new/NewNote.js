import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import TitleIcon from '@mui/icons-material/Title';
import NoteIcon from '@mui/icons-material/Note';
import CategoryIcon from '@mui/icons-material/Category';
import axios from 'axios'; // Import axios for making HTTP requests
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal'; // Import the success modal

const NewNote = () => {
  const [creationDate] = useState(new Date().toISOString().split('T')[0]); // Set default creation date
  const [updateDate] = useState(new Date().toISOString().split('T')[0]); // Set default update date
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [errorOpen, setErrorOpen] = useState(false); // State to handle error modal
  const [successOpen, setSuccessOpen] = useState(false); // State to handle success modal
  const [errorMessage, setErrorMessage] = useState('');

  const noteTypes = ['Doctor', 'Patient', 'System', 'Other'];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newNote = {
      creationDate,
      updateDate,
      name,
      type,
      content,
    };

    try {
      const response = await axios.post(`/patients/66cb68934f5769ec17d174a9/notes`, newNote);
     if (response.status === 201) {
        setSuccessOpen(true);
      }
    } catch (error) {
      console.error('Error adding new note:', error);
      setErrorMessage(error.response?.data?.message || 'Server error while adding medication');
      setErrorOpen(true); // Show error modal
    }
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ padding: '20px', boxSizing: 'border-box', maxWidth: '2100px' }}>
      {/* Logo Button */}
      <Button
        component={RouterLink}
        to="/"
        sx={{
          position: 'fixed',
          top: 30,
          left: 30,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200,
          backgroundColor: 'transparent',
          '& img': {
            height: '35px',
          },
        }}
      >
        <img
          src="/logo-no-background.png"
          alt="Logo"
          style={{ height: '35px' }}
        />
      </Button>

      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/notes"
        startIcon={<NoteIcon />}
        sx={{
          position: 'fixed',
          top: 30,
          right: 30,
          backgroundColor: '#6faaff',
          '&:hover': {
            backgroundColor: '#005bb5',
          },
          textTransform: 'none',
        }}
      >
        Back to Notes Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: '50px', color: '#ff6f6f' }}>
        Add a New Note
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignItems: 'center',
          maxWidth: 500,
          margin: '0 auto',
          padding: '20px',
          border: `4px solid ${'#b5ccfe'}`,
          borderRadius: '16px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden', // Prevents overflow issues
          boxSizing: 'border-box', // Ensures padding and border do not affect width
        }}
        onSubmit={handleSubmit}
      >
        {/* Name Input Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Name
          </Typography>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          />
        </FormControl>

        {/* Type Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Type
          </Typography>
          <TextField
            select
            value={type}
            onChange={(e) => setType(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {noteTypes.map((noteType) => (
              <MenuItem key={noteType} value={noteType}>
                {noteType}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Content TextArea */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Content
          </Typography>
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={6}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NoteIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ boxSizing: 'border-box' }} // Ensures consistent width handling
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#ff6f6f',
            '&:hover': {
              backgroundColor: '#e64a19',
            },
          }}
        >
          Add Note
        </Button>
      </Box>

      {/* Error Modal */}
      <HICErrorModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        title="Error"
        content={errorMessage}
        actions={[
          {
            label: 'Close',
            onClick: () => setErrorOpen(false),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />

      {/* Success Modal */}
      <HICSuccessModal
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false);
          navigate('/notes');
        }
        }
        title="Success"
        content="The note was added successfully!"
        actions={[
          {
            label: 'View Notes',
            onClick: () => navigate('/notes/view'),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </Box>
  );
};

export default NewNote;