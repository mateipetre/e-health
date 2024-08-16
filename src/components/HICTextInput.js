import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputLabel, InputAdornment, FormControl, FormHelperText } from '@mui/material';
import { styled } from '@mui/system';

const StyledFormControl = styled(FormControl)(({ backgroundColor, borderColor, textColor, borderRadius }) => ({
  marginBottom: '16px',
  '& .MuiInputBase-root': {
    backgroundColor: backgroundColor || '#fff',
    color: textColor || '#000',
    borderRadius: borderRadius || '8px',
    borderColor: borderColor || '#ccc',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: borderColor || '#ccc',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: borderColor || '#2196f3',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#2196f3',
  },
  '& .MuiInputLabel-root': {
    color: textColor || '#000',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#2196f3',
  },
}));

const HICTextInput = ({
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
    <StyledFormControl
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      textColor={textColor}
      borderRadius={borderRadius}
      className={className}
      style={style}
      error={error || isInvalid}
      disabled={disabled}
      fullWidth
      {...rest}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        startAdornment={startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : null}
        endAdornment={endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null}
      />
      {(helperText || feedback) && <FormHelperText>{helperText || feedback}</FormHelperText>}
      {isValid && <div style={{ color: 'green', marginTop: '0.5rem' }}>Valid</div>}
      {isInvalid && <div style={{ color: 'red', marginTop: '0.5rem' }}>Invalid</div>}
    </StyledFormControl>
  );
};

HICTextInput.propTypes = {
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

HICTextInput.defaultProps = {
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

export default HICTextInput;