import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const PanelContainer = styled(Box)(({ color, borderColor, boxShadow, borderWidth, borderStyle, borderRadius }) => ({
  backgroundColor: color || '#fff',
  border: `${borderWidth || '1px'} ${borderStyle || 'solid'} ${borderColor || '#ddd'}`,
  borderRadius: borderRadius || '8px',
  boxShadow: boxShadow || '0px 2px 4px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  marginBottom: '16px',
}));

const PanelHeader = styled(Box)(({ headerColor }) => ({
  backgroundColor: headerColor || '#f5f5f5',
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
}));

const PanelContent = styled(Box)(({ padding }) => ({
  padding: padding || '16px',
}));

const PanelFooter = styled(Box)(({ footerColor }) => ({
  backgroundColor: footerColor || '#f5f5f5',
  padding: '16px',
  borderTop: '1px solid #ddd',
}));

const HICPanel = ({
  color,
  children,
  footer,
  title,
  collapsible,
  collapsed: initialCollapsed,
  headerColor,
  footerColor,
  borderColor,
  boxShadow,
  padding,
  titleStyle,
  borderWidth,
  borderStyle,
  borderRadius,
}) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <PanelContainer
      color={color}
      borderColor={borderColor}
      boxShadow={boxShadow}
      borderWidth={borderWidth}
      borderStyle={borderStyle}
      borderRadius={borderRadius}
    >
      <PanelHeader onClick={collapsible ? handleToggleCollapse : undefined} headerColor={headerColor}>
        <Typography variant="h6" style={{ fontFamily: 'Lato, sans-serif', ...titleStyle }}>
          {title}
        </Typography>
        {collapsible && (
          <IconButton size="small">
            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        )}
      </PanelHeader>
      <Collapse in={!collapsed}>
        <PanelContent padding={padding}>
          {children}
        </PanelContent>
      </Collapse>
      {footer && <PanelFooter footerColor={footerColor}>{footer}</PanelFooter>}
    </PanelContainer>
  );
};

HICPanel.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  title: PropTypes.string,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  headerColor: PropTypes.string,
  footerColor: PropTypes.string,
  borderColor: PropTypes.string,
  boxShadow: PropTypes.string,
  padding: PropTypes.string,
  titleStyle: PropTypes.object,
  borderWidth: PropTypes.string,
  borderStyle: PropTypes.string,
  borderRadius: PropTypes.string,
};

HICPanel.defaultProps = {
  color: '#fff',
  collapsible: false,
  collapsed: false,
  headerColor: '#f5f5f5',
  footerColor: '#f5f5f5',
  borderColor: '#ddd',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  titleStyle: {},
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '8px',
};

export default HICPanel;