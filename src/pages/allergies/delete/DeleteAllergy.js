import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import AllergyIcon from '@mui/icons-material/Healing';
import HICWarningModal from '../../../components/HICWarningModal';
import HICSuccessModal from '../../../components/HICSuccessModal';

const DeleteAllergy = () => {
  const [loading, setLoading] = useState(true);
  const [allergiesData, setAllergiesData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalContent, setSuccessModalContent] = useState('');

  // Fetch allergies data when the component mounts
  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/patients/66cb68934f5769ec17d174a9/allergies');
        setAllergiesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching allergies:', error);
        setLoading(false);
      }
    };
    
    fetchAllergies();
  }, []);

  const allergyTypes = ['Medication', 'Food', 'Environmental', 'Skin'];
  const severityLevels = ['Severe', 'Moderate', 'Mild'];

  const typeIcons = {
    Medication: '/medication.png',
    Food: '/food.png',
    Environmental: '/environment.png',
    Skin: '/skin.png',
  };

  const onsetIcons = {
    Immediate: '/immediate.png',
    Delayed: '/delayed.png',
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Severe':
        return '#ff0000';
      case 'Moderate':
        return '#ff9900';
      case 'Mild':
        return '#009900';
      default:
        return '#000000';
    }
  };

  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true },
    { field: 'severityLevel', header: 'Severity Level', isSortable: true },
    { field: 'trigger', header: 'Trigger', isSortable: true },
    { field: 'onset', header: 'Onset', isSortable: true },
    { field: 'actions', header: 'Actions', isSortable: false },
  ];

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredData = allergiesData.filter((allergy) => {
    if (filterType === 'type' && filterValue) {
      return allergy.type === filterValue;
    }
    if (filterType === 'severityLevel' && filterValue) {
      return allergy.severityLevel === filterValue;
    }
    return true;
  });

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedRow) {
      try {
        await axios.delete(`http://localhost:5000/patients/66cb68934f5769ec17d174a9/allergies/${selectedRow._id}`);
        
        setAllergiesData(prevData => prevData.filter(item => item._id !== selectedRow._id));

        setSuccessModalContent('Allergy successfully deleted.');
        setSuccessModalOpen(true);
      } catch (error) {
        console.error('Error deleting allergy:', error);
      }
      handleCloseModal();
    }
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
            to="/allergies"
            startIcon={<AllergyIcon />}
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
            Back to Allergies Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#ff6f6f' }}>
            Delete Your Allergies
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
                  <MenuItem value="severityLevel">Severity Level</MenuItem>
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
                    {filterType === 'type' && allergyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                    {filterType === 'severityLevel' && severityLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HICTable
                columns={columns}
                data={filteredData.map((row) => ({
                  ...row,
                  type: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={typeIcons[row.type]} alt={row.type} style={{ width: '28px', marginRight: '8px' }} />
                      {row.type}
                    </Box>
                  ),
                  severityLevel: (
                    <Typography style={{ color: getSeverityColor(row.severityLevel), fontWeight: 'bold' }}>
                      {row.severityLevel}
                    </Typography>
                  ),
                  onset: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={onsetIcons[row.onset]} alt={row.onset} style={{ width: '28px', marginRight: '8px' }} />
                      {row.onset}
                    </Box>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="Delete allergy" arrow>
                        <img
                          src="/delete.png"
                          alt="Delete"
                          style={{ cursor: 'pointer', width: '32px' }}
                          onClick={() => handleOpenModal(row)}
                        />
                      </Tooltip>
                    </Box>
                  ),
                }))}
                defaultSortColumn="creationDate"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '1200px' }}
              />
            </Box>
          </Box>

          <HICWarningModal
            open={openModal}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
            title="Confirm Deletion"
            content="Are you sure you want to delete this allergy?"
            actions={[
              {
                label: 'Cancel',
                onClick: handleCloseModal,
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
            onClose={() => setSuccessModalOpen(false)}
            title="Success"
            content={successModalContent}
            actions={[
              {
                label: 'OK',
                onClick: () => setSuccessModalOpen(false),
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

export default DeleteAllergy;