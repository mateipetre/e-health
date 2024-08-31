import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import AllergyIcon from '@mui/icons-material/Healing';
import EditAllergyModal from './UpdateImagingModal';

const EditAllergies = () => {
  const [loading] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedAllergy, setSelectedAllergy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data for the allergies table
  const allergiesData = [
    { index: 1, creationDate: '2024-01-01', updateDate: '2024-01-02', type: 'Medication', severityLevel: 'Severe', trigger: 'Penicillin', manifestation: 'Anaphylaxis', onset: 'Immediate', genetic: 'Yes' },
    { index: 2, creationDate: '2024-02-01', updateDate: '2024-02-02', type: 'Food', severityLevel: 'Moderate', trigger: 'Peanuts', manifestation: 'Hives', onset: 'Delayed', genetic: 'Not Known' },
    { index: 3, creationDate: '2024-03-01', updateDate: '2024-03-02', type: 'Environmental', severityLevel: 'Mild', trigger: 'Pollen', manifestation: 'Sneezing', onset: 'Immediate', genetic: 'No' },
    { index: 4, creationDate: '2024-04-01', updateDate: '2024-04-02', type: 'Skin', severityLevel: 'Moderate', trigger: 'Nickel', manifestation: 'Rash', onset: 'Delayed', genetic: 'Not Known' },
    { index: 5, creationDate: '2024-05-01', updateDate: '2024-05-02', type: 'Food', severityLevel: 'Severe', trigger: 'Shellfish', manifestation: 'Swelling', onset: 'Immediate', genetic: 'Yes' },
  ];

  // Define possible values for filters
  const allergyTypes = ['Medication', 'Food', 'Environmental', 'Skin'];
  const severityLevels = ['Severe', 'Moderate', 'Mild'];

   // Paths for the icons (replace with actual paths)
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

  // Function to get severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Severe':
        return '#ff0000'; // Red for severe
      case 'Moderate':
        return '#ff9900'; // Orange for moderate
      case 'Mild':
        return '#009900'; // Green for mild
      default:
        return '#000000'; // Default black
    }
  };

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    // { field: 'creationDate', header: 'Creation Date', isSortable: true },
    // { field: 'updateDate', header: 'Update Date', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true },
    { field: 'severityLevel', header: 'Severity Level', isSortable: true },
    { field: 'trigger', header: 'Trigger', isSortable: true },
    // { field: 'manifestation', header: 'Manifestation', isSortable: true },
    { field: 'onset', header: 'Onset', isSortable: true },
    // { field: 'genetic', header: 'Genetic', isSortable: true },
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
  const filteredData = allergiesData.filter((allergy) => {
    if (filterType === 'type' && filterValue) {
      return allergy.type === filterValue;
    }
    if (filterType === 'severityLevel' && filterValue) {
      return allergy.severityLevel === filterValue;
    }
    return true;
  });

  const openModal = (allergy) => {
    setSelectedAllergy(allergy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAllergy(null);
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
            to="/allergies"
            startIcon={<AllergyIcon />}
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
            Back to Allergies Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#ff6f6f' }}> {/* Pastel Red */}
            Edit Your Allergies
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

            {/* Allergies Table */}
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
                      <Tooltip title="Edit allergy details" arrow>
                        <img
                          src="/edit.png"
                          alt="Edit"
                          style={{ cursor: 'pointer', width: '32px' }}
                          onClick={() => openModal(row)} // Open modal with selected allergy
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

          {/* Edit Allergy Modal */}
          {isModalOpen && (
            <EditAllergyModal
              open={isModalOpen}
              onClose={closeModal}
              allergy={selectedAllergy}
              onSave={(updatedAllergy) => {
                // Update the allergiesData with the updated allergy
                setSelectedAllergy(updatedAllergy);
                closeModal();
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default EditAllergies;