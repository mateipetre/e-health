import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Grid } from '@mui/material';
import { ErrorToaster } from '../../components/ToasterTypes';
import { Google as GoogleIcon, Chat } from '@mui/icons-material';
import { Link as RouterLink, Link } from 'react-router-dom';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setUsernameError('');
    setPasswordError('');
    setShowToaster(false);

    let hasError = false;

    // Validation
    if (!username) {
      setUsernameError('Username is required');
      hasError = true;
    }
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/login', { username, password }, { withCredentials: true });

      if (response.data.redirectToGoogle) {
        // Redirect to Google OAuth login
        window.location.href = 'http://localhost:8080/auth/google';
      } else if (response.status === 401) {
        // Handle error messages based on the response from the server
        if (response.data.message === 'Incorrect username.') {
          setToasterMessage('Incorrect username. Please try again.');
        } else if (response.data.message === 'Incorrect password.') {
          setToasterMessage('Incorrect password. Please try again.');
        } else {
          setToasterMessage(response.data.message || 'Login failed. Please try again.');
        }
        setShowToaster(true);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      setToasterMessage('Login failed. Invalid user or wrong password.');
      setShowToaster(true);
      console.error('Login failed:', error);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'ABeeZee, sans-serif',
        position: 'relative', // Needed for absolute positioning of the buttons
      }}
    >
      {/* Buttons at the top right */}
      <Box
        sx={{
          position: 'absolute',
          top: 30,
          right: 30,
          display: 'flex',
          gap: 1, // Spacing between buttons
          zIndex: 1200,
        }}
      >
        <Button
          component={Link}
          to="/meeting"
          variant="contained"
          color="primary"
          startIcon={<VideoCameraFrontIcon  />}
          sx={{
            textTransform: 'none',
            backgroundColor: '#2196f3', // Blue color
            '&:hover': {
              backgroundColor: '#1976d2', // Darker blue on hover
            },
            fontFamily: 'ABeeZee, sans-serif',
            fontSize: '1rem',
          }}
        >
          Start Scheduled Meeting
        </Button>
        <Button
          component={Link}
          to="/assistant"
          variant="contained"
          color="secondary"
          startIcon={<Chat />}
          sx={{
            textTransform: 'none',
            backgroundColor: '#ff6f61', // Red pastel color
            '&:hover': {
              backgroundColor: '#e64a19', // Darker red on hover
            },
            fontFamily: 'ABeeZee, sans-serif',
            fontSize: '1rem',
          }}
        >
          Ask Assistant
        </Button>
      </Box>

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
          src="logo-no-background.png"
          alt="Logo"
          style={{ height: '35px' }}
        />
      </Button>
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '10%' }}>
          <img
            src="login.jpg"  // Replace with your image URL
            alt="Decorative"
            style={{ maxWidth: '100%', height: 'auto' }}  // Adjust maxWidth as needed
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '25%' }}>
          <Box sx={{ maxWidth: 450, width: '100%', px: 3 }}>
            <Grid container alignItems="center" justifyContent="center"> 
              <Grid item>
                <img
                  src="favicon-icon.png"
                  alt="Logo"
                  style={{ height: '60px', marginRight: '10px' }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h4" gutterBottom>
                  Connect into the app
                </Typography>
              </Grid>
            </Grid>

            <form onSubmit={handleLogin}>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!usernameError}
                helperText={usernameError}
                required
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  fontWeight: 'bold',
                  padding: '10px 0',
                  fontSize: '16px',
                  textTransform: 'none',
                }}
                startIcon={<GoogleIcon />}
              >
                Continue to Google
              </Button>
            </form>

            {showToaster && (
              <ErrorToaster
                isOpen={showToaster}
                message={toasterMessage}
                onClose={() => setShowToaster(false)}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;