// HICBreadcrumbItem.js
import React from 'react';
import { Link, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';

const HICBreadcrumbLink = styled(Link)(({ isActive }) => ({
  color: isActive ? '#000' : '#1976d2',
  textDecoration: 'none',
  fontWeight: isActive ? 'bold' : 'normal',
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  fontFamily: 'Lato, sans-serif',
}));

const HICBreadcrumbTypography = styled(Typography)({
  color: '#000',
  fontWeight: 'bold',
  fontFamily: 'Lato, sans-serif',
});

const HICBreadcrumbItem = ({ label, to }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  return to ? (
    <HICBreadcrumbLink onClick={() => navigate(to)} isActive={isActive}>
      {label}
    </HICBreadcrumbLink>
  ) : (
    <HICBreadcrumbTypography>
      {label}
    </HICBreadcrumbTypography>
  );
};

export default HICBreadcrumbItem;