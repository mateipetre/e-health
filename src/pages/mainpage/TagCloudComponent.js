import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { TagCloud } from 'react-tagcloud';

// Define a comprehensive list of terms with initial frequencies
const initialTerms = [
  { value: 'Heart Disease', count: 800 },
  { value: 'Diabetes', count: 750 },
  { value: 'Cancer', count: 700 },
  { value: 'Asthma', count: 650 },
  { value: 'Stroke', count: 600 },
  { value: 'Hypertension', count: 550 },
  { value: 'Arthritis', count: 500 },
  { value: 'Allergy', count: 450 },
  { value: 'Chronic Obstructive Pulmonary Disease', count: 400 },
  { value: 'COVID-19', count: 300 },
  { value: 'Gastroenteritis', count: 250 },
  { value: 'Pneumonia', count: 200 },
  { value: 'Campus', count: 500 },
  { value: 'Education', count: 450 },
  { value: 'Student', count: 400 },
  { value: 'Faculty', count: 350 },
  { value: 'Research', count: 300 },
  { value: 'Wellness', count: 250 },
  { value: 'Prevention', count: 200 },
  { value: 'Pills', count: 180 },
  { value: 'Medication', count: 160 },
  { value: 'Incident', count: 140 },
  { value: 'Patient', count: 120 },
  { value: 'Doctor', count: 100 },
  { value: 'Lab', count: 90 },
  { value: 'Visit', count: 80 },
  { value: 'CareGoal', count: 70 },
  { value: 'Diagnosis', count: 60 },
  { value: 'Appointment', count: 50 },
  { value: 'Imaging', count: 40 },
  { value: 'Chatbot', count: 30 },
  { value: 'Healthcare', count: 20 },
];

const TagCloudComponent = () => {
  const [terms, setTerms] = useState(initialTerms);
  const [loading] = useState(false);
  const [error] = useState('');

  useEffect(() => {
    const updateTerms = () => {
      // Generate new frequencies
      const updatedTerms = terms.map(term => ({
        ...term,
        count: term.count + Math.floor(Math.random() * 10) - 5, // Randomly adjust frequency
      }));

      // Ensure frequencies are not negative
      const sanitizedTerms = updatedTerms.map(term => ({
        ...term,
        count: Math.max(term.count, 0),
      }));

      setTerms(sanitizedTerms);
    };

    // Set interval to update terms every 2 minutes
    const intervalId = setInterval(updateTerms, 2 * 60 * 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [terms]);

  return (
    <Box sx={{ p: 2 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TagCloud
          minSize={15}
          maxSize={40}
          tags={terms}
          colorOptions={{ luminosity: 'dark', hue: 'blue' }}
        />
      )}
    </Box>
  );
};

export default TagCloudComponent;