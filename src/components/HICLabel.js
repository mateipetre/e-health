import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const CustomLabel = styled(Typography)(({ theme, bgcolor, color, border, shadow }) => ({
  backgroundColor: bgcolor || 'transparent',
  color: color || theme.palette.text.primary,
  border: border || 'none',
  padding: '8px 16px',
  borderRadius: '12px',
  boxShadow: shadow || 'none',
  fontWeight: 'bold',
  display: 'inline-block',
}));

const HICLabel = ({
  text,
  title,
  variant,
  bgcolor,
  color,
  border,
  shadow,
  className,
  style,
  ...props
}) => {
  return (
    <CustomLabel
      variant={variant}
      bgcolor={bgcolor}
      color={color}
      border={border}
      shadow={shadow}
      className={className}
      style={style}
      title={title}
      {...props}
    >
      {text}
    </CustomLabel>
  );
};

HICLabel.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string,
  variant: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
    'subtitle1', 'subtitle2', 'body1', 'body2', 
    'caption', 'overline', 'button'
  ]),
  bgcolor: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  shadow: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

HICLabel.defaultProps = {
  variant: 'body1',
  title: '',
  bgcolor: '',
  color: '',
  border: '',
  shadow: '',
  className: '',
  style: {},
};

export default HICLabel;