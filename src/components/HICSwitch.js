import React from 'react';
import PropTypes from 'prop-types';
import { Switch, FormControlLabel, FormGroup } from '@mui/material';
import { styled } from '@mui/system';

const CustomSwitch = styled(Switch)(({ styleProps }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: styleProps.checkedColor,
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: styleProps.checkedColor,
  },
  '& .MuiSwitch-track': {
    backgroundColor: styleProps.uncheckedColor,
  },
  '& .MuiSwitch-thumb': {
    width: styleProps.thumbSize,
    height: styleProps.thumbSize,
  },
  // eslint-disable-next-line no-dupe-keys
  '& .MuiSwitch-track': {
    borderRadius: styleProps.trackBorderRadius,
  },
}));

const HICSwitch = ({
  checked,
  onChange,
  label,
  labelPlacement,
  disabled,
  checkedColor,
  uncheckedColor,
  thumbSize,
  trackBorderRadius,
  ...rest
}) => {
  const styleProps = {
    checkedColor: checkedColor || '#1976d2',
    uncheckedColor: uncheckedColor || '#bdbdbd',
    thumbSize: thumbSize || 20,
    trackBorderRadius: trackBorderRadius || 16,
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <CustomSwitch
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            styleProps={styleProps}
            {...rest}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
    </FormGroup>
  );
};

HICSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  labelPlacement: PropTypes.oneOf(['end', 'start', 'top', 'bottom']),
  disabled: PropTypes.bool,
  checkedColor: PropTypes.string,
  uncheckedColor: PropTypes.string,
  thumbSize: PropTypes.number,
  trackBorderRadius: PropTypes.number,
};

HICSwitch.defaultProps = {
  label: '',
  labelPlacement: 'end',
  disabled: false,
  checkedColor: '#1976d2',
  uncheckedColor: '#bdbdbd',
  thumbSize: 20,
  trackBorderRadius: 16,
};

export default HICSwitch;