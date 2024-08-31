import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../../components/HICTable';
import Loading from '../../../app-components/Loading';
import NoteIcon from '@mui/icons-material/Note';
import HICWarningModal from '../../../components/HICWarningModal';
import HICSuccessModal from '../../../components/HICSuccessModal'; // Import the success modal
import axios from 'axios';

const DeleteNote = ({ patientId }) => {
  const [loading, setLoading] = useState(true);
  const [notesData, setNotesData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false); // Success modal state
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`/doctors/66cbb31025bfefa0333b2882/notes`);
        setNotesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setLoading(false);
      }
    };
    fetchNotes();
  }, [patientId]);

  // Define possible values for filters
  const noteTypes = ['Doctor', 'Patient', 'System', 'Other'];

  // Paths for the icons (replace with actual paths)
  const typeIcons = {
    Doctor: '/doctor.png',
    Patient: '/patient.png',
    System: '/system.png',
    Other: '/other-note.png',
  };

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'name', header: 'Name', isSortable: true },
    { field: 'type', header: 'Type', isSortable: true },
    { field: 'content', header: 'Content', isSortable: true },
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
  const filteredData = notesData.filter((note) => {
    if (filterType === 'type' && filterValue) {
      return note.type === filterValue;
    }
    return true;
  });

  const handleOpenModal = (note) => {
    setSelectedNote(note);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNote(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedNote) {
      try {
        await axios.delete(`/doctors/66cbb31025bfefa0333b2882/notes/${selectedNote._id}`);
        setNotesData(prevData => prevData.filter(note => note._id !== selectedNote._id));
        setOpenSuccessModal(true); // Open success modal on successful deletion
      } catch (error) {
        console.error('Error deleting note:', error);
      } finally {
        handleCloseModal();
      }
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
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
            to="/doctor/notes"
            startIcon={<NoteIcon />}
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
            Back to Notes Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#ff6f6f' }}>
            Delete Your Notes
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
                    {filterType === 'type' && noteTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            {/* Notes Table */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HICTable
                columns={columns}
                data={filteredData.map((row, index) => ({
                  ...row,
                  index: index + 1, // Ensure index is properly displayed
                  type: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={typeIcons[row.type]} alt={row.type} style={{ width: '40px', marginRight: '8px' }} />
                      {row.type}
                    </Box>
                  ),
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="Delete note" arrow>
                        <img
                          src="/delete.png"
                          alt="Delete"
                          style={{ cursor: 'pointer', width: '32px' }}
                          onClick={() => handleOpenModal(row)} // Open confirmation modal
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

          {/* Warning Modal for Deletion Confirmation */}
          <HICWarningModal
            open={openModal}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
            title="Confirm Deletion"
            content="Are you sure you want to delete this note?"
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
            open={openSuccessModal}
            onClose={handleCloseSuccessModal}
            title="Note Deleted"
            content="The note has been deleted successfully."
            actions={[
              {
                label: 'Close',
                onClick: handleCloseSuccessModal,
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

export default DeleteNote;