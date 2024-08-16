import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Box, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { logout } from '../user/user-slice';
import useTranslator from '../hooks/useTranslator';
import pageMap from './pageMap';
import HICLanguageSelector from '../components/HICLanguageSelector';

const StyledAppBar = styled(AppBar)(({ bgcolor, boxShadow }) => ({
  backgroundColor: bgcolor || '#aec6cf', // Pastel color as default
  boxShadow: boxShadow || '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  fontFamily: 'Lato, sans-serif', // Lato font
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const CustomButton = styled(Button)({
  textTransform: 'none', // Ensure text is not all capital letters
  fontFamily: 'Lato, sans-serif', // Lato font
});

const CustomIconButton = styled(IconButton)({
  fontFamily: 'Lato, sans-serif', // Lato font
});

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslator();
  const { permissions, user } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);

  const handleMenuOpen = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menu);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
  };

  const navigateTo = (location) => {
    navigate(location);
  };

  const dividerAboveLabels = [
    'scheduling.appointments.new',
    'labs.requests.new',
    'medications.requests.new',
    'incidents.reports.new',
    'imagings.requests.new',
    'settings.label',
  ];

  function getDropdownListOfPages(pages) {
    return pages
      .filter((page) => !page.permission || permissions.includes(page.permission))
      .map((page) => ({
        label: t(page.label),
        href: page.path,
        dividerAbove: dividerAboveLabels.includes(page.label),
      }));
  }

  const hamburgerPages = Object.keys(pageMap).map((key) => pageMap[key]);
  const addPages = [
    pageMap.newPatient,
    pageMap.newAppointment,
    pageMap.newMedication,
    pageMap.newLab,
    pageMap.newImaging,
    pageMap.newIncident,
  ];

  const links = hamburgerPages.map((page) => ({
    label: t(page.label),
    href: page.path,
  }));

  const dropdowns = [
    {
      label: 'Add',
      menu: 'add',
      items: getDropdownListOfPages(addPages),
    },
    {
      label: `${t('user.login.currentlySignedInAs')} ${user?.givenName} ${user?.familyName}`,
      menu: 'user',
      items: [
        {
          label: t('settings.label'),
          href: '/settings',
        },
        {
          label: t('actions.logout'),
          href: '/login',
          onClick: () => {
            dispatch(logout());
            navigateTo('/login');
          },
        },
      ],
    },
  ];

  const icons = [
    {
      icon: 'home',
      onClick: () => navigateTo('/'),
    },
  ];

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Box display="flex" alignItems="center">
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="path_to_logo" alt="Logo" style={{ marginRight: '16px', height: '40px' }} />
          </Link>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" style={{ fontFamily: 'Lato, sans-serif', fontWeight: 'bold' }}>
              HospitalRun
            </Typography>
          </Link>
        </Box>
        <Box display="flex" alignItems="center">
          {links.map((link, index) => (
            <CustomButton key={index} color="inherit" component={Link} to={link.href}>
              {link.label}
            </CustomButton>
          ))}
          {dropdowns.map((dropdown, index) => (
            <div key={index}>
              <CustomButton
                color="inherit"
                onClick={(e) => handleMenuOpen(e, dropdown.menu)}
              >
                {dropdown.label}
              </CustomButton>
              <Menu
                anchorEl={anchorEl}
                open={currentMenu === dropdown.menu}
                onClose={handleMenuClose}
              >
                {dropdown.items.map((item, idx) => (
                  <MenuItem key={idx} onClick={handleMenuClose}>
                    <Link to={item.href} style={{ textDecoration: 'none', color: 'inherit', fontFamily: 'Lato, sans-serif' }}>
                      {item.label}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          ))}
          {icons.map((icon, index) => (
            <CustomIconButton key={index} color="inherit" onClick={icon.onClick}>
              <FontAwesomeIcon icon={icon.icon} />
            </CustomIconButton>
          ))}
          <CustomIconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </CustomIconButton>
          <HICLanguageSelector />
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

Navbar.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  dropdowns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      menu: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object.isRequired,
      onClick: PropTypes.func,
    })
  ),
  bgcolor: PropTypes.string,
  boxShadow: PropTypes.string,
  titleStyle: PropTypes.object,
  linkStyle: PropTypes.object,
  iconStyle: PropTypes.object,
};

Navbar.defaultProps = {
  title: '',
  links: [],
  dropdowns: [],
  icons: [],
  bgcolor: '#aec6cf', // Pastel color as default
  boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  titleStyle: {},
  linkStyle: {},
  iconStyle: {},
};

export default Navbar;