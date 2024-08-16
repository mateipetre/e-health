import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledTabs = styled(Tabs)(({ styleProps }) => ({
  backgroundColor: styleProps.backgroundColor,
  '& .MuiTabs-indicator': {
    backgroundColor: styleProps.indicatorColor,
  },
}));

const StyledTab = styled(Tab)(({ styleProps }) => ({
  color: styleProps.tabColor,
  '&.Mui-selected': {
    color: styleProps.selectedTabColor,
  },
}));

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const HICTab = ({
  tabs,
  selectedIndex,
  onChange,
  backgroundColor,
  indicatorColor,
  tabColor,
  selectedTabColor,
  ...rest
}) => {
  const styleProps = {
    backgroundColor: backgroundColor || '#e0e0e0',
    indicatorColor: indicatorColor || '#1976d2',
    tabColor: tabColor || '#000',
    selectedTabColor: selectedTabColor || '#1976d2',
  };

  return (
    <Box>
      <StyledTabs
        value={selectedIndex}
        onChange={onChange}
        styleProps={styleProps}
        {...rest}
      >
        {tabs.map((tab, index) => (
          <StyledTab
            key={index}
            label={tab.label}
            styleProps={styleProps}
            {...rest}
          />
        ))}
      </StyledTabs>
      {tabs.map((tab, index) => (
        <TabPanel value={selectedIndex} index={index} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

HICTab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  indicatorColor: PropTypes.string,
  tabColor: PropTypes.string,
  selectedTabColor: PropTypes.string,
};

HICTab.defaultProps = {
  backgroundColor: '#e0e0e0',
  indicatorColor: '#1976d2',
  tabColor: '#000',
  selectedTabColor: '#1976d2',
};

export default HICTab;