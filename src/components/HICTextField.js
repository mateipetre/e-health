import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)(({ backgroundColor, borderColor, textColor, borderRadius }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: backgroundColor || '#fff',
    color: textColor || '#000',
    borderRadius: borderRadius || '8px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: borderColor || '#ccc',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: borderColor || '#2196f3',
  },
  '& .MuiInputLabel-root': {
    color: textColor || '#000',
  },
}));

const HICTextField = ({
  id,
  label,
  value,
  onChange,
  type,
  backgroundColor,
  borderColor,
  textColor,
  borderRadius,
  startAdornment,
  endAdornment,
  error,
  helperText,
  disabled,
  isValid,
  isInvalid,
  feedback,
  name,
  rows,
  size,
  defaultValue,
  className,
  style,
  ...rest
}) => {
  return (
    <div style={{ position: 'relative', marginBottom: '1rem' }}>
      <StyledTextField
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        variant="outlined"
        fullWidth
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        textColor={textColor}
        borderRadius={borderRadius}
        error={error || isInvalid}
        helperText={helperText || feedback}
        disabled={disabled}
        name={name}
        rows={rows}
        size={size}
        defaultValue={defaultValue}
        className={className}
        style={style}
        InputProps={{
          startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : null,
          endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null,
        }}
        {...rest}
      />
      {isValid && <div style={{ color: 'green', marginTop: '0.5rem' }}>Valid</div>}
      {isInvalid && <div style={{ color: 'red', marginTop: '0.5rem' }}>Invalid</div>}
    </div>
  );
};

HICTextField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  borderRadius: PropTypes.string,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
  feedback: PropTypes.string,
  name: PropTypes.string,
  rows: PropTypes.number,
  size: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
};

HICTextField.defaultProps = {
  type: 'text',
  backgroundColor: '#fff',
  borderColor: '#ccc',
  textColor: '#000',
  borderRadius: '8px',
  error: false,
  disabled: false,
  isValid: false,
  isInvalid: false,
  feedback: '',
  rows: 1,
  size: 'medium',
};

export default HICTextField;