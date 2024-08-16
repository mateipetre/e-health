import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
    border: '3px solid #357ca5',
    backgroundColor: '#e6f7ff',
  },
});

const HICDatePicker = ({
  initialDate = new Date(),
  onDateChange,
  labelDate = "Select Date",
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  // Update state when initialDate changes
  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  const handleResetClick = () => {
    const resetDate = new Date();
    setSelectedDate(resetDate);
    onDateChange(resetDate);
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
      <Box mt={2} width='100%'>
        <HICImage
          src="/reset64.png"
          alt="Reset date"
          onClick={handleResetClick}
          width="40px"
          height="40px"
          cursorStyle="pointer"
          tooltip="Reset date"
        />
      </Box>
    </PickerWrapper>
  );
};

HICDatePicker.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
  labelDate: PropTypes.string,
};

export default HICDatePicker;