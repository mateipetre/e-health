import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Box, Typography, IconButton, TextField, Button,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, startOfDay } from 'date-fns';
import axios from 'axios'; // Import axios
import HICErrorModal from '../../../../components/HICErrorModal';
import HICSuccessModal from '../../../../components/HICSuccessModal'; // Import HICSuccessModal

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '600px',
  width: '100%',
  border: '4px solid #6faaff',
}));

const pastelRed = '#ff6f6f';

const Header = styled(Box)({
  borderBottom: '2px solid #e0e0e0',
  paddingBottom: '12px',
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CloseButton = styled(IconButton)({
  color: '#336699',
});

const UpdateAppointmentModal = ({ open, onClose, appointment, onUpdate }) => {
  const [visitType, setVisitType] = useState('');
  const [doctor, setDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date('1970-01-01T00:00:00'));
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false); // Add state for success modal
  const [successModalContent, setSuccessModalContent] = useState(''); // Add content for success modal
  const [appointmentId, setAppointmentId] = useState('');

  useEffect(() => {
    if (appointment) {
      setVisitType(appointment.visitType || '');
      setDoctor(appointment.doctor || '');
      setSelectedDate(new Date(appointment.date || new Date()));
      setSelectedTime(new Date(`1970-01-01T${appointment.startingHour || '00:00'}:00`));
      setDuration(appointment.duration || '');
      setStatus(appointment.status || '');
      setAppointmentId(appointment._id);
    }
  }, [appointment]);

  const visitTypes = ['Urgent', 'Follow-up', 'New Symptom'];
  const doctors = ['Cardiologist - Andrei Dumitru', 'Dermatologist - Elena Ionescu', 'Oncologist - Ioan Popescu', 'General practitioner - Alex Matei', 'Endocrinologist - Maria Popescu'];
  const durations = [30, 45, 60];
  const statuses = ['Pending', 'Confirmed', 'Cancelled', 'Done'];

  const unavailableDates = {
    'Cardiologist - Andrei Dumitru': [
      new Date(2024, 8, 12), new Date(2024, 8, 14), new Date(2024, 8, 17),
      new Date(2024, 8, 19), new Date(2024, 8, 22), new Date(2024, 8, 24),
      new Date(2024, 8, 26)
    ],
    'Dermatologist - Elena Ionescu': [
      new Date(2024, 8, 15), new Date(2024, 8, 18), new Date(2024, 8, 21),
      new Date(2024, 8, 23), new Date(2024, 8, 27)
    ],
    'Oncologist - Ioan Popescu': [
      new Date(2024, 8, 13), new Date(2024, 8, 16), new Date(2024, 8, 20),
      new Date(2024, 8, 25), new Date(2024, 8, 28)
    ],
  };

  const isDateUnavailable = (date) => {
    const doctorUnavailableDates = unavailableDates[doctor] || [];
    return doctorUnavailableDates.some(d => startOfDay(d).toDateString() === startOfDay(date).toDateString());
  };

  const handleDateClick = (date) => {
    if (doctor && isDateUnavailable(date)) {
      setErrorModalContent('This day is fully booked for the selected doctor. Please choose another date.');
      setErrorModalOpen(true);
    } else {
      setSelectedDate(date);
      setShowDatePicker(false);
    }
  };

  const handleTimeChange = (date) => {
    setSelectedTime(date);
    setShowTimePicker(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isDateUnavailable(selectedDate)) {
      setErrorModalContent('This day is fully booked for the selected doctor. Please choose another date.');
      setErrorModalOpen(true);
      return;
    }

    const updatedAppointment = {
      visitType,
      doctor,
      date: format(selectedDate, 'yyyy-MM-dd'),
      startingHour: format(selectedTime, 'HH:mm'),
      duration,
      status,
    };

    try {
      await axios.put(`http://localhost:5000/patients/66cb68934f5769ec17d174a9/appointments/${appointmentId}`, updatedAppointment);
      setSuccessModalContent('Appointment successfully updated.');
      setSuccessModalOpen(true);
      onUpdate(updatedAppointment); // Notify parent component of update
      onClose();
    } catch (error) {
      setErrorModalContent('Error updating the appointment. Please try again.');
      setErrorModalOpen(true);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <CustomBox>
          <Header>
            <Typography variant="h6" color="#6faaff">
              Update Appointment
            </Typography>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </Header>
          <Box sx={{ marginBottom: '50px'}}></Box>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Select Visit Type</InputLabel>
              <Select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
                label="Visit Type"
              >
                {visitTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Select Doctor</InputLabel>
              <Select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                label="Doctor"
              >
                {doctors.map((doc) => (
                  <MenuItem key={doc} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <Typography>Select Date</Typography>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  value={format(selectedDate, 'yyyy-MM-dd')}
                  readOnly
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowDatePicker(!showDatePicker)}>
                        <CalendarTodayIcon />
                      </IconButton>
                    ),
                  }}
                />
                {showDatePicker && (
                  <Box sx={{ position: 'absolute', zIndex: 1200, top: '100%', left: 0 }}>
                    <Calendar
                      onClickDay={handleDateClick}
                      value={selectedDate}
                      tileClassName={({ date, view }) => {
                        return view === 'month' && isDateUnavailable(date) ? 'unavailable-date' : null;
                      }}
                    />
                  </Box>
                )}
              </Box>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <Typography>Select Time</Typography>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  value={format(selectedTime, 'HH:mm')}
                  readOnly
                  onClick={() => setShowTimePicker(!showTimePicker)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowTimePicker(!showTimePicker)}>
                        <WatchLaterIcon />
                      </IconButton>
                    ),
                  }}
                />
                {showTimePicker && (
                  <Box sx={{ position: 'absolute', zIndex: 1200, top: '100%', left: 175 }}>
                    <DatePicker
                      selected={selectedTime}
                      onChange={handleTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      inline
                    />
                  </Box>
                )}
              </Box>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Duration (minutes)</InputLabel>
              <Select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                label="Duration"
              >
                {durations.map((dur) => (
                  <MenuItem key={dur} value={dur}>
                    {dur} minutes
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ top: '-8px' }}>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                {statuses.map((stat) => (
                  <MenuItem key={stat} value={stat}>
                    {stat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: pastelRed,
                '&:hover': {
                  backgroundColor: '#e64a19 ',
                },
                maxWidth: '200px',
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                transform: 'none'
              }}
            >
              Update appointment
            </Button>
          </Box>
        </CustomBox>
      </Modal>

      {/* Error Modal */}
      <HICErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Error"
        content={errorModalContent}
        actions={[
          {
            label: 'OK',
            onClick: () => setErrorModalOpen(false),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />

      {/* Success Modal */}
      <HICSuccessModal
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Success"
        content={successModalContent}
        actions={[
          {
            label: 'OK',
            onClick: () => setSuccessModalOpen(false),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </>
  );
};

UpdateAppointmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointment: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateAppointmentModal;