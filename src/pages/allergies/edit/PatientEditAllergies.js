/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import AllergyIcon from '@mui/icons-material/Healing';
import axios from 'axios';
import UpdateAllergyModal from './UpdateAllergyModal';

const EditAllergies = () => {
  const { patientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [allergiesData, setAllergiesData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedAllergy, setSelectedAllergy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllergies();
  }, [patientId]);

  const fetchAllergies = async () => {
    try {
      const response = await axios.get(`/patients/${patientId}/allergies`);
      setAllergiesData(response.data);
    } catch (error) {
      console.error('Error fetching allergies:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const allergyTypes = ['Medication', 'Food', 'Environmental', 'Skin'];
  const severityLevels = ['Severe', 'Moderate', 'Mild'];

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

  const formatAllergiesData = (data) => {
    return data.map((allergy, index) => ({
      ...allergy,
      index: index + 1,
      type: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={typeIcons[allergy.type]} alt={allergy.type} style={{ width: '28px', marginRight: '8px' }} />
          {allergy.type}
        </Box>
      ),
      severityLevel: (
        <Typography style={{ color: getSeverityColor(allergy.severityLevel), fontWeight: 'bold' }}>
          {allergy.severityLevel}
        </Typography>
      ),
      onset: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={onsetIcons[allergy.onset]} alt={allergy.onset} style={{ width: '28px', marginRight: '8px' }} />
          {allergy.onset}
        </Box>
      ),
      actions: (
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <Tooltip title="Update allergy details" arrow>
            <img
              src="/edit.png"
              alt="Edit"
              style={{ cursor: 'pointer', width: '32px' }}
              onClick={() => openModal(allergy)}
            />
          </Tooltip>
        </Box>
      ),
    }));
  };

  const filteredData = formatAllergiesData(allergiesData).filter((allergy) => {
    if (filterType === 'type' && filterValue) {
      return allergy.type.props.children === filterValue;
    }
    if (filterType === 'severityLevel' && filterValue) {
      return allergy.severityLevel.props.children === filterValue;
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
            to={`/patients/allergies/${patientId}`}
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
            Update Allergies
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
                data={filteredData}
                defaultSortColumn="date"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '1200px' }}
              />
            </Box>
          </Box>

          {selectedAllergy && (
            <UpdateAllergyModal
              open={isModalOpen}
              onClose={closeModal}
              allergy={selectedAllergy}
              onUpdate={fetchAllergies}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default EditAllergies;