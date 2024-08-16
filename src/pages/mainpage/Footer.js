import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';

const Logo = () => (
  <Box
    sx={{
      width: 300,
      height: 'auto',
      display: 'flex',
      mb: 2
    }}
  >
    <img
      src="logo-black-transparent.png"
      alt="App Logo"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  </Box>
);

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        py: 4,
        px: 2,
        width: '100%',
        textAlign: 'center',
        overflowX: 'hidden',
        fontFamily: 'ABeeZee, sans-serif',
        boxSizing: 'border-box'
      }}
    >
      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Logo />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Contact
          </Typography>
          <Typography variant="body1">
            <Link href="mailto:support@example.com">petrealexandrumatei@gmail.com</Link>
          </Typography>
          <Typography variant="body1">Alexandru-Petrut Matei</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Resources
          </Typography>
          <Typography variant="body1">
            <Link href="/terms" sx={{ display: 'block', mb: 1 }}>Terms of Service</Link>
            <Link href="/privacy" sx={{ display: 'block' }}>Privacy Policy</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Other
          </Typography>
          <Typography variant="body1">
            <Link href="/about" sx={{ display: 'block', mb: 1 }}>About Us</Link>
            <Link href="/faq" sx={{ display: 'block' }}>FAQ</Link>
          </Typography>
        </Grid>
      </Grid>

      {/* Separator Line */}
      <Box sx={{ my: 4 }}>
        <hr style={{
          border: '0',
          borderTop: '1px solid #ccc',
          margin: '0 auto',
          width: '58%',
        }} />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 Health In Campus
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
