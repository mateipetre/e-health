import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import MedicationIcon from '@mui/icons-material/Medication';
import UpdateMedicationModal from './UpdateMedicationModal';

const EditMedications = () => {
  const [loading, setLoading] = useState(true);
  const [medicationsData, setMedicationsData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const patientId = '66cb68934f5769ec17d174a9'; // Replace with actual patient ID
        const response = await axios.get(`/patients/${patientId}/medications`);
        const formattedData = response.data.map((med) => ({
          ...med,
          creationDate: dayjs(med.creationDate).format('YYYY-MM-DD'),
          updateDate: dayjs(med.updateDate).format('YYYY-MM-DD'),
        }));
        setMedicationsData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medications:', error);
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue(''); // Clear secondary filter value
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredData = medicationsData.filter((medication) => {
    if (filterType === 'type' && filterValue) {
      return medication.type === filterValue;
    }
    if (filterType === 'status' && filterValue) {
      return medication.status === filterValue;
    }
    if (filterType === 'provider' && filterValue) {
      return medication.provider === filterValue;
    }
    return true;
  });

  const openModal = (medication) => {
    setSelectedMedication(medication);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedication(null);
  };

  // Define possible values for filters
  const medicationTypes = ['allergy', 'disease', 'wellness'];
  const statuses = ['on-going', 'on-pause', 'cancelled'];
  const providers = ['Cardiologist - Andrei Dumitru', 'Dermatologist - Elena Ionescu', 'Oncologist - Ioan Popescu', 'General practitioner - Alex Matei', 'Endocrinologist - Maria Popescu'];

  const pastelBlue = '#6faaff';
  const pastelRed = '#ff6f6f';

  // Define icons for medication types and statuses
  const typeIcons = {
    allergy: '/allergy.png',
    disease: '/disease.png',
    wellness: '/wellness.png',
  };

  const statusIcons = {
    'on-going': '/on-going.png',
    'on-pause': '/on-pause.png',
    cancelled: '/cancelled.png',
  };

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'creationDate', header: 'Creation Date', isSortable: true },
    { field: 'updateDate', header: 'Update Date', isSortable: true },
    { field: 'name', header: 'Name', isSortable: true },
    { field: 'dose', header: 'Dose', isSortable: true },
    { field: 'frequency', header: 'Frequency', isSortable: true },
    { field: 'quantity', header: 'Quantity', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true },
    { field: 'condition', header: 'Condition', isSortable: true },
    { field: 'provider', header: 'Provider', isSortable: true },
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
            to="/medications"
            startIcon={<MedicationIcon />}
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
            Back to Medications Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: pastelRed }}>
            View Your Medications
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
                  <MenuItem value="status">Status</MenuItem>
                  <MenuItem value="provider">Provider</MenuItem>
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
                    {filterType === 'type' && medicationTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        <img src={typeIcons[type]} alt={type} style={{ width: '20px', marginRight: '8px' }} />
                        {type}
                      </MenuItem>
                    ))}
                    {filterType === 'status' && statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        <img src={statusIcons[status]} alt={status} style={{ width: '20px', marginRight: '8px' }} />
                        {status}
                      </MenuItem>
                    ))}
                    {filterType === 'provider' && providers.map((provider) => (
                      <MenuItem key={provider} value={provider}>
                        {provider}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            {/* Medications Table */}
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
                  status: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={statusIcons[row.status]} alt={row.status} style={{ width: '32px', marginRight: '8px' }} />
                      {row.status}
                    </Box>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="Edit medication details" arrow>
                        <img
                          src="/edit.png"
                          alt="Edit"
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
                sx={{ width: '100%', maxWidth: '1500px' }}
              />
            </Box>
          </Box>
                   
          {/* Edit Medication Modal */}
          {isModalOpen && (
            <UpdateMedicationModal
              open={isModalOpen}
              onClose={closeModal}
              medication={selectedMedication}
              onSave={(updatedMedication) => {
                // Update the medicationsData with the updated medication
                setSelectedMedication(updatedMedication);
                closeModal();
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default EditMedications;