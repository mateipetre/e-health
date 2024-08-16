import React from 'react';
import { Badge } from '@mui/material';
import { styled } from '@mui/system';

// Define custom colors for different badge contexts
const customBadgeColors = {
  primary: '#B3E5FC', // Brighter pastel blue
  secondary: '#B2DFDB', // Brighter pastel green
  error: '#FFCDD2', // Brighter pastel red
  warning: '#FFE0B2', // Brighter pastel orange
  info: '#E1BEE7', // Brighter pastel purple
};

// Styled component for HIC Badge
const HICStyledBadge = styled(Badge)(({ color }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: customBadgeColors[color] || customBadgeColors.primary,
    color: '#000', // Dark text color for readability
    fontFamily: 'Lato, sans-serif', // Using Poppins font
    fontWeight: 'bold',
    boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
  },
}));

const HICBadge = ({ children, badgeContent, color, ...props }) => {
  return (
    <HICStyledBadge badgeContent={badgeContent} color={color} {...props}>
      {children}
    </HICStyledBadge>
  );
};

export default HICBadge;