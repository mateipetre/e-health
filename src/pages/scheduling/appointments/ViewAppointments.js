import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import AppointmentIcon from '@mui/icons-material/Event';
import ViewAppointmentModal from './view/ViewAppointmentModal';

const ViewAppointments = () => {
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentsData, setAppointmentsData] = useState([]);

  // Function to format the date
  function getCurrentDateFormatted(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  // Fetch appointments data from the server
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/appointments');
        const data = await response.json();

        // Format the dates
        const formattedData = data.map(appointment => ({
          ...appointment,
          creationDate: getCurrentDateFormatted(new Date(appointment.creationDate)),
          updateDate: getCurrentDateFormatted(new Date(appointment.updateDate)),
          date: getCurrentDateFormatted(new Date(appointment.date)),
        }));

        setAppointmentsData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Define possible values for filters
  const visitTypes = ['Urgent', 'Follow-up', 'New Symptom'];
  const statuses = ['Pending', 'Confirmed', 'Cancelled', 'Done'];

  const pastelBlue = '#6faaff';
  const pastelRed = '#ff6f6f';

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'visitType', header: 'Visit Type', isSortable: true },
    { field: 'date', header: 'Date', isSortable: true },
    { field: 'patient', header: 'Patient', isSortable: true },
    { field: 'meetingRoomName', header: 'Meeting Room', isSortable: true },
    { field: 'status', header: 'Status', isSortable: true },
    {
      field: 'actions',
      header: 'Actions',
      isSortable: false,
    },
  ];

  // Handle primary filter type change
  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue(''); // Clear secondary filter value
  };

  // Handle secondary filter value change
  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  // Status icons based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <img src="/pending.png" alt="Pending" style={{ width: '28px', marginRight: '8px' }} />;
      case 'Confirmed':
        return <img src="/confirmed.png" alt="Confirmed" style={{ width: '28px', marginRight: '8px' }} />;
      case 'Cancelled':
        return <img src="/cancelled.png" alt="Cancelled" style={{ width: '28px', marginRight: '8px' }} />;
      case 'Done':
        return <img src="/done.png" alt="Done" style={{ width: '28px', marginRight: '8px' }} />;
      default:
        return null;
    }
  };

  // Filtered data based on selected filters
  const filteredData = appointmentsData.filter((appointment) => {
    if (filterType === 'visitType' && filterValue) {
      return appointment.visitType === filterValue;
    }
    if (filterType === 'status' && filterValue) {
      return appointment.status === filterValue;
    }
    return true;
  });

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
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
            <img src="/logo-no-background.png" alt="Logo" style={{ height: '35px' }} />
          </Button>
            
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/doctor/appointments"
            startIcon={<AppointmentIcon />}
            sx={{
              position: 'fixed',
              top: 30,
              right: 30,
              backgroundColor: pastelBlue,
              '&:hover': {
                backgroundColor: '#005bb5',
              },
              textTransform: 'none',
            }}
          >
            Back to Appointments Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: pastelRed }}>
            View Your Appointments
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'right', mb: 2, marginRight: 115 }}>
              <Typography variant="h7" sx={{ marginTop: '20px' }}>
                Filter by:
              </Typography>
              <FormControl fullWidth sx={{ width: 130 }}>
                <InputLabel>Select type</InputLabel>
                <Select
                  value={filterType}
                  onChange={handleFilterTypeChange}
                  label="Filter Type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="visitType">Visit Type</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                </Select>
              </FormControl>

              {filterType && (
                <FormControl fullWidth sx={{ width: 180 }}>
                  <InputLabel>Filter Value</InputLabel>
                  <Select
                    value={filterValue}
                    onChange={handleFilterValueChange}
                    label="Filter Value"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {filterType === 'visitType' && visitTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                    {filterType === 'status' && statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HICTable
                columns={columns}
                data={filteredData.map((row, index) => ({
                  ...row,
                  index: index + 1, // Assign an index
                  status: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getStatusIcon(row.status)}
                      {row.status}
                    </Box>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="View appointment details" arrow>
                        <img
                          src="/view.png"
                          alt="View"
                          style={{ cursor: 'pointer', width: '32px' }}
                          onClick={() => openModal(row)}
                        />
                      </Tooltip>
                    </Box>
                  ),
                }))}
                defaultSortColumn="date"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '1200px' }}
              />
            </Box>
          </Box>

          <ViewAppointmentModal
            open={isModalOpen}
            onClose={closeModal}
            appointment={selectedAppointment}
          />
        </>
      )}
    </Box>
  );
};

export default ViewAppointments;