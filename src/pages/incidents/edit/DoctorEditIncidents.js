import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import IncidentIcon from '@mui/icons-material/ReportProblem';
import EditIncidentModal from './UpdateIncidentModal';
import axios from 'axios';
import { format } from 'date-fns';

const EditIncidents = () => {
  const [loading, setLoading] = useState(true);
  const [incidentsData, setIncidentsData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch incidents data from backend
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('/doctors/66cbb31025bfefa0333b2882/incidents'); // Update with actual patient ID
        const formattedIncidents = response.data.map(incident => ({
          ...incident,
          creation_date: format(new Date(incident.creationDate), 'yyyy-MM-dd'),
          update_date: format(new Date(incident.updateDate), 'yyyy-MM-dd')
        }));
        setIncidentsData(formattedIncidents);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  // Define possible values for filters
  const incidentTypes = ['data breach', 'misdiagnosis', 'unauthorized access', 'system outage', 'other'];
  const severityLevels = ['minor', 'medium', 'critical'];
  const statuses = ['waiting_for_resolution', 'unresolved', 'resolved', 'waiting_for_response'];

  // Paths for the icons (replace with actual paths)
  const typeIcons = {
    'data breach': '/data-breach.png',
    'misdiagnosis': '/misdiagnosis.png',
    'unauthorized access': '/unauthorized-access.png',
    'system outage': '/system-outage.png',
    'other': '/other-incident.png',
  };

  // Function to get severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return '#ff0000'; // Red for critical
      case 'medium':
        return '#ff9900'; // Orange for medium
      case 'minor':
        return '#009900'; // Green for minor
      default:
        return '#000000'; // Default black
    }
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting_for_resolution':
        return '#ffa500'; // Orange
      case 'unresolved':
        return '#ff0000'; // Red
      case 'resolved':
        return '#008000'; // Green
      case 'waiting_for_response':
        return '#0000ff'; // Blue
      default:
        return '#000000'; // Default black
    }
  };

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'creation_date', header: 'Creation Date', isSortable: true },
    { field: 'update_date', header: 'Update Date', isSortable: true },
    { field: 'name', header: 'Name', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true },
    { field: 'severityLevel', header: 'Severity Level', isSortable: true },
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
  const filteredData = incidentsData.filter((incident) => {
    if (filterType === 'type' && filterValue) {
      return incident.type === filterValue;
    }
    if (filterType === 'severityLevel' && filterValue) {
      return incident.severityLevel === filterValue;
    }
    if (filterType === 'status' && filterValue) {
      return incident.status === filterValue;
    }
    return true;
  });

  const openModal = (incident) => {
    setSelectedIncident({
      ...incident,
      creation_date: format(new Date(incident.creation_date), 'yyyy-MM-dd'),
      update_date: format(new Date(incident.update_date), 'yyyy-MM-dd')
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIncident(null);
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
            to="/doctor/incidents"
            startIcon={<IncidentIcon />}
            sx={{
              position: 'fixed',
              top: 30,
              right: 30,
              backgroundColor: '#6faaff', // Pastel Blue
              '&:hover': {
                backgroundColor: '#005bb5',
              },
              textTransform: 'none',
            }}
          >
            Back to Incidents Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#ff6f6f' }}> {/* Pastel Red */}
            Update Your Incidents
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
                  <MenuItem value="type">Type</MenuItem>
                  <MenuItem value="severityLevel">Severity Level</MenuItem>
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
                    {filterType === 'type' && incidentTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                    {filterType === 'severityLevel' && severityLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
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

            {/* Incidents Table */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HICTable
                columns={columns}
                data={filteredData.map((row, index) => ({
                  ...row,
                  index: index + 1,
                  creation_date: format(new Date(row.creation_date), 'yyyy-MM-dd'),
                  update_date: format(new Date(row.update_date), 'yyyy-MM-dd'),
                  type: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={typeIcons[row.type]} alt={row.type} style={{ width: '40px', marginRight: '8px' }} />
                      {row.type}
                    </Box>
                  ),
                  severityLevel: (
                    <Typography style={{ color: getSeverityColor(row.severityLevel), fontWeight: 'bold' }}>
                      {row.severityLevel}
                    </Typography>
                  ),
                  status: (
                    <Typography style={{ color: getStatusColor(row.status), fontWeight: 'bold' }}>
                      {row.status}
                    </Typography>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="Edit incident details" arrow>
                        <img
                          src="/edit.png"
                          alt="Edit"
                          style={{ cursor: 'pointer', width: '32px' }}
                          onClick={() => openModal(row)} // Open modal with selected incident
                        />
                      </Tooltip>
                    </Box>
                  ),
                }))}
                defaultSortColumn="creation_date"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '1200px' }}
              />
            </Box>
          </Box>

          {/* Edit Incident Modal */}
          {isModalOpen && (
            <EditIncidentModal
              open={isModalOpen}
              onClose={closeModal}
              incident={selectedIncident}
              onSave={(updatedIncident) => {
                // Update the incidentsData with the updated incident
                setIncidentsData(prevData =>
                  prevData.map(incident =>
                    incident.index === updatedIncident.index
                      ? { ...updatedIncident, creation_date: format(new Date(updatedIncident.creation_date), 'yyyy-MM-dd'), update_date: format(new Date(updatedIncident.update_date), 'yyyy-MM-dd') }
                      : incident
                  )
                );
                closeModal();
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default EditIncidents;