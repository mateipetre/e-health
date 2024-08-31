/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, TextField, Avatar, Typography, Tooltip, IconButton, Input, Chip, Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DocumentUploader from './DocumentUploader';

const pastelBlue = '#6faaff';
const pastelRed = '#ff6f6f'; // Red pastel color

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [avatar, setAvatar] = useState(null);

  // Fetch user data by ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/66bba8cf4c8820418c83e8cb`);
        const userData = response.data;
        setUser(userData);
        setRoles(userData.roles || []);
        setPermissions(userData.access || []);
        setAvatar(userData.profileImage || null);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Load the avatar from local storage
  useEffect(() => {
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  // Handle avatar upload and save to local storage
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const avatarUrl = URL.createObjectURL(file);
      setAvatar(avatarUrl);
      localStorage.setItem('avatar', avatarUrl);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', p: 3, backgroundColor: '#ffffff', fontFamily: 'ABeeZee, sans-serif' }}>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mt: 2 }}>
        <img src="user-profile.jpg" alt="Profile Left Image" style={{ maxWidth: '100%', height: 'auto', maxHeight: '70%'}} />
      </Box>

      <Box sx={{ flex: 2, p: 3 }}>
        <Button
          component={RouterLink}
          to="/patient-dashboard"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            backgroundColor: pastelBlue,
            '&:hover': { backgroundColor: '#005bb5' },
            mb: 3,
            textTransform: 'none',
          }}
        >
          Back to Dashboard
        </Button>

        {/* User Profile Card */}
        <Box
          sx={{
            mb: 4,
            border: `2px solid ${pastelBlue}`,
            borderRadius: 4, // More rounded corners
            padding: 2,
          }}
        >
          <Typography variant="h5" sx={{ color: pastelBlue, mb: 2 }}>
            Patient User Profile
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ width: 100, height: 100, mr: 2 }} src={avatar}>
              {!avatar && <PhotoCamera />}
            </Avatar>
            <label htmlFor="avatar-upload">
              <Input
                accept="image/*"
                id="avatar-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleAvatarUpload}
              />
              <Tooltip title="Upload Avatar">
                <IconButton
                  color="primary"
                  component="span"
                  sx={{ backgroundColor: pastelBlue, '&:hover': { backgroundColor: '#005bb5' } }}
                >
                  <PhotoCamera />
                </IconButton>
              </Tooltip>
            </label>
            <Typography variant="h7">Upload your profile picture</Typography>
          </Box>

          {/* User Information */}
          <Box sx={{ mb: 4 }}>
            <TextField
              label="Username"
              value={user ? user.username : ''}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              sx={{ borderRadius: 2 }}
            />
            <TextField
              label="First Name"
              value={user ? user.first_name : ''}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              sx={{ borderRadius: 2 }}
            />
            <TextField
              label="Last Name"
              value={user ? user.last_name : ''}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              sx={{ borderRadius: 2 }}
            />
          </Box>

          {/* Roles */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: pastelBlue }}>
              Roles
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {roles.map((role, index) => (
                <Chip
                  key={index}
                  label={role}
                  sx={{
                    backgroundColor: pastelRed, // Red pastel color
                    color: '#fff',
                    mb: 1,
                  }}
                />
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Permissions */}
            <Typography variant="h6" sx={{ mb: 2, color: pastelBlue }}>
              Permissions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {permissions.map((permission, index) => (
                <Chip
                  key={index}
                  label={permission}
                  sx={{
                    backgroundColor: pastelBlue, // Blue pastel color
                    color: '#fff',
                    mb: 1,
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Document Uploader */}
          <DocumentUploader />
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;