import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Radio, Typography } from '@mui/material';

const HICRadio = ({
  label,
  name,
  id,
  value,
  checked,
  disabled,
  inline,
  isInvalid,
  isValid,
  feedback,
  onChange,
  className,
  style,
}) => {

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const radioProps = {
    id,
    value,
    checked,
    onChange: handleChange,
    disabled,
    className,
    style,
  };

  const labelProps = {
    label,
    control: <Radio {...radioProps} />,
    className: inline ? 'inline-label' : undefined,
  };

  return (
    <div>
      <FormControlLabel {...labelProps} />
      {(isInvalid || isValid) && (
        <Typography variant="body2" color={isInvalid ? 'error' : 'success'}>
          {feedback}
        </Typography>
      )}
    </div>
  );
};

HICRadio.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isValid: PropTypes.bool,
  feedback: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

HICRadio.defaultProps = {
  checked: false,
  disabled: false,
  inline: false,
  isInvalid: false,
  isValid: false,
  feedback: '',
  onChange: () => {},
  className: '',
  style: {},
};

export default HICRadio;