import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HICTable from '../../components/HICTable';
import Loading from '../../app-components/Loading';
import PersonIcon from '@mui/icons-material/Person';
import ViewPatientModal from './view/ViewPatientModal';

// Enum definitions
const OCCUPATION_ENUM = {
  Employed: 'Employed Student',
  Student: 'Unemployed Student',
};

const SMOKING_STATUS_ENUM = {
  Smoker: 'Smoker',
  None: 'None',
};

const BLOOD_TYPE_ENUM = {
  O_PLUS: 'O+',
  O_MINUS: 'O-',
  A_PLUS: 'A+',
  A_MINUS: 'A-',
  B_PLUS: 'B+',
  B_MINUS: 'B-',
  AB_PLUS: 'AB+',
  AB_MINUS: 'AB-',
};

// Color mapping for blood types
const BLOOD_TYPE_COLORS = {
  [BLOOD_TYPE_ENUM.O_PLUS]: '#ff9999',
  [BLOOD_TYPE_ENUM.O_MINUS]: '#ff6666',
  [BLOOD_TYPE_ENUM.A_PLUS]: '#99ff99',
  [BLOOD_TYPE_ENUM.A_MINUS]: '#66ff66',
  [BLOOD_TYPE_ENUM.B_PLUS]: '#9999ff',
  [BLOOD_TYPE_ENUM.B_MINUS]: '#6666ff',
  [BLOOD_TYPE_ENUM.AB_PLUS]: '#ffcc99',
  [BLOOD_TYPE_ENUM.AB_MINUS]: '#ff9966',
};

// Icons for occupation and smoking status
const OCCUPATION_ICONS = {
  [OCCUPATION_ENUM.Employed]: '/employed.png',
  [OCCUPATION_ENUM.Student]: '/unemployed.png',
};

const SMOKING_STATUS_ICONS = {
  [SMOKING_STATUS_ENUM.Smoker]: '/smoker.png',
  [SMOKING_STATUS_ENUM.None]: '/no-smoker.png',
};

// Function to format dates to 'yyyy-mm-dd'
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (`0${d.getMonth() + 1}`).slice(-2);
  const day = (`0${d.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

const ViewPatients = () => {
  const [loading, setLoading] = useState(true);
  const [patientsData, setPatientsData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`/doctors/66cbb31025bfefa0333b2882/patients`);
        const patients = response.data.map(patient => ({
          ...patient,
          creationDate: formatDate(patient.creationDate),
          updateDate: formatDate(patient.updateDate),
          birthDate: formatDate(patient.birthDate), // Format birth date
        }));
        setPatientsData(patients);
      } catch (error) {
        console.error('Error fetching doctor patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'creationDate', header: 'Creation Date', isSortable: true },
    { field: 'updateDate', header: 'Update Date', isSortable: true },
    { field: 'firstName', header: 'First Name', isSortable: true },
    { field: 'lastName', header: 'Last Name', isSortable: true },
    { field: 'birthDate', header: 'Birth Date', isSortable: true },
    { field: 'occupation', header: 'Occupation', isSortable: true },
    { field: 'bloodType', header: 'Blood Type', isSortable: true },
    { field: 'height', header: 'Height (cm)', isSortable: true },
    { field: 'weight', header: 'Weight (kg)', isSortable: true },
    { field: 'lastBloodPressureSystolic', header: 'Last Blood Pressure Systolic', isSortable: true },
    { field: 'lastBloodPressureDiastolic', header: 'Last Blood Pressure Diastolic', isSortable: true },
    { field: 'smokingStatus', header: 'Smoking Status', isSortable: true },
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
  const filteredData = patientsData.filter((patient) => {
    if (filterType && filterValue) {
      return patient[filterType] && patient[filterType].toLowerCase().includes(filterValue.toLowerCase());
    }
    return true;
  });

  const openModal = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
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
            to="/patients"
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
            Back to Patients Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#ff6f6f' }}>
            View Your Patients
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
                  <MenuItem value="occupation">Occupation</MenuItem>
                  <MenuItem value="smokingStatus">Smoking Status</MenuItem>
                  <MenuItem value="bloodType">Blood Type</MenuItem>
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
                    {filterType === 'occupation' && Object.values(OCCUPATION_ENUM).map((occupation) => (
                      <MenuItem key={occupation} value={occupation}>
                        {occupation}
                      </MenuItem>
                    ))}
                    {filterType === 'smokingStatus' && Object.values(SMOKING_STATUS_ENUM).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                    {filterType === 'bloodType' && Object.values(BLOOD_TYPE_ENUM).map((bloodType) => (
                      <MenuItem key={bloodType} value={bloodType}>
                        {bloodType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            {/* Patients Table */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HICTable
                columns={columns}
                data={filteredData.map((row, index) => ({
                  ...row,
                  index: index + 1,
                  occupation: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={OCCUPATION_ICONS[row.occupation]}
                        alt={row.occupation}
                        style={{ width: '40px', marginRight: '8px' }}
                      />
                      {row.occupation}
                    </Box>
                  ),
                  smokingStatus: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={SMOKING_STATUS_ICONS[row.smokingStatus]}
                        alt={row.smokingStatus}
                        style={{ width: '40px', marginRight: '8px' }}
                      />
                      {row.smokingStatus}
                    </Box>
                  ),
                  bloodType: (
                    <Tooltip title={row.bloodType}>
                      <Box
                        sx={{
                          display: 'inline-block',
                          backgroundColor: BLOOD_TYPE_COLORS[row.bloodType],
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {row.bloodType}
                      </Box>
                    </Tooltip>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="View patient details" arrow>
                        <img
                          src="/view.png"
                          alt="View"
                          style={{ cursor: 'pointer', width: '40px' }}
                          onClick={() => openModal(row)}
                        />
                      </Tooltip>
                      <Tooltip title="View allergies" arrow>
                        <img
                          src="/view-patient-allergies.png"
                          alt="Allergies"
                          style={{ cursor: 'pointer', width: '40px' }}
                          onClick={() => navigate(`/patients/allergies/${row._id}`)}
                        />
                      </Tooltip>
                      <Tooltip title="View diagnoses" arrow>
                        <img
                          src="/view-patient-diagnoses.png"
                          alt="Diagnoses"
                          style={{ cursor: 'pointer', width: '40px' }}
                          onClick={() => navigate(`/patients/diagnoses/${row._id}`)}
                        />
                      </Tooltip>
                      <Tooltip title="View medications" arrow>
                        <img
                          src="/view-patient-medications.png"
                          alt="Medications"
                          style={{ cursor: 'pointer', width: '40px' }}
                          onClick={() => navigate(`/patients/medications/${row._id}`)}
                        />
                      </Tooltip>
                    </Box>
                  ),
                }))}
                defaultSortColumn="creationDate"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '2000px' }}
              />
            </Box>
          </Box>
          <ViewPatientModal
            open={isModalOpen}
            onClose={closeModal}
            patient={selectedPatient}
          />
        </>
      )}
    </Box>
  );
};

export default ViewPatients;