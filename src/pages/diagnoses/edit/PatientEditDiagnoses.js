import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import DiagnosisIcon from '@mui/icons-material/LocalHospital'; // Updated icon for diagnoses
import EditDiagnosisModal from './PatientUpdateDiagnosisModal'; // Modal component for editing diagnoses

const EditDiagnoses = () => {
  const { patientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [diagnosesData, setDiagnosesData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define possible values for filters
  const diagnosisTypes = ['Normal', 'Acute', 'Chronic'];
  const recurrentOptions = ['Yes', 'No', 'Not Known'];

  // Paths for the icons (replace with actual paths)
  const typeIcons = {
    Normal: '/normal.png',
    Acute: '/acute.png',
    Chronic: '/chronic.png',
  };

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'name', header: 'Diagnosis Name', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true },
    { field: 'code', header: 'Code', isSortable: true },
    { field: 'cause', header: 'Cause', isSortable: true },
    { field: 'recurrent', header: 'Recurrent', isSortable: true },
    { field: 'infectious', header: 'Infectious', isSortable: true },
    { field: 'principalSymptom', header: 'Principal Symptom', isSortable: true },
    { field: 'actions', header: 'Actions', isSortable: false },
  ];

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get(`/patients/${patientId}/diagnoses`);
        setDiagnosesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient diagnoses:', error);
        setLoading(false);
      }
    };

    fetchDiagnoses();
  }, [patientId]);

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
  const filteredData = diagnosesData.filter((diagnosis) => {
    if (filterType === 'type' && filterValue) {
      return diagnosis.type === filterValue;
    }
    if (filterType === 'recurrent' && filterValue) {
      return diagnosis.recurrent === filterValue;
    }
    return true;
  });

  const openModal = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDiagnosis(null);
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
            to={`/patients/diagnoses/${patientId}`}
            startIcon={<DiagnosisIcon />}
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
            Back to Diagnoses Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>

          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#ff6f6f' }}> {/* Pastel Red */}
            Edit Your Diagnoses
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
                  <MenuItem value="recurrent">Recurrent</MenuItem>
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
                    {filterType === 'type' && diagnosisTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                    {filterType === 'recurrent' && recurrentOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            {/* Diagnoses Table */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HICTable
                columns={columns}
                data={filteredData.map((row, index) => ({
                  ...row,
                  index: index + 1, // Display 1-based index
                  type: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={typeIcons[row.type]} alt={row.type} style={{ width: '28px', marginRight: '8px' }} />
                      {row.type}
                    </Box>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="Edit diagnosis details" arrow>
                        <img
                          src="/edit.png"
                          alt="Edit"
                          style={{ cursor: 'pointer', width: '32px' }}
                          onClick={() => openModal(row)} // Open modal with selected diagnosis
                        />
                      </Tooltip>
                    </Box>
                  ),
                }))}
                defaultSortColumn="index"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '1200px' }}
              />
            </Box>
          </Box>

          {/* Edit Diagnosis Modal */}
          {isModalOpen && (
            <EditDiagnosisModal
              open={isModalOpen}
              onClose={closeModal}
              diagnosis={selectedDiagnosis}
              onSave={(updatedDiagnosis) => {
                // Update the diagnosesData with the updated diagnosis
                setDiagnosesData(prevData => 
                  prevData.map(d => d._id === updatedDiagnosis._id ? updatedDiagnosis : d)
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

export default EditDiagnoses;