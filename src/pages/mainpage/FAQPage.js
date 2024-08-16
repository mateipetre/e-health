import React from 'react';
import { Typography, Container, Accordion, AccordionSummary, AccordionDetails, Grid, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';

const faqs = [
  {
    question: 'What is Health In Campus?',
    answer: 'Health In Campus is a platform dedicated to providing comprehensive healthcare solutions, including medical consultations, resources, and information. We aim to make quality healthcare more accessible and user-friendly.'
  },
  {
    question: 'How do I book a consultation?',
    answer: 'To book a consultation, navigate to the "Consultations" section on our website, select a medical professional, and follow the instructions to schedule your appointment. You can also use our platform to manage your bookings and view your appointment history.'
  },
  {
    question: 'Is there a mobile app available?',
    answer: 'Currently, we do not have a mobile app. However, our website is mobile-friendly and can be accessed from any device with an internet connection.'
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can contact our customer support team by sending an email to <a href="mailto:support@example.com">petrealexandrumatei@gmail.com</a>. We are available to assist you with any questions or issues you may have.'
  },
  {
    question: 'Where can I find information about your privacy policies?',
    answer: 'Information about our privacy policies can be found on our Privacy Policy page, which you can access via the footer links or directly through <a href="/privacy">this link</a>.'
  },
  {
    question: 'How do I update my personal information?',
    answer: 'To update your personal information, log in to your account and navigate to the "Account Settings" section. From there, you can update your personal details and contact information.'
  }
];

const FAQPage = () => {
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
        Frequently Asked Questions
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FAQPage;