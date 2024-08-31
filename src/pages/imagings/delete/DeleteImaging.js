/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip, Modal } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import ImagingIcon from '@mui/icons-material/CameraAlt';
import HICWarningModal from '../../../components/HICWarningModal';
import HICSuccessModal from '../../../components/HICSuccessModal';
import axios from 'axios';

const DeleteImaging = () => {
  const [loading, setLoading] = useState(true);
  const [imagingData, setImagingData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedImaging, setSelectedImaging] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [doctorId] = useState('66cbb31025bfefa0333b2882'); // Example doctor ID, replace with actual

  const imagingTypes = ['radiography', 'computed tomography', 'fluoroscopy'];
  const statusTypes = ['Need Result', 'Done'];

  const pastelBlue = '#6faaff';
  const pastelRed = '#ff6f6f';

  const typeColors = {
    'radiography': '#ffcccb',
    'computed tomography': '#ccffcc',
    'fluoroscopy': '#ccccff',
  };

  const statusIcons = {
    'Need Result': '/waiting.png',
    'Done': '/done2.png',
  };

  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'name', header: 'Name', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true },
    { field: 'conditionSuspicion', header: 'Condition Suspicion', isSortable: true },
    { field: 'code', header: 'Code', isSortable: true },
    { field: 'patientName', header: 'Patient Name', isSortable: true },
    { field: 'image', header: 'Image', isSortable: true },
    { field: 'status', header: 'Status', isSortable: true },
    { field: 'actions', header: 'Actions', isSortable: false },
  ];

  useEffect(() => {
    const fetchImagingData = async () => {
      try {
        const response = await axios.get(`/doctors/${doctorId}/imagings`);
        setImagingData(response.data);
      } catch (error) {
        console.error('Error fetching imaging data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagingData();
  }, [doctorId]);

  const getTypeColor = (type) => {
    return typeColors[type] || '#ffffff'; // Default to white if type not found
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue(''); // Clear secondary filter value
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredData = imagingData.filter((imaging) => {
    if (filterType === 'type' && filterValue) {
      return imaging.type === filterValue;
    }
    if (filterType === 'status' && filterValue) {
      return imaging.status === filterValue;
    }
    return true;
  });

  const openImagePreview = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
  };

  const handleOpenModal = (imaging) => {
    setSelectedImaging(imaging);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImaging(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedImaging) {
      try {
        await axios.delete(`/doctors/${doctorId}/imagings/${selectedImaging._id}`);
        setImagingData((prevData) => prevData.filter(item => item._id !== selectedImaging._id));
        setSuccessModalOpen(true);
      } catch (error) {
        console.error('Error deleting imaging record:', error);
      } finally {
        handleCloseModal();
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

          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/imaging"
            startIcon={<ImagingIcon />}
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
            Back to Imaging Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: pastelRed }}>
            Delete Your Imaging Requests
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
                    {filterType === 'type' && imagingTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                    {filterType === 'status' && statusTypes.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            {/* Imaging Table */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HICTable
                columns={columns}
                data={filteredData.map((row, index) => ({
                  ...row,
                  index: index + 1,
                  type: (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: getTypeColor(row.type),
                        borderRadius: '4px',
                        padding: '4px 8px',
                      }}
                    >
                      {row.type}
                    </Box>
                  ),
                  image: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="View image" arrow>
                        <img
                          src="/image-icon.png"
                          alt="View image"
                          style={{ cursor: 'pointer', width: '40px' }}
                          onClick={() => openImagePreview(row.image)}
                        />
                      </Tooltip>
                    </Box>
                  ),
                  status: (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <img
                        src={statusIcons[row.status]}
                        alt={row.status}
                        style={{ width: '32px', height: '32px' }}
                      />
                      {row.status}
                    </Box>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="Delete imaging" arrow>
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
                defaultSortColumn="creation_date"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '1500px' }}
              />
            </Box>
          </Box>

          {/* Image Preview Modal */}
          <Modal
            open={!!selectedImage}
            onClose={closeImagePreview}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <img src={selectedImage} alt="Imaging Preview" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
            </Box>
          </Modal>

          {/* Warning Modal */}
          <HICWarningModal
            open={openModal}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
            title="Confirm Deletion"
            content="Are you sure you want to delete this imaging?"
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

          {/* Success Modal */}
          <HICSuccessModal
            open={successModalOpen}
            onClose={() => setSuccessModalOpen(false)}
            title="Success"
            content="The imaging record has been successfully deleted."
            actions={[
              {
                label: 'Close',
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

export default DeleteImaging;