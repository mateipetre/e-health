import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

// Custom styled components
const CustomBox = styled(Box)(({ padding, borderRadius, boxShadow }) => ({
  backgroundColor: '#fff',
  padding: padding || '16px',
  borderRadius: borderRadius || '12px',
  boxShadow: boxShadow || '5px 5px 15px rgba(0, 0, 0, 0.3)',
  position: 'relative',
  margin: 'auto',
  top: '50%',
  transform: 'translateY(-50%)',
  maxWidth: '900px',
  maxHeight: '900px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  width: 'auto',
  border: '4px solid orange',
}));

const Header = styled(Box)({
  borderBottom: '1px solid #e0e0e0',
  paddingBottom: '8px',
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ContentBox = styled(Box)({
  overflowY: 'auto',
  maxHeight: 'calc(70vh - 80px)',
  display: 'flex',
  alignItems: 'center', // Center content vertically
});

const ActionButton = styled(Button)({
  borderRadius: '50px',
  margin: '0 8px',
  boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
  border: '1px solid #ccc',
  textTransform: 'none',
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  color: '#336699',
});

const WarningIcon = styled('img')({
  width: '30px',
  height: '30px',
  marginRight: '8px',
});

const HICWarningModal = ({
  open,
  onClose,
  title,
  content,
  actions,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <Header>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon src={'/warning.png'} alt="warning-icon" />
            <Typography variant="h6">
              {title}
            </Typography>
          </Box>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <ContentBox>
          <Typography variant="body2">
            {content}
          </Typography>
        </ContentBox>
        <Box mt={2} display="flex" justifyContent="flex-end">
          {actions && actions.map((action, index) => (
            <ActionButton
              key={index}
              variant={action.variant}
              color={action.color}
              onClick={action.onClick}
              style={action.style}
            >
              {action.label}
            </ActionButton>
          ))}
        </Box>
      </CustomBox>
    </Modal>
  );
};

HICWarningModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.node,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.string,
      color: PropTypes.string,
      style: PropTypes.object,
    })
  ),
};

HICWarningModal.defaultProps = {
  title: '',
  content: null,
  actions: [],
};

export default HICWarningModal;