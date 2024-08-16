import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import { styled } from '@mui/system';

const CustomContainer = styled(Container)(({ fluid }) => ({
  width: fluid ? '100%' : 'auto',
  paddingLeft: fluid ? 0 : undefined,
  paddingRight: fluid ? 0 : undefined,
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const HICContainer = ({ as, fluid, className, children, style, ...rest }) => {
  return (
    <CustomContainer
      as={as}
      fluid={fluid}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </CustomContainer>
  );
};

HICContainer.propTypes = {
  as: PropTypes.elementType,
  fluid: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

HICContainer.defaultProps = {
  as: 'div',
  fluid: false,
  className: '',
  children: null,
  style: {},
};

export default HICContainer;