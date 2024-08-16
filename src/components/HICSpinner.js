import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const SpinnerWrapper = styled(Box)(({ styleProps }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: styleProps.gap || '8px',
  color: styleProps.color || '#1976d2',
  margin: styleProps.margin || '16px',
}));

const HICSpinner = ({
  size,
  thickness,
  color,
  margin,
  gap,
  message,
  messageColor,
  messageFontSize,
}) => {
  return (
    <SpinnerWrapper styleProps={{ color, margin, gap }}>
      <CircularProgress size={size} thickness={thickness} style={{ color }} />
      {message && (
        <Typography
          variant="body2"
          style={{ color: messageColor, fontSize: messageFontSize }}
        >
          {message}
        </Typography>
      )}
    </SpinnerWrapper>
  );
};

HICSpinner.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
  color: PropTypes.string,
  margin: PropTypes.string,
  gap: PropTypes.string,
  message: PropTypes.string,
  messageColor: PropTypes.string,
  messageFontSize: PropTypes.string,
};

HICSpinner.defaultProps = {
  size: 40,
  thickness: 4,
  color: '#1976d2',
  margin: '16px',
  gap: '8px',
  message: '',
  messageColor: '#000',
  messageFontSize: '1rem',
};

export default HICSpinner;