import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, FormControl, FormHelperText, FormLabel } from '@mui/material';
import { styled } from '@mui/system';

const CustomFormControl = styled(FormControl)(({ labelSide, size }) => ({
  display: 'flex',
  flexDirection: labelSide === 'left' ? 'row' : 'column',
  alignItems: labelSide === 'left' ? 'center' : 'flex-start',
  marginBottom: '1rem',
  width: size === 'small' ? '200px' : size === 'medium' ? '300px' : '400px',
}));

const CustomFormLabel = styled(FormLabel)(({ labelSide }) => ({
  marginRight: labelSide === 'left' ? '1rem' : '0',
}));

const CustomSelect = styled(Select)(({ size }) => ({
  border: '3px solid',
  borderColor: '#6a9fb5', // Darker pastel blue
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#6a9fb5',
  },
  '& .MuiSelect-select': {
    padding: size === 'small' ? '8px' : size === 'medium' ? '10px' : '12px',
  },
}));

const BoldPlaceholder = styled('em')({
  fontWeight: 'bold',
  color: '#aaa',
});

const HICDropdown = ({
  label,
  options,
  multiple,
  disabled,
  onChange,
  value,
  placeholder,
  className,
  style,
  labelClassName,
  labelStyle,
  labelSide,
  helperText,
  error,
  size,
}) => {
  return (
    <CustomFormControl className={className} style={style} error={error} labelSide={labelSide} size={size}>
      {label && (
        <CustomFormLabel className={labelClassName} style={labelStyle} labelSide={labelSide}>
          {label}
        </CustomFormLabel>
      )}
      <CustomSelect
        multiple={multiple}
        disabled={disabled}
        onChange={onChange}
        value={value}
        displayEmpty
        renderValue={(selected) => {
          if (!selected || selected.length === 0) {
            return <BoldPlaceholder>{placeholder}</BoldPlaceholder>;
          }
          if (multiple) {
            return selected.join(', ');
          }
          return selected;
        }}
        size={size}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CustomSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </CustomFormControl>
  );
};

HICDropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  labelClassName: PropTypes.string,
  labelStyle: PropTypes.object,
  labelSide: PropTypes.oneOf(['top', 'left']),
  helperText: PropTypes.string,
  error: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

HICDropdown.defaultProps = {
  label: '',
  multiple: false,
  disabled: false,
  placeholder: 'Select...',
  className: '',
  style: {},
  labelClassName: '',
  labelStyle: {},
  labelSide: 'top',
  helperText: '',
  error: false,
  size: 'medium',
};

export default HICDropdown;