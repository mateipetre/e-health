import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../components/HICTable';
import Loading from '../../app-components/Loading';
import PersonIcon from '@mui/icons-material/Person';
import ViewRelatedPersonModal from './view/ViewRelatedPersonModal';

const ViewRelatedPersons = () => {
  const [loading, setLoading] = useState(true);
  const [personsData, setPersonsData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRelatedPersons = async () => {
      try {
        const response = await axios.get('/doctors/66cbb31025bfefa0333b2882/relatedpersons'); // Replace DOCTOR_ID with actual ID
        setPersonsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching related persons:', error);
        setLoading(false);
      }
    };

    fetchRelatedPersons();
  }, []);

  const bloodTypes = ['O', 'A', 'B', 'AB'];
  const bloodRhs = ['Positive', 'Negative'];

  const darkColors = {
    O: '#003366', // Dark Blue
    A: '#ffde21', // Dark Red
    B: '#06a94d', // Dark Green
    AB: '#993300', // Dark Orange
    Positive: '#ff4d01', // Dark Indigo
    Negative: '#800080', // Dark Purple
  };

  // Format dates to 'yyyy-mm-dd'
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'creationDate', header: 'Creation Date', isSortable: true },
    { field: 'updateDate', header: 'Update Date', isSortable: true },
    { field: 'firstName', header: 'First Name', isSortable: true },
    { field: 'lastName', header: 'Last Name', isSortable: true },
    { field: 'relation', header: 'Relation', isSortable: true },
    { field: 'patientName', header: 'Patient Name', isSortable: true },
    { field: 'bloodRelative', header: 'Blood Relative', isSortable: true },
    { field: 'email', header: 'Email', isSortable: true },
    { field: 'phoneNumber', header: 'Phone Number', isSortable: true },
    { field: 'principalLanguage', header: 'Principal Language', isSortable: true },
    { field: 'bloodType', header: 'Blood Type', isSortable: true },
    { field: 'bloodRh', header: 'Blood Rh', isSortable: true },
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
  const filteredData = personsData.filter((person) => {
    if (filterType === 'bloodType' && filterValue) {
      return person.bloodType === filterValue;
    }
    if (filterType === 'bloodRh' && filterValue) {
      return person.bloodRh === filterValue;
    }
    return true;
  });

  const openModal = (person) => {
    setSelectedPerson({
      ...person,
      creationDate: formatDate(person.creationDate),
      updateDate: formatDate(person.updateDate),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPerson(null);
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
            to="/related-persons"
            startIcon={<PersonIcon />}
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
            Back to Related Persons Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#ff6f6f' }}>
            View Your Related Persons
          </Typography>

          {/* Filters and Table */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'right', mb: 2, marginRight: 115 }}>
              {/* Primary Filter Type */}
              <Typography variant="h7" sx={{ marginTop: '20px' }}>
                Filter by:
              </Typography>
              <FormControl fullWidth sx={{ width: 130 }}>
                <InputLabel>Select filter</InputLabel>
                <Select
                  value={filterType}
                  onChange={handleFilterTypeChange}
                  label="Filter Type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="bloodType">Blood Type</MenuItem>
                  <MenuItem value="bloodRh">Blood Rh</MenuItem>
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
                    {filterType === 'bloodType' && bloodTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                    {filterType === 'bloodRh' && bloodRhs.map((rh) => (
                      <MenuItem key={rh} value={rh}>
                        {rh}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            {/* Related Persons Table */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HICTable
                columns={columns}
                data={filteredData.map((row, index) => ({
                  ...row,
                  index: index + 1,
                  creationDate: formatDate(row.creationDate),
                  updateDate: formatDate(row.updateDate),
                  bloodType: (
                    <Typography style={{ color: darkColors[row.bloodType], fontWeight: 'bold' }}>
                      {row.bloodType}
                    </Typography>
                  ),
                  bloodRh: (
                    <Typography style={{ color: darkColors[row.bloodRh], fontWeight: 'bold' }}>
                      {row.bloodRh}
                    </Typography>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="View person details" arrow>
                        <img
                          src="/view.png"
                          alt="View"
                          style={{ cursor: 'pointer', width: '32px' }}
                          onClick={() => openModal(row)} // Open modal with selected person
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
          {/* View Related Person Modal */}
          <ViewRelatedPersonModal
            open={isModalOpen}
            onClose={closeModal}
            person={selectedPerson}
          />
        </>
      )}
    </Box>
  );
};

export default ViewRelatedPersons;