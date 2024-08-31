import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Tooltip, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import MedicationIcon from '@mui/icons-material/Medication';
import HICWarningModal from '../../../components/HICWarningModal';
import HICErrorModal from '../../../components/HICErrorModal';
import HICSuccessModal from '../../../components/HICSuccessModal'; // Import the success modal

const CancelMedication = () => {
  const [loading, setLoading] = useState(true);
  const [medicationsData, setMedicationsData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const medicationTypes = ['allergy', 'disease', 'wellness'];
  const statuses = ['on-going', 'on-pause', 'cancelled'];
  const providers = ['Cardiologist - Andrei Dumitru', 'Dermatologist - Elena Ionescu', 'Oncologist - Ioan Popescu', 'General practitioner - Alex Matei', 'Endocrinologist - Maria Popescu'];

  const pastelBlue = '#6faaff';
  const pastelRed = '#ff6f6f';

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

  // Icon for cancel action (replace with actual path)
  const cancelIcon = '/cancel.png'; 

   // Define columns for the table
   const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    // { field: 'creationDate', header: 'Creation Date', isSortable: true },
    // { field: 'updateDate', header: 'Update Date', isSortable: true },
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

  // Fetch medications data
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get('/patients/66cb68934f5769ec17d174a9/medications');
        setMedicationsData(response.data);
      } catch (error) {
        console.error('Error fetching medications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue('');
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

  const handleCancelAction = (medication) => {
    if (medication.status === 'cancelled') {
      setSelectedMedication(medication);
      setIsErrorModalOpen(true);
    } else {
      setSelectedMedication(medication);
      setIsWarningModalOpen(true);
    }
  };

  const confirmCancel = async () => {
    try {
      await axios.put(`/patients/66cb68934f5769ec17d174a9/medications/${selectedMedication._id}/cancel`);
      const updatedMedications = medicationsData.map((m) =>
        m._id === selectedMedication._id ? { ...m, status: 'cancelled' } : m
      );
      setMedicationsData(updatedMedications);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error cancelling medication:', error);
    }
    closeWarningModal();
  };

  const closeWarningModal = () => {
    setIsWarningModalOpen(false);
    setSelectedMedication(null);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setSelectedMedication(null);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setSelectedMedication(null);
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
            Cancel Your Medications
          </Typography>

          {/* Filters and Table */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'right', mb: 2, marginRight: 115 }}>
              {/* Primary Filter Type */}
              <Typography variant="h7" sx={{ marginTop: '20px' }}>
                Filter by:
              </Typography>
              <FormControl fullWidth sx={{ width: 180 }}>
                <InputLabel>Filter Type</InputLabel>
                <Select value={filterType} onChange={handleFilterTypeChange} label="Filter Type">
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
                  <Select value={filterValue} onChange={handleFilterValueChange} label="Filter Value">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {filterType === 'type' && medicationTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                    {filterType === 'status' && statuses.map((status) => (
                      <MenuItem key={status} value={status}>
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
            <HICTable
              columns={columns}
              data={filteredData.map((medication, index) => ({
                ...medication,
                index: index + 1,
                type: (
                  <Tooltip title={medication.type} arrow>
                    <img
                      src={typeIcons[medication.type]}
                      alt={medication.type}
                      style={{ height: '40px', width: '40px' }}
                    />
                  </Tooltip>
                ),
                status: (
                  <Tooltip title={medication.status} arrow>
                    <img
                      src={statusIcons[medication.status]}
                      alt={medication.status}
                      style={{ height: '32px', width: '32px' }}
                    />
                  </Tooltip>
                ),
                actions: (
                  <Tooltip title="Cancel Medication" arrow>
                    <img
                      src={cancelIcon}
                      alt="Cancel"
                      onClick={() => handleCancelAction(medication)}
                      style={{ height: '40px', width: '40px', cursor: 'pointer' }}
                    />
                  </Tooltip>
                ),
              }))}
              sx={{ width: '100%', maxWidth: '1500px' }}
            />
          </Box>

          {/* Warning Modal for confirmation */}
          {isWarningModalOpen && (
            <HICWarningModal
              open={isWarningModalOpen}
              onClose={closeWarningModal}
              title="Confirm Cancellation"
              content="Are you sure you want to cancel this medication?"
              actions={[
                {
                  label: 'Cancel Medication',
                  onClick: confirmCancel,
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
              content="This medication is already cancelled."
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
              title="Cancellation Successful"
              content="The medication has been successfully cancelled."
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

export default CancelMedication;
