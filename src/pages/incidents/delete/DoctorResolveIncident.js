import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../../components/HICTable';
import HICWarningModal from '../../../components/HICWarningModal';
import Loading from '../../../app-components/Loading';
import IncidentIcon from '@mui/icons-material/ReportProblem';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal';

// ResolveIncident Component
const ResolveIncident = () => {
  const [loading, setLoading] = useState(true);
  const [incidentsData, setIncidentsData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const incidentTypes = ['data breach', 'misdiagnosis', 'unauthorized access', 'system outage', 'other'];
  const severityLevels = ['minor', 'medium', 'critical'];
  const causes = ['malfunction', 'human error', 'cyberattack', 'procedural failures'];
  const statuses = ['waiting_for_resolution', 'unresolved', 'resolved', 'waiting_for_response'];

  const causeColors = {
    malfunction: '#FFCC00', // Yellow
    'human error': '#FF9999', // Light Red
    cyberattack: '#CC0000', // Dark Red
    'procedural failures': '#66CC66', // Light Green
  };

  const typeIcons = {
    'data breach': '/data-breach.png',
    misdiagnosis: '/misdiagnosis.png',
    'unauthorized access': '/unauthorized-access.png',
    'system outage': '/system-outage.png',
    other: '/other-incident.png',
  };

  const severityColors = {
    minor: '#00FF00', // Green
    medium: '#966fd6', // Yellow
    critical: '#FF0000', // Red
  };

  const statusColors = {
    waiting_for_resolution: '#FFA500', // Orange
    unresolved: '#FF4500', // Red-Orange
    resolved: '#228B22', // Forest Green
    waiting_for_response: '#4682B4', // Steel Blue
  };

  const pastelBlue = '#6faaff';
  const pastelRed = '#ff6f6f';

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    // { field: 'creation_date', header: 'Creation Date', isSortable: true },
    // { field: 'update_date', header: 'Update Date', isSortable: true },
    { field: 'name', header: 'Name', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true },
    { field: 'description', header: 'Description', isSortable: true },
    { field: 'severityLevel', header: 'Severity Level', isSortable: true },
    { field: 'cause', header: 'Cause', isSortable: true },
    { field: 'status', header: 'Status', isSortable: true },
    { field: 'actions', header: 'Actions', isSortable: false },
  ];

  // Fetch incidents data
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('/doctors/66cbb31025bfefa0333b2882/incidents'); // Adjust patientId as needed
        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setIncidentsData(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setIncidentsData([]);
        }
      } catch (error) {
        console.error('Error fetching incidents:', error);
        setIncidentsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredData = incidentsData.filter((incident) => {
    if (filterType === 'type' && filterValue) {
      return incident.type === filterValue;
    }
    if (filterType === 'severityLevel' && filterValue) {
      return incident.severityLevel === filterValue;
    }
    if (filterType === 'cause' && filterValue) {
      return incident.cause === filterValue;
    }
    if (filterType === 'status' && filterValue) {
      return incident.status === filterValue;
    }
    return true;
  });

  // Handle resolve action
  const handleResolveAction = (incident) => {
    if (incident.status === 'resolved') {
      setSelectedIncident(incident);
      setIsErrorModalOpen(true);
    } else {
      setSelectedIncident(incident);
      setIsWarningModalOpen(true);
    }
  };

  const confirmResolve = async () => {
    try {
      await axios.put(`/doctors/66cbb31025bfefa0333b2882/incidents/${selectedIncident._id}/resolve`);
      const updatedIncidents = incidentsData.map((incident) =>
        incident._id === selectedIncident._id ? { ...incident, status: 'resolved' } : incident
      );
      setIncidentsData(updatedIncidents);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error resolving incident:', error);
    }
    closeWarningModal();
  };

  const closeWarningModal = () => {
    setIsWarningModalOpen(false);
    setSelectedIncident(null);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setSelectedIncident(null);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
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
              backgroundColor: pastelBlue,
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
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: pastelRed }}>
            Resolve Incidents
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
                  <MenuItem value="cause">Cause</MenuItem>
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
                    {filterType === 'severityLevel' && severityLevels.map((severtyLevel) => (
                      <MenuItem key={severtyLevel} value={severtyLevel}>
                        {severtyLevel}
                      </MenuItem>
                    ))}
                    {filterType === 'cause' && causes.map((cause) => (
                      <MenuItem key={cause} value={cause}>
                        {cause}
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
                  type: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={typeIcons[row.type]} alt={row.type} style={{ width: '40px', marginRight: '8px' }} />
                      {row.type}
                    </Box>
                  ),
                  severityLevel: (
                    <Typography style={{ color: severityColors[row.severityLevel], fontWeight: 'bold' }}>
                      {row.severityLevel}
                    </Typography>
                  ),
                  cause: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: causeColors[row.cause], marginRight: '8px' }} />
                      {row.cause}
                    </Box>
                  ),
                  status: (
                    <Typography style={{ color: statusColors[row.status], fontWeight: 'bold' }}>
                      {row.status}
                    </Typography>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="Resolve Incident" arrow>
                        <img
                          src="/resolve.png"
                          alt="Resolve"
                          style={{ cursor: 'pointer', width: '40px' }}
                          onClick={() => handleResolveAction(row)}
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

          {/* Warning Modal for confirmation */}
          {isWarningModalOpen && (
            <HICWarningModal
              open={isWarningModalOpen}
              onClose={closeWarningModal}
              title="Confirm Resolve Incident"
              content="Are you sure you want to resolve this incident?"
              actions={[
                {
                  label: 'Resolve Incident',
                  onClick: confirmResolve,
                  variant: 'contained',
                  color: 'primary',
                },
                {
                  label: 'Abort',
                  onClick: closeWarningModal,
                  variant: 'outlined',
                  color: 'primary',
                },
              ]}
            />
          )}

          {/* Error Modal for invalid operation */}
          {isErrorModalOpen && (
            <HICErrorModal
              open={isErrorModalOpen}
              onClose={closeErrorModal}
              title="Invalid Operation"
              content="This incident is already resolved."
              actions={[
                {
                  label: 'OK',
                  onClick: closeErrorModal,
                  variant: 'contained',
                  color: 'primary',
                },
              ]}
            />
          )}

          {/* Success Modal for successful cancellation */}
          {isSuccessModalOpen && (
            <HICSuccessModal
              open={isSuccessModalOpen}
              onClose={closeSuccessModal}
              title="Incident Resolved"
              content="The incident has been successfully resolved."
              actions={[
                {
                  label: 'OK',
                  onClick: closeSuccessModal,
                  variant: 'contained',
                  color: 'primary',
                },
              ]}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default ResolveIncident;