import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import Flag from 'react-world-flags';

const languages = [
  { code: 'ar', name: 'Arabic', flagCode: 'SA' },  // Added flagCode for Arabic
  { code: 'zh', name: 'Chinese', flagCode: 'CN' },
  { code: 'en', name: 'English', flagCode: 'GB' },
  { code: 'fr', name: 'French', flagCode: 'FR' },  // Added flagCode for French
  { code: 'de', name: 'German', flagCode: 'DE' },   // Added flagCode for German
  { code: 'id', name: 'Indonesian', flagCode: 'ID' },// Added flagCode for Indonesian
  { code: 'it', name: 'Italian', flagCode: 'IT' },   // Added flagCode for Italian
  { code: 'ja', name: 'Japanese', flagCode: 'JP' },
  { code: 'pt', name: 'Portuguese', flagCode: 'PT' },// Added flagCode for Portuguese
  { code: 'ro', name: 'Romanian', flagCode: 'RO' },  // Added flagCode for Romanian
  { code: 'ru', name: 'Russian', flagCode: 'RU' },
  { code: 'es', name: 'Spanish', flagCode: 'ES' },   // Added flagCode for Spanish
  { code: 'tr', name: 'Turkish', flagCode: 'TR' },   // Added flagCode for Turkish
];

const HICLanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    handleClose();
  };

  const selectedLang = languages.find((lang) => lang.code === selectedLanguage) || {};

  return (
    <Box sx={{ position: 'fixed', top: 16, right: 16, fontFamily: 'Lato, sans-serif', display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
        {selectedLang.flagCode ? (
          <Flag code={selectedLang.flagCode} style={{ width: '20px', marginRight: '8px' }} />
        ) : null}
        {selectedLang.name || 'English'}
      </Typography>
      <IconButton onClick={handleClick}>
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)} sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Lato, sans-serif' }}>
            <Flag code={lang.flagCode} style={{ width: '20px', marginRight: '10px' }} />
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default HICLanguageSelector;