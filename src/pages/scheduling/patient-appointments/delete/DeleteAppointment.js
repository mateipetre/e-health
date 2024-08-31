import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../../../components/HICTable';
import Loading from '../../../../app-components/Loading';
import AppointmentIcon from '@mui/icons-material/Event';
import HICWarningModal from '../../../../components/HICWarningModal'; // Import the custom modal
import HICSuccessModal from '../../../../components/HICSuccessModal'; // Import the success modal
import axios from 'axios'; // Import axios for API requests

const getCurrentDateFormatted = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

const DeleteAppointment = () => {
  const [loading, setLoading] = useState(true);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Define possible values for filters
  const visitTypes = ['Urgent', 'Follow-up', 'New Symptom'];
  const statuses = ['Pending', 'Confirmed', 'Cancelled', 'Done'];

  const pastelBlue = '#6faaff';
  const pastelRed = '#ff6f6f';

  useEffect(() => {
    fetchAppointments(); // Fetch appointments when component mounts
  }, []);

  // Fetch appointments from the API
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/patients/66cb68934f5769ec17d174a9/appointments'); // Use actual patient ID
      setAppointmentsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  // Handle appointment deletion
  const handleConfirmDelete = async () => {
    if (selectedRow) {
      try {
        await axios.delete(`/patients/66cb68934f5769ec17d174a9/appointments/${selectedRow._id}`); // Use actual patient ID and appointment ID
        setAppointmentsData(prevData => prevData.filter(item => item._id !== selectedRow._id));
        handleCloseWarningModal();
        setOpenSuccessModal(true); // Show success modal
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const handleOpenWarningModal = (row) => {
    setSelectedRow(row);
    setOpenWarningModal(true);
  };

  const handleCloseWarningModal = () => {
    setOpenWarningModal(false);
    setSelectedRow(null);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue(''); // Clear secondary filter value
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

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

  const filteredData = appointmentsData.filter((appointment) => {
    if (filterType === 'visitType' && filterValue) {
      return appointment.visitType === filterValue;
    }
    if (filterType === 'status' && filterValue) {
      return appointment.status === filterValue;
    }
    return true;
  }).map((appointment, index) => ({
    ...appointment,
    index: index + 1, // Assign an index
    date: getCurrentDateFormatted(new Date(appointment.date)), // Format the date
    status: (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {getStatusIcon(appointment.status)}
        {appointment.status}
      </Box>
    ),
    actions: (
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Tooltip title="Cancel appointment" arrow>
          <img
            src="/delete.png"
            alt="Delete"
            style={{ cursor: 'pointer', width: '32px' }}
            onClick={() => handleOpenWarningModal(appointment)}
          />
        </Tooltip>
      </Box>
    ),
  }));

  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'visitType', header: 'Visit Type', isSortable: true },
    { field: 'date', header: 'Date', isSortable: true },
    { field: 'doctor', header: 'Doctor', isSortable: true },
    { field: 'status', header: 'Status', isSortable: true },
    { field: 'actions', header: 'Actions', isSortable: false },
  ];

  return (
    <Box sx={{ padding: '20px' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Logo Button */}
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
          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: pastelRed }}>
            Delete Your Appointments
          </Typography>

          {/* Filters and Table */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'right', mb: 2, marginRight: 115 }}>
              {/* Primary Filter Type */}
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

              {/* Secondary Filter Value */}
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

            {/* Appointments Table */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HICTable
                columns={columns}
                data={filteredData}
                defaultSortColumn="date"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '1200px' }}
              />
            </Box>
          </Box>

          {/* Custom Warning Modal */}
          <HICWarningModal
            open={openWarningModal}
            onClose={handleCloseWarningModal}
            title="Confirm Deletion"
            content="Are you sure you want to delete this appointment?"
            actions={[
              {
                label: 'Cancel',
                onClick: handleCloseWarningModal,
                variant: 'outlined',
                color: 'primary',
              },
              {
                label: 'Confirm',
                onClick: handleConfirmDelete,
                variant: 'contained',
                color: 'primary',
              },
            ]}
          />

          {/* Custom Success Modal */}
          <HICSuccessModal
            open={openSuccessModal}
            onClose={handleCloseSuccessModal}
            title="Deletion Successful"
            content="The appointment has been successfully deleted."
            actions={[
              {
                label: 'Ok',
                onClick: handleCloseSuccessModal,
                variant: 'contained',
                color: 'primary',
              },
            ]}
          />
        </>
      )}
    </Box>
  );
};

export default DeleteAppointment;