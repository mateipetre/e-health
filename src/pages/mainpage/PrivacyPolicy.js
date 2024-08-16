import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PrivacyPolicy = () => {
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
        Privacy Policy
      </Typography>

      <Typography variant="body1" paragraph>
        We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services. By using our website, you consent to the practices described in this policy.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        1. Information We Collect
      </Typography>
      <Typography variant="body1" paragraph>
        We may collect personal information that you provide directly to us, such as your name, email address, and phone number. We also collect information about your interactions with our website and services, including IP addresses and browsing behavior.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        2. How We Use Your Information
      </Typography>
      <Typography variant="body1" paragraph>
        We use the information we collect to provide, improve, and personalize our services. This includes responding to your inquiries, processing transactions, and sending you updates and promotional materials. We may also use your data for analytical purposes to understand how our website is used.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        3. How We Protect Your Information
      </Typography>
      <Typography variant="body1" paragraph>
        We implement a variety of security measures to ensure the safety of your personal information. This includes using encryption and other security technologies to protect your data from unauthorized access and breaches.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        4. Sharing Your Information
      </Typography>
      <Typography variant="body1" paragraph>
        We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy. We may share your information with trusted third parties who assist us in operating our website and providing services, subject to confidentiality agreements.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        5. Cookies and Tracking Technologies
      </Typography>
      <Typography variant="body1" paragraph>
        We use cookies and other tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us understand your preferences and usage patterns. You can choose to disable cookies through your browser settings, but this may affect the functionality of our website.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        6. Your Choices and Rights
      </Typography>
      <Typography variant="body1" paragraph>
        You have the right to access, correct, or delete your personal information. If you wish to exercise these rights or have any concerns about your data, please contact us using the details provided below.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        7. Changes to This Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph>
        We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website. Your continued use of our services after changes are made constitutes your acceptance of the revised policy.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        8. Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions or concerns about this Privacy Policy or our data practices, please contact me at <a href="mailto:support@example.com">petrealexandrumatei@gmail.com</a>.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
