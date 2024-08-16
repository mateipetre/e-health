import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPill = styled.div`
  display: inline-block;
  padding: ${({ padding }) => padding};
  border-radius: ${({ borderRadius }) => borderRadius};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  box-shadow: ${({ boxShadow }) => boxShadow};
  border: ${({ border }) => border};
  text-transform: ${({ textTransform }) => textTransform};
`;

const HICPill = ({
  text,
  bgColor,
  textColor,
  padding,
  borderRadius,
  fontSize,
  fontWeight,
  boxShadow,
  border,
  textTransform,
  className,
  style,
}) => {
  return (
    <StyledPill
      className={className}
      style={style}
      bgColor={bgColor}
      textColor={textColor}
      padding={padding}
      borderRadius={borderRadius}
      fontSize={fontSize}
      fontWeight={fontWeight}
      boxShadow={boxShadow}
      border={border}
      textTransform={textTransform}
    >
      {text}
    </StyledPill>
  );
};

HICPill.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  boxShadow: PropTypes.string,
  border: PropTypes.string,
  textTransform: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

HICPill.defaultProps = {
  bgColor: '#2196F3',
  textColor: '#FFFFFF',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '0.875rem',
  fontWeight: '500',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  border: 'none',
  textTransform: 'uppercase',
};

export default HICPill;