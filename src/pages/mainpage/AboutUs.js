import React from 'react';
import { Box, Typography, Container, Grid, Avatar, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Sample team member data
const teamMembers = [
  {
    name: 'Alexandru-Petrut Matei',
    role: 'Founder',
    bio: 'Petrut has over 6 years of experience in the engineering industry. He is passionate about improving health outcomes through innovative solutions.',
    image: 'image.png',
  },
];

const AboutUs = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
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
      <Typography variant="h4" sx={{ mb: 2 }}>
        About Us
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to Health In Campus! We are dedicated to providing comprehensive healthcare solutions and resources for our community. Our mission is to make quality healthcare accessible and easy to understand. Through our platform, we aim to connect individuals with medical professionals, resources, and information to support their health and well-being.
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Our Team
      </Typography>

      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Avatar
                alt={member.name}
                src={member.image}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h6" sx={{ mb: 1 }}>
                {member.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
                {member.role}
              </Typography>
              <Typography variant="body2">
                {member.bio}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Our Mission
      </Typography>
      <Typography variant="body1" paragraph>
        Our mission is to revolutionize healthcare delivery by leveraging technology to provide more accessible, efficient, and personalized care. We are committed to improving health outcomes and enhancing the quality of life for our users.
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Contact Us
      </Typography>
      <Typography variant="body1">
        If you have any questions or would like to learn more about our services, please feel free to reach out to me at <a href="mailto:support@example.com">petrealexandrumatei@gmail.com</a>.
      </Typography>
    </Container>
  );
};

export default AboutUs;