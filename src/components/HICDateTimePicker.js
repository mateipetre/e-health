import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import HICImage from './HICImage';

const PickerWrapper = styled('div')({
  fontFamily: 'Lato, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& .react-datepicker-wrapper': {
    width: '100%',
    marginBottom: '16px',
  },
  '& .react-datepicker__input-container input': {
    width: '100%',
    padding: '10px',
    fontFamily: 'Lato, sans-serif',
    borderRadius: '12px',
    border: '3px solid #357ca5', /* Thicker border, darker pastel blue */
    backgroundColor: '#e6f7ff', /* Brighter pastel blue background */
  },
  '& .react-time-picker': {
    width: '100%',
    marginBottom: '16px',
  },
  '& .react-time-picker__wrapper': {
    width: '100%',
    padding: '10px',
    fontFamily: 'Lato, sans-serif',
    borderRadius: '12px',
    border: '3px solid #357ca5', /* Thicker border, darker pastel blue */
    backgroundColor: '#e6f7ff', /* Brighter pastel blue background */
  },
});

const HICDateTimePicker = ({
  initialDateTime = new Date(),
  onDateTimeChange,
  labelDate = "Select Date",
  labelTime = "Select Time",
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDateTime);
  const [selectedTime, setSelectedTime] = useState(initialDateTime);

  // Update states when initialDateTime changes
  useEffect(() => {
    setSelectedDate(initialDateTime);
    setSelectedTime(initialDateTime);
  }, [initialDateTime]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    const updatedDateTime = new Date(newDate);
    updatedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
    onDateTimeChange(updatedDateTime);
  };

  const handleTimeChange = (newTime) => {
    if (newTime) {
      const [hours, minutes] = newTime.split(':').map(Number);
      const updatedDateTime = new Date(selectedDate);
      updatedDateTime.setHours(hours, minutes);
      setSelectedTime(updatedDateTime);
      onDateTimeChange(updatedDateTime);
    }
  };

  const handleResetClick = () => {
    setSelectedDate(new Date()); // Reset to initialDateTime
    setSelectedTime(new Date()); // Reset to initialDateTime
    onDateTimeChange(new Date()); // Propagate reset value
  };

  return (
    <PickerWrapper>
      <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>{labelDate}</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        className="react-datepicker__input-container"
        {...props}
      />
      <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>{labelTime}</label>
      <TimePicker
        onChange={handleTimeChange}
        value={selectedTime.toTimeString().slice(0, 5)}
        className="react-time-picker"
        disableClock
        {...props}
      />
      <Box mt={2} width='100%'>
      <HICImage
          src="/reset64.png"
          alt="Reset date and time"
          onClick={handleResetClick}
          width="40px"
          height="40px"
          cursorStyle="pointer"
          tooltip="Reset date and time"
        />
      </Box>
    </PickerWrapper>
  );
};

HICDateTimePicker.propTypes = {
  initialDateTime: PropTypes.instanceOf(Date),
  onDateTimeChange: PropTypes.func.isRequired,
  labelDate: PropTypes.string,
  labelTime: PropTypes.string,
};

export default HICDateTimePicker;