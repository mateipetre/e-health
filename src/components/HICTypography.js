import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Typography as MuiTypography } from '@mui/material';

const StyledTypography = styled(MuiTypography)(({ theme, ...props }) => ({
  color: props.color || theme.palette.text.primary,
  fontWeight: props.fontWeight || 'normal',
  fontStyle: props.fontStyle || 'normal',
  textDecoration: props.textDecoration || 'none',
  textAlign: props.textAlign || 'left',
  margin: props.margin || '0',
  padding: props.padding || '0',
  letterSpacing: props.letterSpacing || 'normal',
  lineHeight: props.lineHeight || 'normal',
  ...props.style,
}));

const HICTypography = ({
  variant,
  component,
  color,
  fontWeight,
  fontStyle,
  textDecoration,
  textAlign,
  margin,
  padding,
  letterSpacing,
  lineHeight,
  children,
  style,
  ...rest
}) => {
  return (
    <StyledTypography
      variant={variant}
      component={component}
      color={color}
      fontWeight={fontWeight}
      fontStyle={fontStyle}
      textDecoration={textDecoration}
      textAlign={textAlign}
      margin={margin}
      padding={padding}
      letterSpacing={letterSpacing}
      lineHeight={lineHeight}
      style={style}
      {...rest}
    >
      {children}
    </StyledTypography>
  );
};

HICTypography.propTypes = {
  variant: PropTypes.string,
  component: PropTypes.elementType,
  color: PropTypes.string,
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontStyle: PropTypes.string,
  textDecoration: PropTypes.string,
  textAlign: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  letterSpacing: PropTypes.string,
  lineHeight: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

HICTypography.defaultProps = {
  variant: 'body1',
  component: 'p',
  color: 'inherit',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  textAlign: 'left',
  margin: '0',
  padding: '0',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  style: {},
};

export default HICTypography;