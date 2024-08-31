import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import HICTable from '../../components/HICTable';
import Loading from '../../app-components/Loading';
import ViewCarePlanModal from './view/ViewCarePlanModal';
import CarePlanIcon from '@mui/icons-material/Assignment'; // Example icon
import axios from 'axios'; // For API calls

const ViewCarePlans = () => {
  const { doctorId } = useParams(); // Get doctorId from URL params
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [carePlansData, setCarePlansData] = useState([]);
  const [selectedCarePlan, setSelectedCarePlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('');

  useEffect(() => {
    const fetchCarePlans = async () => {
      try {
        const response = await axios.get(`/doctors/66cbb31025bfefa0333b2882/care-plans`);
        const carePlans = response.data.map((plan) => ({
          ...plan,
          creationDate: new Date(plan.creationDate).toISOString().split('T')[0],
          updateDate: new Date(plan.updateDate).toISOString().split('T')[0],
        }));
        setCarePlansData(carePlans);
      } catch (error) {
        console.error('Error fetching care plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarePlans();
  }, [doctorId]);

  // Define possible values for filters
  const carePlanTypes = ['Permanent', 'Temporary'];

  const typeIcons = {
    Permanent: '/permanent.png',
    Temporary: '/temporary.png',
  };

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'creationDate', header: 'Creation Date', isSortable: true },
    { field: 'updateDate', header: 'Update Date', isSortable: true },
    { field: 'name', header: 'Name', isSortable: true },
    { field: 'purpose', header: 'Purpose', isSortable: true },
    { field: 'patientName', header: 'Patient Name', isSortable: true },
    { field: 'patientCondition', header: 'Patient Condition', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true },
    { field: 'pdfDocument', header: 'PDF Document', isSortable: false },
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
  const filteredData = carePlansData.filter((carePlan) => {
    if (filterType === 'type' && filterValue) {
      return carePlan.type === filterValue;
    }
    return true;
  });

  const openModal = (carePlan) => {
    setSelectedCarePlan(carePlan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCarePlan(null);
  };

  const openPdfPreview = (url) => {
    setPdfPreviewUrl(url);
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
            to="/care-plans"
            startIcon={<CarePlanIcon />}
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
            Back to Care Plans Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#ff6f6f' }}>
            View Your Care Plans
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
                    {filterType === 'type' && carePlanTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            {/* Care Plans Table */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HICTable
                columns={columns}
                data={filteredData.map((row, index) => ({
                  ...row,
                  index: index + 1, // Add index
                  type: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={typeIcons[row.type]} alt={row.type} style={{ width: '36px', marginRight: '8px' }} />
                      {row.type}
                    </Box>
                  ),
                  pdfDocument: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                    <Tooltip title="View PDF" arrow>
                      <img
                        src="/pdf.png"
                        alt="View PDF"
                        style={{ cursor: 'pointer', width: '40px' }}
                        onClick={() => openPdfPreview(row.pdfDocument)}
                      />
                    </Tooltip>
                    </Box>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="View care plan details" arrow>
                        <img
                          src="/view.png"
                          alt="View"
                          style={{ cursor: 'pointer', width: '32px' }}
                          onClick={() => openModal(row)} // Open modal with selected care plan
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

          {/* View Care Plan Modal */}
          <ViewCarePlanModal
            open={isModalOpen}
            onClose={closeModal}
            carePlan={selectedCarePlan}
          />

          {/* PDF Preview */}
          {pdfPreviewUrl && (
            <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#fff', zIndex: 1500, overflow: 'auto' }}>
              <iframe
                src={pdfPreviewUrl}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="PDF Preview"
              />
              <Button
                onClick={() => setPdfPreviewUrl('')}
                sx={{ position: 'absolute', top: 15, right: 150, color: '#fff', backgroundColor: '#ff6f6f',
                  '&:hover': {
                    backgroundColor: '#e64a19',
                  },
                  textTransform: 'none', }}
              >
                Close
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ViewCarePlans;