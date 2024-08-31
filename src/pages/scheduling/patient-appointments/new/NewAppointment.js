import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, TextField, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppointmentIcon from '@mui/icons-material/Event';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format, startOfDay } from 'date-fns';
import HICErrorModal from '../../../../components/HICErrorModal';
import HICSuccessModal from '../../../../components/HICSuccessModal'; // Import Success Modal
import axios from 'axios';

function generateRoomName(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let roomName = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      roomName += characters.charAt(randomIndex);
  }
  return roomName;
}

const NewAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visitType, setVisitType] = useState('');
  const [doctor, setDoctor] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false); // State for Success Modal

  const navigate = useNavigate();

  const visitTypes = ['Urgent', 'Follow-up', 'New Symptom'];
  const doctors = ['Cardiologist - Andrei Dumitru', 'Dermatologist - Elena Ionescu', 'Oncologist - Ioan Popescu', 'General practitioner - Alex Matei', 'Endocrinologist - Maria Popescu'];
  const durations = [30, 45, 60];

  const pastelRed = '#ff6f6f';

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
      setModalContent('This day is fully booked for the selected doctor. Please choose another date.');
      setModalOpen(true);
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
      setModalContent('This day is fully booked for the selected doctor. Please choose another date.');
      setModalOpen(true);
      return;
    }

    const patientResponse = await axios.get(`/patients/66cb68934f5769ec17d174a9/fullname`);
    const patient = patientResponse.data.fullName;

    const appointmentData = {
      visitType,
      doctor,
      patient,
      date: format(selectedDate, 'yyyy-MM-dd'),
      startingHour: format(selectedTime, 'HH:mm'),
      duration,
      meetingRoomName: generateRoomName(15),
      creationDate: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:5000/patients/66cb68934f5769ec17d174a9/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('New appointment created:', result);
        setSuccessModalOpen(true); // Open Success Modal on success
      } else {
        const errorData = await response.json();
        setModalContent(`Error: ${errorData.message}`);
        setModalOpen(true);
      }
    } catch (error) {
      console.error('Error creating new appointment:', error);
      setModalContent('Server error while adding appointment.');
      setModalOpen(true);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Button
        component={RouterLink}
        to="/"
        sx={{
          position: 'fixed',
          top: 30,
          left: 30,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200,
          backgroundColor: 'transparent',
          '& img': {
            height: '35px',
          },
        }}
      >
        <img
          src="/logo-no-background.png"
          alt="Logo"
          style={{ height: '35px' }}
        />
      </Button>

      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/appointments"
        startIcon={<AppointmentIcon />}
        sx={{
          position: 'fixed',
          top: 30,
          right: 30,
          backgroundColor: '#6faaff',
          '&:hover': {
            backgroundColor: '#005bb5',
          },
          textTransform: 'none',
        }}
      >
        Back to Appointments Dashboard
      </Button>

      <Box sx={{ marginTop: 10 }}></Box>
      <Typography variant="h4" align="center" sx={{ marginBottom: '100px', color: '#ff6f6f' }}>
        Schedule a New Appointment
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignItems: 'center',
          maxWidth: 500,
          margin: '0 auto',
          padding: '20px',
          border: `4px solid ${'#b5ccfe'}`, 
          borderRadius: '16px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel sx={{ top: '-8px' }}>Select Visit Type</InputLabel>
          <Select
            value={visitType}
            onChange={(e) => setVisitType(e.target.value)}
            label="Visit Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
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
                  dateFormat="HH:mm"
                  inline
                />
              </Box>
            )}
          </Box>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel sx={{ top: '-8px' }}>Select Duration</InputLabel>
          <Select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            label="Duration"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {durations.map((dur) => (
              <MenuItem key={dur} value={dur}>
                {dur} minutes
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
          }}
        >
          Schedule
        </Button>
      </Box>

      <HICErrorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Unavailable Date"
        content={modalContent}
        actions={[
          {
            label: 'Close',
            onClick: () => setModalOpen(false),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />

      {/* Success Modal */}
      <HICSuccessModal
        open={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          navigate('/appointments'); // Redirect after closing the modal
        }}
        title="Appointment Created"
        content="Your appointment has been successfully scheduled."
        actions={[
          {
            label: 'View Appointments',
            onClick: () => navigate('/appointments/view'),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
    </Box>
  );
};

export default NewAppointment;