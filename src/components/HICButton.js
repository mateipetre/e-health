// HICButton.js
import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';

// Define button types and corresponding styles
const buttonStyles = {
  primary: {
    backgroundColor: '#007bff', // Original vibrant blue
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
    borderColor: '#0056b3',
  },
  secondary: {
    backgroundColor: '#6c757d', // Original vibrant gray
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5a6268',
    },
    borderColor: '#5a6268',
  },
  success: {
    backgroundColor: '#28a745', // Original vibrant green
    color: '#fff',
    '&:hover': {
      backgroundColor: '#218838',
    },
    borderColor: '#218838',
  },
  danger: {
    backgroundColor: '#dc3545', // Original vibrant red
    color: '#fff',
    '&:hover': {
      backgroundColor: '#c82333',
    },
    borderColor: '#c82333',
  },
  info: {
    backgroundColor: '#17a2b8', // Original vibrant teal
    color: '#fff',
    '&:hover': {
      backgroundColor: '#138496',
    },
    borderColor: '#138496',
  },
  warning: {
    backgroundColor: '#ffc107', // Original vibrant yellow
    color: '#212529',
    '&:hover': {
      backgroundColor: '#e0a800',
    },
    borderColor: '#e0a800',
  },
  outlined: {
    backgroundColor: 'transparent',
    color: '#000',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    borderColor: '#000',
  },
};

const StyledButton = styled(Button)(({ variantType, hasBorder, iconOnly }) => ({
  ...buttonStyles[variantType],
  textTransform: 'none',
  fontFamily: 'Lato, sans-serif',
  border: hasBorder ? `3px solid ${buttonStyles[variantType].borderColor}` : 'none',
  padding: iconOnly ? '4px' : hasBorder ? '4px 8px' : '6px 10px', // Smaller padding for icon-only buttons
  borderRadius: '24px', // Make buttons more circular
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // More visible shadow
}));

const HICButton = ({
  variant = 'primary',
  children,
  icon: Icon,
  loading = false,
  disabled = false,
  onClick,
  tooltip = '',
  hasBorder = false,
  ...props
}) => {
  const iconOnly = !children;

  const button = (
    <StyledButton
      variantType={variant}
      disabled={loading || disabled}
      onClick={onClick}
      hasBorder={hasBorder}
      iconOnly={iconOnly}
      {...props}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: green[500] }} />
      ) : (
        <>
          {Icon && <Icon style={{ marginRight: children ? 8 : 0 }} />}
          {children}
        </>
      )}
    </StyledButton>
  );

  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      <span>{button}</span>
    </Tooltip>
  ) : (
    button
  );
};

HICButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'info', 'warning', 'outlined']),
  children: PropTypes.node,
  icon: PropTypes.elementType,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
  hasBorder: PropTypes.bool,
};

export default HICButton;