import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import { Close as CloseIcon, CheckCircle as CheckCircleIcon, Error as ErrorIcon, Info as InfoIcon, Warning as WarningIcon } from '@mui/icons-material';
import Draggable from 'react-draggable';

const IconWrapper = styled('div')(({ color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: '16px',
}));

const StyledSnackbarContent = styled(SnackbarContent)(({ backgroundColor, textColor, borderColor }) => ({
  backgroundColor: backgroundColor || '#ffffff',
  color: textColor || '#333',
  borderRadius: '8px',
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
  borderLeft: `5px solid ${borderColor}`,
}));

const MessageContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const HICToaster = ({
  message = '',
  title,
  duration = 7000,
  isOpen = false,
  onClose,
  backgroundColor = '#ffffff',
  textColor = '#333333',
  action = null,
  type = null,
  draggable = false,
  titleWithMessage = false,
  titleWithoutMessage = false,
  ...rest
}) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    onClose();
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case 'error':
        return { borderColor: '#FFB3B3', color: '#FF4D4D', icon: <ErrorIcon /> };
      case 'info':
        return { borderColor: '#B3D1FF', color: '#4D79FF', icon: <InfoIcon /> };
      case 'success':
        return { borderColor: '#B3FFB3', color: '#4DFF4D', icon: <CheckCircleIcon /> };
      case 'warning':
        return { borderColor: '#FFE5B3', color: '#FFB84D', icon: <WarningIcon /> };
      default:
        return { borderColor: '#323232', color: '#323232', icon: null };
    }
  };

  const { borderColor, color, icon } = getTypeStyles(type);

  const renderMessage = () => {
    if (titleWithMessage && title) {
      return (
        <>
          <strong>{title}</strong> {message}
        </>
      );
    } else if (titleWithoutMessage && title) {
      return <strong>{title}</strong>;
    } else {
      return message;
    }
  };

  const snackbarContent = (
    <StyledSnackbarContent
      backgroundColor={backgroundColor}
      textColor={textColor}
      borderColor={borderColor}
      message={
        <MessageContainer>
          <IconWrapper color={color}>
            {icon}
          </IconWrapper>
          <div>{renderMessage()}</div>
        </MessageContainer>
      }
      action={[
        action,
        <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      {...rest}
    >
      {draggable ? (
        <Draggable>{snackbarContent}</Draggable>
      ) : (
        snackbarContent
      )}
    </Snackbar>
  );
};

HICToaster.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
  duration: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  action: PropTypes.node,
  type: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  draggable: PropTypes.bool,
  titleWithMessage: PropTypes.bool,
  titleWithoutMessage: PropTypes.bool,
};

export default HICToaster;