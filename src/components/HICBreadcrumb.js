// HICBreadcrumb.js
import React from 'react';
import { Breadcrumbs } from '@mui/material';
import { styled } from '@mui/system';
import HICBreadcrumbItem from './HICBreadcrumbItem';

// Styled component for HIC Breadcrumb
const HICStyledBreadcrumbs = styled(Breadcrumbs)({
  padding: '8px 16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
  fontFamily: 'Lato, sans-serif',
});

const HICBreadcrumb = ({ breadcrumbs }) => {
  return (
    <HICStyledBreadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <HICBreadcrumbItem key={index} label={breadcrumb.label} to={breadcrumb.to} />
      ))}
    </HICStyledBreadcrumbs>
  );
};

export default HICBreadcrumb;