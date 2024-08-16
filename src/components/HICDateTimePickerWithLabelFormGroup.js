import React from 'react';
import PropTypes from 'prop-types';
import HICDateTimePicker from './HICDateTimePicker';
import HICLabel from './HICLabel';

const HICDatePickerWithLabelFormGroup = ({ initialDateTime, onDateTimeChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
    <HICLabel text="Date and Time Picker" variant="h6" style={{ marginBottom: '16px' }} />
    <HICDateTimePicker
      initialDateTime={initialDateTime}
      onDateTimeChange={onDateTimeChange}
      labelDate="Select Date"
      labelTime="Select Time"
    />
  </div>
);

HICDatePickerWithLabelFormGroup.propTypes = {
  initialDateTime: PropTypes.instanceOf(Date),
  onDateTimeChange: PropTypes.func.isRequired,
};

export default HICDatePickerWithLabelFormGroup;
