import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Box, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

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

const HICNavbar = ({
  logo,
  title,
  links,
  dropdowns,
  icons,
  bgcolor,
  boxShadow,
  titleStyle,
  linkStyle,
  iconStyle,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentMenu, setCurrentMenu] = React.useState(null);

  const handleMenuOpen = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menu);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
  };

  return (
    <StyledAppBar position="static" bgcolor={bgcolor} boxShadow={boxShadow}>
      <StyledToolbar>
        <Box display="flex" alignItems="center">
          {logo && (
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Logo" style={{ marginRight: '16px', height: '40px' }} />
            </Link>
          )}
          {title && (
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" style={{ ...titleStyle, fontFamily: 'Lato, sans-serif', fontWeight: 'bold' }}>
                {title}
              </Typography>
            </Link>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          {links && links.map((link, index) => (
            <CustomButton key={index} color="inherit" style={linkStyle} component={Link} to={link.href}>
              {link.label}
            </CustomButton>
          ))}
          {dropdowns && dropdowns.map((dropdown, index) => (
            <div key={index}>
              <CustomButton
                color="inherit"
                style={linkStyle}
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
          {icons && icons.map((icon, index) => (
            <CustomIconButton key={index} color="inherit" style={iconStyle} onClick={icon.onClick}>
              <FontAwesomeIcon icon={icon.icon} />
            </CustomIconButton>
          ))}
          <CustomIconButton edge="start" color="inherit" aria-label="menu" style={iconStyle}>
            <MenuIcon />
          </CustomIconButton>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

HICNavbar.propTypes = {
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

HICNavbar.defaultProps = {
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

export default HICNavbar;
