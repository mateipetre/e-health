import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import {
  TextField,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 14px',
  },
});

const StyledPaper = styled(Paper)({
  position: 'absolute',
  width: '100%',
  marginTop: '4px',
  borderRadius: '8px',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1,
  maxHeight: '200px',
  overflowY: 'auto',
});

const NoOptionsText = styled('div')({
  padding: '8px',
  color: '#999',
  textAlign: 'center',
});

const HICTypeahead = ({
  id,
  value,
  onChange,
  onFetch,
  label,
  placeholder,
  disabled,
  isLoading,
  options,
  noOptionsText,
  clearable,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
    onFetch(newValue);
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    onChange(option);
    setShowOptions(false);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    setShowOptions(false);
  };

  return (
    <div style={{ position: 'relative', ...rest.style }}>
      <StyledTextField
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <>
              {isLoading ? (
                <CircularProgress size={20} />
              ) : (
                clearable && inputValue && (
                  <InputAdornment position="end">
                    <CloseIcon onClick={handleClear} style={{ cursor: 'pointer' }} />
                  </InputAdornment>
                )
              )}
            </>
          ),
        }}
      />
      {showOptions && (
        <StyledPaper>
          {options.length === 0 ? (
            <NoOptionsText>{noOptionsText}</NoOptionsText>
          ) : (
            <List>
              {options.map((option, index) => (
                <ListItem button key={index} onClick={() => handleOptionClick(option)}>
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </List>
          )}
        </StyledPaper>
      )}
    </div>
  );
};

HICTypeahead.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFetch: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
  noOptionsText: PropTypes.string,
  clearable: PropTypes.bool,
};

HICTypeahead.defaultProps = {
  value: '',
  label: '',
  placeholder: 'Search...',
  disabled: false,
  isLoading: false,
  options: [],
  noOptionsText: 'No options',
  clearable: true,
};

export default HICTypeahead;