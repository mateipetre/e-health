import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../components/HICTable';
import Loading from '../../app-components/Loading';
import LabIcon from '@mui/icons-material/LocalHospital';
import ViewLabModal from './view/ViewLabModal';
import dayjs from 'dayjs'; // For date formatting

const ViewLabs = ({ doctorId }) => {
  const [loading, setLoading] = useState(false);
  const [labsData, setLabsData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedLab, setSelectedLab] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLabs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/doctors/66cbb31025bfefa0333b2882/labs`);
        const labs = response.data.map(lab => ({
          ...lab,
          creationDate: dayjs(lab.creationDate).format('YYYY-MM-DD'),
          updateDate: dayjs(lab.updateDate).format('YYYY-MM-DD'),
          date: dayjs(lab.date).format('YYYY-MM-DD'),
        }));
        setLabsData(labs);
      } catch (error) {
        console.error('Error fetching doctor labs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, [doctorId]);

  const statuses = ['Done', 'Need Result'];

  const pastelBlue = '#6faaff';
  const pastelRed = '#ff6f6f';

  const statusIcons = {
    Done: '/done2.png',
    'Need Result': '/waiting.png',
  };

  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'creationDate', header: 'Creation Date', isSortable: true },
    { field: 'updateDate', header: 'Update Date', isSortable: true },
    { field: 'testName', header: 'Test Name', isSortable: true },
    { field: 'patientName', header: 'Patient Name', isSortable: true },
    { field: 'result', header: 'Result', isSortable: true },
    { field: 'unit', header: 'Unit', isSortable: true },
    { field: 'date', header: 'Date', isSortable: true },
    { field: 'code', header: 'Code', isSortable: true },
    { field: 'status', header: 'Status', isSortable: true },
    { field: 'recurrent', header: 'Recurrent', isSortable: true },
    { field: 'actions', header: 'Actions', isSortable: false },
  ];

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const transformedData = labsData.map((lab, index) => ({
    ...lab,
    index: index + 1, // Add an index field if it's not in the data
    result: lab.status === 'Need Result' ? 'Not Known' : (typeof lab.result === 'number' ? lab.result.toFixed(2) : lab.result),
    unit: lab.status === 'Need Result' ? 'N/A' : lab.unit,
  }));

  const filteredData = transformedData.filter((lab) => {
    if (filterType === 'status' && filterValue) {
      return lab.status === filterValue;
    }
    return true;
  });

  const openModal = (lab) => {
    setSelectedLab(lab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLab(null);
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
            to="/labs"
            startIcon={<LabIcon />}
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
            Back to Labs Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: pastelRed }}>
            View Your Patients' Lab Tests
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
                  <MenuItem value="status">Status</MenuItem>
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
                    {filterType === 'status' && statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
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
                  status: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={statusIcons[row.status]} alt={row.status} style={{ width: '40px', marginRight: '8px' }} />
                      {row.status}
                    </Box>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="View lab test details" arrow>
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
                sx={{ width: '100%', maxWidth: '1600px' }}
              />
            </Box>
          </Box>

          <ViewLabModal
            open={isModalOpen}
            onClose={closeModal}
            lab={selectedLab}
          />
        </>
      )}
    </Box>
  );
};

export default ViewLabs;