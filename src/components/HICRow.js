import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';

// Define the custom HICRow component
const HICRow = ({ 
  alignItems, 
  justifyContent, 
  spacing, 
  wrap, 
  children, 
  className, 
  style, 
  ...rest 
}) => {

  const StyledGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    alignItems: alignItems || 'flex-start',
    justifyContent: justifyContent || 'flex-start',
    gap: theme.spacing(spacing || 0), // Use Material-UI spacing system
    ...style,
  }));

  return (
    <StyledGrid className={className} {...rest}>
      {children}
    </StyledGrid>
  );
};

// Define the prop types for validation
HICRow.propTypes = {
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  justifyContent: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']),
  spacing: PropTypes.number,
  wrap: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default HICRow;