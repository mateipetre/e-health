import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HICCalendar = ({ onDateClick, selectedDate }) => {
  const [calendarDate, setCalendarDate] = useState(selectedDate || new Date());

  const handleDateChange = (date) => {
    setCalendarDate(date);
    if (onDateClick) {
      onDateClick(date);
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={calendarDate}
        tileClassName={({ date, view }) => {
          return view === 'month' && date.getDay() === 0 ? 'sunday' : null;
        }}
      />
    </div>
  );
};

HICCalendar.propTypes = {
  onDateClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
};

export default HICCalendar;
