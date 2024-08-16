import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const CustomBox = styled(Box)(({ bgcolor, padding, borderRadius, boxShadow }) => ({
  backgroundColor: bgcolor || '#fff',
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
}));

const Header = styled(Box)(({ borderBottom }) => ({
  borderBottom: borderBottom || '1px solid #e0e0e0',
  paddingBottom: '8px',
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ContentBox = styled(Box)(({ maxHeight }) => ({
  overflowY: 'auto',
  maxHeight: maxHeight || 'calc(70vh - 80px)',
}));

const ActionButton = styled(Button)(({ 
  borderRadius, 
  margin, 
  boxShadow, 
  border, 
  textTransform 
}) => ({
  borderRadius: borderRadius || '50px',
  margin: margin || '0 8px',
  boxShadow: boxShadow || '3px 3px 10px rgba(0, 0, 0, 0.2)',
  border: border || '1px solid #ccc',
  textTransform: textTransform || 'none', // Ensures no full capitals
}));

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  color: '#336699', // Darker pastel blue color
});

const HICModal = ({
  open,
  onClose,
  title,
  content,
  actions,
  bgcolor,
  padding,
  borderRadius,
  boxShadow,
  headerBorderBottom,
  titleClassName,
  titleStyle,
  contentClassName,
  contentStyle,
  actionsClassName,
  actionsStyle,
  closeButton,
  closeButtonSize,
  closeButtonColor,
  actionButtonBorderRadius,
  actionButtonMargin,
  actionButtonShadow,
  actionButtonBorder,
  actionButtonBgColor,
  actionButtonTextColor,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox bgcolor={bgcolor} padding={padding} borderRadius={borderRadius} boxShadow={boxShadow}>
        <Header borderBottom={headerBorderBottom}>
          {title && (
            <Typography variant="h6" className={titleClassName} style={titleStyle}>
              {title}
            </Typography>
          )}
          {closeButton && (
            <CloseButton size={closeButtonSize} color={closeButtonColor} onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          )}
        </Header>
        <ContentBox className={contentClassName} style={contentStyle}>
          {content}
        </ContentBox>
        <Box mt={2} display="flex" justifyContent="flex-end" className={actionsClassName} style={actionsStyle}>
          {actions && actions.map((action, index) => (
            <ActionButton
              key={index}
              variant={action.variant}
              color={action.color}
              onClick={action.onClick}
              style={{
                ...action.style,
                borderRadius: actionButtonBorderRadius,
                margin: actionButtonMargin,
                boxShadow: actionButtonShadow,
                border: actionButtonBorder,
                backgroundColor: actionButtonBgColor,
                color: actionButtonTextColor,
              }}
            >
              {action.label}
            </ActionButton>
          ))}
        </Box>
      </CustomBox>
    </Modal>
  );
};

HICModal.propTypes = {
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
  bgcolor: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  boxShadow: PropTypes.string,
  headerBorderBottom: PropTypes.string,
  titleClassName: PropTypes.string,
  titleStyle: PropTypes.object,
  contentClassName: PropTypes.string,
  contentStyle: PropTypes.object,
  actionsClassName: PropTypes.string,
  actionsStyle: PropTypes.object,
  closeButton: PropTypes.bool,
  closeButtonSize: PropTypes.string,
  closeButtonColor: PropTypes.string,
  actionButtonBorderRadius: PropTypes.string,
  actionButtonMargin: PropTypes.string,
  actionButtonShadow: PropTypes.string,
  actionButtonBorder: PropTypes.string,
  actionButtonBgColor: PropTypes.string,
  actionButtonTextColor: PropTypes.string,
};

HICModal.defaultProps = {
  title: '',
  content: null,
  actions: [],
  bgcolor: '',
  padding: '16px',
  borderRadius: '12px',
  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
  headerBorderBottom: '1px solid #e0e0e0',
  titleClassName: '',
  titleStyle: {},
  contentClassName: '',
  contentStyle: {},
  actionsClassName: '',
  actionsStyle: {},
  closeButton: true,
  closeButtonSize: 'medium',
  closeButtonColor: 'default',
  actionButtonBorderRadius: '50px',
  actionButtonMargin: '0 8px',
  actionButtonShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
  actionButtonBorder: '1px solid #ccc',
  actionButtonBgColor: '',
  actionButtonTextColor: '',
};

export default HICModal;