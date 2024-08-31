import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import HICTable from '../../components/HICTable';
import Loading from '../../app-components/Loading';
import CareGoalIcon from '@mui/icons-material/Stars';
import ViewCareGoalModal from './view/ViewCareGoalModal';

const ViewCareGoals = () => {
  const [loading, setLoading] = useState(true);
  const [careGoalsData, setCareGoalsData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedCareGoal, setSelectedCareGoal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to format dates
  const getCurrentDateFormatted = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Fetch care goals from the server
  useEffect(() => {
    const fetchCareGoals = async () => {
      try {
        const response = await axios.get('/patients/66cb68934f5769ec17d174a9/careGoals'); // Replace {patientId} with actual patient ID
        const formattedData = response.data.map(careGoal => ({
          ...careGoal,
          creationDate: getCurrentDateFormatted(new Date(careGoal.creationDate)),
          updateDate: getCurrentDateFormatted(new Date(careGoal.updateDate)),
        }));
        setCareGoalsData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching care goals:', error);
        setLoading(false);
      }
    };

    fetchCareGoals();
  }, []); // Fetch care goals on component mount

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
    stopped: '/stopped.png',
    'On-pause': '/on-pause.png',
  };

  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    // { field: 'creationDate', header: 'Creation Date', isSortable: true },
    // { field: 'updateDate', header: 'Update Date', isSortable: true },
    { field: 'name', header: 'Name', isSortable: true },
    { field: 'description', header: 'Description', isSortable: true },
    { field: 'duration', header: 'Duration', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true },
    { field: 'status', header: 'Status', isSortable: true },
    { field: 'actions', header: 'Actions', isSortable: false },
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

  // Filtered data based on selected filters
  const filteredData = careGoalsData.filter((careGoal) => {
    if (filterType === 'type' && filterValue) {
      return careGoal.type === filterValue;
    }
    if (filterType === 'status' && filterValue) {
      return careGoal.status === filterValue;
    }
    return true;
  });

  const openModal = (careGoal) => {
    setSelectedCareGoal(careGoal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCareGoal(null);
  };

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
            Back to CareGoals Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>

          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#ff6f6f' }}>
            View Your Care Goals
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
                    <Typography 
                      style={{ 
                        backgroundColor: durationColors[row.duration], 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontWeight: 'bold' 
                      }}
                    >
                      {row.duration}
                    </Typography>
                  ),
                  type: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img 
                        src={typeIcons[row.type]} 
                        alt={row.type} 
                        style={{ width: '40px', marginRight: '8px' }} 
                      />
                      {row.type}
                    </Box>
                  ),
                  status: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img 
                        src={statusIcons[row.status]} 
                        alt={row.status} 
                        style={{ width: '32px', marginRight: '8px' }} 
                      />
                      {row.status}
                    </Box>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="View care goal details" arrow>
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
                defaultSortColumn="creationDate"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '1600px' }}
              />
            </Box>
          </Box>

          <ViewCareGoalModal
            open={isModalOpen}
            onClose={closeModal}
            careGoal={selectedCareGoal}
          />
        </>
      )}
    </Box>
  );
};

export default ViewCareGoals;