import React from 'react';
import { Alert, AlertTitle, Typography } from '@mui/material';
import { styled } from '@mui/system';
import InfoIcon from './icons/info.png';
import WarningIcon from './icons/warning.png';
import ErrorIcon from './icons/error.png';
import CheckCircleIcon from './icons/success.png';
import NotificationsIcon from './icons/bell.png';

// Define custom colors
const customColors = {
  info: '#B3E5FC', // Brighter pastel blue
  success: '#B2DFDB', // Brighter pastel green
  warning: '#FFE0B2', // Brighter pastel orange
  error: '#FFCDD2', // Brighter pastel red
  notification: '#E1BEE7', // Brighter pastel purple
};

// Icons mapping with size
const iconStyle = {
  width: '24px',
  height: '24px',
};

// Icons mapping
const severityIcons = {
  info: <img src={InfoIcon} alt="info icon" style={iconStyle}/>,
  success: <img src={CheckCircleIcon} alt="success icon" style={iconStyle}/>,
  warning: <img src={WarningIcon} alt="warning icon" style={iconStyle}/>,
  error: <img src={ErrorIcon} alt="error icon" style={iconStyle}/>,
  notification: <img src={NotificationsIcon} alt="notification icon" style={iconStyle}/>,
};

// Styled component for HIC Alert
const HICStyledAlert = styled(Alert)(({ severity, width, height }) => ({
  backgroundColor: customColors[severity],
  color: '#000', // Dark text color for readability
  border: `1px solid ${customColors[severity]}`,
  boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
  fontFamily: 'Lato, sans-serif',
  width: width || 'auto',
  height: height || 'auto',
}));

const HICAlert = ({ severity, title, children, width, height, ...props }) => {
  return (
    <HICStyledAlert severity={severity} width={width} height={height} icon={severityIcons[severity]} {...props}>
      {title && <AlertTitle><Typography variant="h6" style={{ fontWeight: 'bold', fontFamily: 'Lato' }}>{title}</Typography></AlertTitle>}
      {children}
    </HICStyledAlert>
  );
};

export default HICAlert;