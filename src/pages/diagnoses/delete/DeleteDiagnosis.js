/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import HealingIcon from '@mui/icons-material/LocalHospital';
import HICWarningModal from '../../../components/HICWarningModal';
import HICSuccessModal from '../../../components/HICSuccessModal'; // Import success modal

const DeleteDiagnosis = () => {
  const { patientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false); // State for success modal
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [diagnosesData, setDiagnosesData] = useState([]);

  // Define possible values for filters
  const diagnosisTypes = ['Normal', 'Acute', 'Chronic'];

  const pastelBlue = '#6faaff';
  const pastelRed = '#ff6f6f';

  // Paths for the icons (replace with actual paths)
  const typeIcons = {
    Normal: '/normal.png',
    Acute: '/acute.png',
    Chronic: '/chronic.png',
  };

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    // { field: 'creationDate', header: 'Creation Date', isSortable: true },
    // { field: 'updateDate', header: 'Update Date', isSortable: true },
    { field: 'name', header: 'Diagnosis Name', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true, render: (type) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={typeIcons[type]} alt={type} style={{ width: '28px', marginRight: '8px' }} />
          {type}
        </Box>
      ),
    },
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
        console.error('Error fetching diagnoses:', error);
        setLoading(false);
      }
    };

    fetchDiagnoses();
  }, []); // Fetch diagnoses on component mount

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

  const handleOpenModal = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    setOpenWarningModal(true);
  };

  const handleCloseWarningModal = () => {
    setOpenWarningModal(false);
    setSelectedDiagnosis(null);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedDiagnosis) {
      try {
        await axios.delete(`/patients/${patientId}/diagnoses/${selectedDiagnosis._id}`);
        setDiagnosesData(prevData => prevData.filter(item => item._id !== selectedDiagnosis._id));
        handleCloseWarningModal();
        setOpenSuccessModal(true); // Show success modal
      } catch (error) {
        console.error('Error deleting diagnosis:', error);
      }
    }
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

          {/* Back to Dashboard Button */}
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={`/patients/diagnoses/${patientId}`}
            startIcon={<HealingIcon />}
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
            Back to Diagnoses Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>

          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: pastelRed }}>
            Delete Your Diagnoses
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
                    {filterType === 'recurrent' && ['Yes', 'No', 'Not Known'].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
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
                  index: index + 1,
                  type: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={typeIcons[row.type]} alt={row.type} style={{ width: '32px', marginRight: '8px' }} />
                      {row.type}
                    </Box>
                  ),
                  recurrent: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {row.recurrent}
                    </Box>
                  ),
                  infectious: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {row.infectious}
                    </Box>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="Delete diagnosis" arrow>
                        <img
                          src="/delete.png"
                          alt="Delete"
                          style={{ cursor: 'pointer', width: '32px' }}
                          onClick={() => handleOpenModal(row)} // Open confirmation modal
                        />
                      </Tooltip>
                    </Box>
                  ),
                }))}
                defaultSortColumn="creationDate"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '1400px' }}
              />
            </Box>
          </Box>

          {/* Warning Modal */}
          <HICWarningModal
            open={openWarningModal}
            onClose={handleCloseWarningModal}
            onConfirm={handleConfirmDelete}
            title="Confirm Deletion"
            content="Are you sure you want to delete this diagnosis?"
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

          {/* Success Modal */}
          <HICSuccessModal
            open={openSuccessModal}
            onClose={handleCloseSuccessModal}
            title="Success"
            content="Diagnosis was successfully deleted."
            actions={[
              {
                label: 'Close',
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

export default DeleteDiagnosis;