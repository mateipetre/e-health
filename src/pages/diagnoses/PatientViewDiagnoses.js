import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import HICTable from '../../components/HICTable';
import Loading from '../../app-components/Loading';
import HealingIcon from '@mui/icons-material/LocalHospital';
import ViewDiagnosisModal from './view/ViewDiagnosisModal';

// Function to format dates
function getCurrentDateFormatted(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

const ViewDiagnoses = () => {
  const { patientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [diagnosesData, setDiagnosesData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get(`/patients/${patientId}/diagnoses`);
        setDiagnosesData(response.data);
      } catch (error) {
        console.error('Error fetching patient diagnoses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnoses();
  }, [patientId]);

  const diagnosisTypes = ['Normal', 'Acute', 'Chronic'];

  const pastelBlue = '#6faaff';
  const pastelRed = '#ff6f6f';

  const typeIcons = {
    Normal: '/normal.png',
    Acute: '/acute.png',
    Chronic: '/chronic.png',
  };

  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    {
      field: 'creationDate',
      header: 'Creation Date',
      isSortable: true,
      render: (date) => getCurrentDateFormatted(new Date(date)),
    },
    {
      field: 'updateDate',
      header: 'Update Date',
      isSortable: true,
      render: (date) => getCurrentDateFormatted(new Date(date)),
    },
    {
      field: 'name',
      header: 'Diagnosis Name',
      isSortable: true,
    },
    {
      field: 'type',
      header: 'Type',
      isSortable: true,
      render: (type) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={typeIcons[type]} alt={type} style={{ width: '28px', marginRight: '8px' }} />
          {type}
        </Box>
      ),
    },
    { field: 'code', header: 'Code', isSortable: true },
    { field: 'cause', header: 'Cause', isSortable: true },
    {
      field: 'recurrent',
      header: 'Recurrent',
      isSortable: true,
      render: (recurrent) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {recurrent}
        </Box>
      ),
    },
    {
      field: 'infectious',
      header: 'Infectious',
      isSortable: true,
      render: (infectious) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {infectious}
        </Box>
      ),
    },
    { field: 'principalSymptom', header: 'Principal Symptom', isSortable: true },
    {
      field: 'actions',
      header: 'Actions',
      isSortable: false,
    },
  ];

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredData = diagnosesData.filter((diagnosis, index) => {
    diagnosis.index = index + 1;
    if (filterType === 'type' && filterValue) {
      return diagnosis.type === filterValue;
    }
    if (filterType === 'recurrent' && filterValue) {
      return diagnosis.recurrent === filterValue;
    }
    return true;
  });

  const openModal = (diagnosis) => {
    const formattedDiagnosis = {
      ...diagnosis,
      creationDate: getCurrentDateFormatted(new Date(diagnosis.creationDate)),
      updateDate: getCurrentDateFormatted(new Date(diagnosis.updateDate)),
    };
    setSelectedDiagnosis(formattedDiagnosis);
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

          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: pastelRed }}>
            View Your Diagnoses
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
                  <MenuItem value="recurrent">Recurrent</MenuItem>
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

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HICTable
                columns={columns}
                data={filteredData.map((row) => ({
                  ...row,
                  creationDate: getCurrentDateFormatted(new Date(row.creationDate)),
                  updateDate: getCurrentDateFormatted(new Date(row.updateDate)),
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
                      <Tooltip title="View diagnosis details" arrow>
                        <img
                          src="/view.png"
                          alt="View"
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
                sx={{ width: '100%', maxWidth: '1400px' }}
              />
            </Box>
          </Box>

          <ViewDiagnosisModal
            open={isModalOpen}
            onClose={closeModal}
            diagnosis={selectedDiagnosis}
          />
        </>
      )}
    </Box>
  );
};

export default ViewDiagnoses;