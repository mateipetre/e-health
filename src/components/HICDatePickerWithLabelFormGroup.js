import React from 'react';
import PropTypes from 'prop-types';
import HICDatePicker from './HICDatePicker';
import HICLabel from './HICLabel';

const HICDatePickerWithLabelFormGroup = ({ initialDate, onDateChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
    <HICLabel text="Date Picker" variant="h6" style={{ marginBottom: '16px' }} />
    <HICDatePicker
      initialDate={initialDate}
      onDateChange={onDateChange}
      labelDate="Select Date"
    />
  </div>
);

HICDatePickerWithLabelFormGroup.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
};

export default HICDatePickerWithLabelFormGroup;