import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import CareGoalIcon from '@mui/icons-material/Stars';
import HICWarningModal from '../../../components/HICWarningModal'; // Import the custom modal
import HICSuccessModal from '../../../components/HICSuccessModal'; // Import the success modal

const DeleteCareGoal = () => {
  const [loading, setLoading] = useState(true);
  const [careGoalsData, setCareGoalsData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedCareGoal, setSelectedCareGoal] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    fetchCareGoals();
  }, []);

  const fetchCareGoals = async () => {
    try {
      const response = await axios.get('/patients/66cb68934f5769ec17d174a9/careGoals');
      setCareGoalsData(response.data);
    } catch (error) {
      console.error('Error fetching care goals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Define possible values for filters
  const careGoalTypes = ['Prevention', 'Treatment'];
  const statusTypes = ['On-going', 'Stopped', 'On-pause'];

  const durationColors = {
    'Few Days': '#ffcccc', // Light Red
    'Few Weeks': '#ccffcc', // Light Green
    'Few Months': '#ccccff', // Light Blue
    'Few Years': '#ffccff', // Light Pink
    'Permanent': '#ffffcc', // Light Yellow
  };

  const typeIcons = {
    Prevention: '/prevention.png',
    Treatment: '/treatment.png',
  };

  const statusIcons = {
    'On-going': '/on-going.png',
    Stopped: '/stopped.png',
    'On-pause': '/on-pause.png',
  };

  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'name', header: 'Name', isSortable: true },
    { field: 'description', header: 'Description', isSortable: true },
    { field: 'duration', header: 'Duration', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true },
    { field: 'status', header: 'Status', isSortable: true },
    { field: 'actions', header: 'Actions', isSortable: false },
  ];

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredData = careGoalsData.filter((careGoal) => {
    if (filterType === 'type' && filterValue) {
      return careGoal.type === filterValue;
    }
    if (filterType === 'status' && filterValue) {
      return careGoal.status === filterValue;
    }
    return true;
  });

  const openDeleteModal = (careGoal) => {
    setSelectedCareGoal(careGoal);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedCareGoal(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedCareGoal) {
      try {
        await axios.delete(`/patients/66cb68934f5769ec17d174a9/careGoals/${selectedCareGoal._id}`);
        // Update state to remove deleted care goal
        setCareGoalsData(prevData => prevData.filter(item => item._id !== selectedCareGoal._id));
        setSuccessModalOpen(true);
      } catch (error) {
        console.error('Error deleting care goal:', error);
        // Optionally handle error with a separate error modal or notification
      } finally {
        closeDeleteModal();
      }
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
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
            to="/care-goals"
            startIcon={<CareGoalIcon />}
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
            Back to Care Goals Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#ff6f6f' }}>
            Delete Your Care Goals
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
                  <MenuItem value="type">Type</MenuItem>
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
                    {filterType === 'type' && careGoalTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                    {filterType === 'status' && statusTypes.map((status) => (
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
                  index: index + 1,
                  duration: (
                    <Typography style={{ backgroundColor: durationColors[row.duration], padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                      {row.duration}
                    </Typography>
                  ),
                  type: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={typeIcons[row.type]} alt={row.type} style={{ width: '32px', marginRight: '8px' }} />
                      {row.type}
                    </Box>
                  ),
                  status: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={statusIcons[row.status]} alt={row.status} style={{ width: '32px', marginRight: '8px' }} />
                      {row.status}
                    </Box>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="Delete care goal" arrow>
                        <img
                          src="/delete.png"
                          alt="Delete"
                          style={{ cursor: 'pointer', width: '32px' }}
                          onClick={() => openDeleteModal(row)}
                        />
                      </Tooltip>
                    </Box>
                  ),
                }))}
                defaultSortColumn="creationDate"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '1600px' }}
              />
            </Box>
          </Box>

          <HICWarningModal
            open={deleteModalOpen}
            onClose={closeDeleteModal}
            onConfirm={handleConfirmDelete}
            title="Confirm Deletion"
            content="Are you sure you want to delete this care goal?"
            actions={[
              {
                label: 'Cancel',
                onClick: closeDeleteModal,
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

          <HICSuccessModal
            open={successModalOpen}
            onClose={closeSuccessModal}
            title="Success"
            content="Care goal deleted successfully."
            actions={[
              {
                label: 'OK',
                onClick: closeSuccessModal,
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

export default DeleteCareGoal;