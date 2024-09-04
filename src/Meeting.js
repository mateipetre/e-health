/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import JitsiComponent from './JitsiMeeting';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

const Meeting = () => {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [showMeeting, setShowMeeting] = useState(false);

  const pastelBlue = '#6faaff';
  const navigate = useNavigate();

  const handleStartMeeting = () => {
    if (roomName.trim() && userName.trim()) {
      setShowMeeting(true);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', padding: '20px' }}>
      {/* Left Image */}
      <Box sx={{ flex: '0 0 200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px', marginLeft: '200px' }}>
        <img
          src='/meeting.jpg' // Replace with the path to your image
          alt="Left Image"
          style={{ width: '700px', height: 'auto' }} // Adjust the size as needed
        />
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Logo */}
        <Button
          component={RouterLink}
          to="/"
          sx={{
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            position: 'absolute',
            top: '20px',
            left: '20px'
          }}
        >
          <img
            src='/logo-no-background.png'
            alt="Logo"
            style={{ height: '35px' }}
          />
        </Button>
        <Box sx={{ marginLeft: '970px' }}><Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              startIcon={<HomeIcon />}
              sx={{
                backgroundColor: pastelBlue,
                '&:hover': {
                  backgroundColor: '#005bb5',
                },
                textTransform: 'none',
              }}
            >
              Back to Main Page
            </Button></Box>
        {/* Title */}
        <Typography
          variant="h4"
          sx={{ marginTop: '60px', textAlign: 'center', color: '#ff6f6f', marginRight: '800px' }} // Red pastel color
        >
          Online Meeting With Your Doctor or Patient
        </Typography>

        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!showMeeting ? (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', marginRight:'200px', marginBottom: '200px' }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            Start Your Meeting
          </Typography>
          <Box sx={{ width: '100%', maxWidth: '500px', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', backgroundColor: '#fff'}}>
            <TextField
              label="Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartMeeting}
              sx={{
                mt: 2,
                width: '100%',
                borderRadius: '25px',
                backgroundColor: '#e3f2fd',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#bbdefb',
                }
              }}
            >
              Start Meeting
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <JitsiComponent roomName={roomName} userName={userName} sx={{ flex: 1, height: '100vh', width: '100%' }} />
        </Box>
      )}
    </Box>
        
      </Box>
    </Box>
  );
};

export default Meeting;