import React from 'react';
import { Box } from '@mui/material';

const MouseScrollIndicator = () => {
  return (
    <Box
      sx={{
        position: 'fixed', // Ensures the element stays fixed relative to the viewport
        bottom: 20, // Distance from the bottom of the viewport
        left: '50%', // Center horizontally
        transform: 'translateX(-50%)', // Centering alignment
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: 1000, // Ensures it is above other content
      }}
    >
      {/* Mouse container */}
      <Box
        sx={{
          width: 40, // Width of the mouse
          height: 70, // Height of the mouse
          border: '4px solid rgba(0, 0, 0, 0.5)', // Semi-transparent border for the mouse
          borderRadius: 24, // Rounded corners
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background for visibility
        }}
      >
        {/* Scrolling indicator */}
        <Box
          sx={{
            width: 6, // Width of the scroll indicator
            height: 12, // Height of the scroll indicator
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent color for the scroll indicator
            borderRadius: 4, // Rounded corners
            position: 'absolute',
            top: 16, // Position from the top of the mouse container
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'scroll 2s infinite', // Animation for scrolling effect
          }}
        />
      </Box>

      {/* No text below the mouse */}
      
      {/* Animation CSS */}
      <style>
        {`
          @keyframes scroll {
            0% {
              top: 16px;
              opacity: 1;
            }
            50% {
              top: 32px;
              opacity: 0.5;
            }
            100% {
              top: 16px;
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default MouseScrollIndicator;