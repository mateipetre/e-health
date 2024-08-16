import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, OutlinedInput } from '@mui/material';
import { styled } from '@mui/system';

const StyledFormControl = styled(FormControl)(({ styleProps }) => ({
  margin: styleProps.margin || '8px',
  minWidth: styleProps.minWidth || '120px',
  ...styleProps.customStyles,
  '& .MuiInputLabel-root': {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#333',
  },
  '& .MuiOutlinedInput-root': {
    fontSize: '1rem',
    fontWeight: '400',
    padding: '10px 14px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.3)',
    '& fieldset': {
      borderColor: '#2196f3',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#1976d2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
  '& .MuiSelect-root': {
    paddingRight: '32px',
  },
  '& .MuiMenuItem-root': {
    fontSize: '0.9rem',
    fontWeight: '400',
  },
  '& .MuiFormHelperText-root': {
    fontSize: '0.8rem',
    color: '#666',
  },
}));

const HICSelect = ({
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  variant,
  color,
  size,
  disabled,
  required,
  fullWidth,
  margin,
  minWidth,
  customStyles,
  className,
  style,
  defaultSelected,
}) => {
  useEffect(() => {
    if (defaultSelected && !value) {
      onChange({ target: { value: defaultSelected } });
    }
  }, [defaultSelected, value, onChange]);

  return (
    <StyledFormControl
      variant={variant}
      error={error}
      disabled={disabled}
      required={required}
      fullWidth={fullWidth}
      styleProps={{ margin, minWidth, customStyles }}
      className={className}
      style={style}
    >
      {label && <InputLabel shrink>{label}</InputLabel>}
      <Select
        value={value}
        onChange={onChange}
        color={color}
        size={size}
        displayEmpty
        input={<OutlinedInput notched={false} label={label} />}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </StyledFormControl>
  );
};

HICSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
  size: PropTypes.oneOf(['small', 'medium']),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  minWidth: PropTypes.string,
  customStyles: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

HICSelect.defaultProps = {
  label: '',
  error: false,
  helperText: '',
  variant: 'outlined',
  color: 'primary',
  size: 'medium',
  disabled: false,
  required: false,
  fullWidth: false,
  margin: '8px',
  minWidth: '120px',
  customStyles: {},
  className: '',
  style: {},
  defaultSelected: '',
};

export default HICSelect;