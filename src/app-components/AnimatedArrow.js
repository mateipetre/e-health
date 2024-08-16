import React from 'react';
import { Box } from '@mui/material';

const AnimatedArrow = () => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        width: '20px',
        height: '20px',
        borderTop: '3px solid white',
        borderRight: '3px solid white',
        transform: 'rotate(45deg)',
        marginLeft: '8px',
        animation: 'arrowAnimation 1s infinite',
        '@keyframes arrowAnimation': {
          '0%': { transform: 'translateX(0) rotate(45deg)' },
          '50%': { transform: 'translateX(10px) rotate(45deg)' },
          '100%': { transform: 'translateX(0) rotate(45deg)' }
        }
      }}
    />
  );
};

export default AnimatedArrow;
