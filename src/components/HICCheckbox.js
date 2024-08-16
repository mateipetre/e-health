import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Checkbox as MuiCheckbox, FormControl, Grid } from '@mui/material';
import { styled } from '@mui/system';

const CustomFormControl = styled(FormControl)(({ inline }) => ({
  display: inline ? 'inline-flex' : 'flex',
  flexDirection: inline ? 'row' : 'column',
  alignItems: inline ? 'center' : 'flex-start',
  marginBottom: '10px', // Adjust as needed
}));

const CustomFormControlLabel = styled(FormControlLabel)(({ labelSide }) => ({
  flexDirection: labelSide === 'end' ? 'row-reverse' : 'row',
}));

const HICCheckbox = ({
  id,
  label,
  name,
  inline,
  labelSide = 'start', // Default label position
  disabled = false,
  onChange,
  className,
  style,
  labelClassName,
  labelStyle,
  checked,
  ...props
}) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <CustomFormControl inline={inline}>
          <CustomFormControlLabel
            control={
              <MuiCheckbox
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                {...props}
              />
            }
            label={label}
            labelPlacement={labelSide}
            className={labelClassName}
            style={labelStyle}
          />
        </CustomFormControl>
      </Grid>
    </Grid>
  );
};

HICCheckbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  inline: PropTypes.bool,
  labelSide: PropTypes.oneOf(['start', 'end']),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  labelClassName: PropTypes.string,
  labelStyle: PropTypes.object,
  checked: PropTypes.bool.isRequired,
};

export default HICCheckbox;