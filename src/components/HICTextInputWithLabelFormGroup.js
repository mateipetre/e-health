import React from 'react';
import PropTypes from 'prop-types';
import HICTextInput from './HICTextInput'; // Ensure the correct path
import HICLabel from './HICLabel'; // Ensure the correct path

const HICTextInputWithLabelFormGroup = ({
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
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
    <HICLabel text={label} variant="body1" style={{ marginBottom: '8px' }} />
    <HICTextInput
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      textColor={textColor}
      borderRadius={borderRadius}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      error={error}
      helperText={helperText}
      disabled={disabled}
      isValid={isValid}
      isInvalid={isInvalid}
      feedback={feedback}
      name={name}
      rows={rows}
      size={size}
      defaultValue={defaultValue}
      className={className}
      style={style}
    />
  </div>
);

HICTextInputWithLabelFormGroup.propTypes = {
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

HICTextInputWithLabelFormGroup.defaultProps = {
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

export default HICTextInputWithLabelFormGroup;