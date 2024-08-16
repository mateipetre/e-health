import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const TermsOfService = () => {
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
        Terms of Service
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to our Terms of Service. These terms apply to your use of our website and services. By using our website, you agree to these terms. If you do not agree, please do not use our website.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        1. Introduction
      </Typography>
      <Typography variant="body1" paragraph>
        These Terms of Service govern your use of our website and services. We may update these terms from time to time, and you are responsible for reviewing the terms regularly.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        2. User Responsibilities
      </Typography>
      <Typography variant="body1" paragraph>
        You agree to use our services only for lawful purposes and in accordance with these terms. You are responsible for any content you submit and for maintaining the confidentiality of your account information.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        3. Intellectual Property
      </Typography>
      <Typography variant="body1" paragraph>
        All content and materials on our website are protected by intellectual property laws. You may not use, copy, or distribute any content from our website without our permission.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        4. Limitation of Liability
      </Typography>
      <Typography variant="body1" paragraph>
        We are not liable for any damages arising from your use of our website or services. Our services are provided "as is" and we do not guarantee their availability or functionality.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        5. Governing Law
      </Typography>
      <Typography variant="body1" paragraph>
        These terms are governed by the laws of [Your Country/State]. Any disputes arising under these terms will be resolved in the courts of [Your Country/State].
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        6. Contact Information
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions about these terms, please contact me at <a href="mailto:support@example.com">petrealexandrumatei@gmail.comm</a>.
      </Typography>
    </Container>
  );
};

export default TermsOfService;