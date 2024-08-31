import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HICTable from '../../../components/HICTable'; // Adjust the path as necessary
import Loading from '../../../app-components/Loading';
import NoteIcon from '@mui/icons-material/Note';
import EditNoteModal from './UpdateNoteModal'; // Make sure this is the correct path to your EditNoteModal component
import axios from 'axios'; // For making HTTP requests
import dayjs from 'dayjs'; // For formatting dates

const EditNotes = () => {
  const [loading, setLoading] = useState(true);
  const [notesData, setNotesData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/patients/66cb68934f5769ec17d174a9/notes'); // Update with actual patientId if needed
        const notes = response.data.map(note => ({
          ...note,
          creationDate: dayjs(note.creationDate).format('YYYY-MM-DD'),
          updateDate: dayjs(note.updateDate).format('YYYY-MM-DD'),
        }));
        setNotesData(notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Define possible values for filters
  const noteTypes = ['Doctor', 'Patient', 'System', 'Other'];

  // Paths for the icons
  const typeIcons = {
    Doctor: '/doctor.png',
    Patient: '/patient.png',
    System: '/system.png',
    Other: '/other-note.png',
  };

  // Define columns for the table
  const columns = [
    { field: 'index', header: 'Index', isSortable: true },
    { field: 'creationDate', header: 'Creation Date', isSortable: true },
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

  const openModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
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
            to="/notes"
            startIcon={<NoteIcon />}
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
            Back to Notes Dashboard
          </Button>

          <Box sx={{ marginTop: 10 }}></Box>
          {/* Title */}
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#ff6f6f' }}> {/* Pastel Red */}
            Edit Your Notes
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
                  index: index + 1,
                  actions: (
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Tooltip title="Edit note details" arrow>
                        <img
                          src="/edit.png"
                          alt="Edit"
                          style={{ cursor: 'pointer', width: '32px' }}
                          onClick={() => openModal(row)} // Open modal with selected note
                        />
                      </Tooltip>
                    </Box>
                  ),
                  type: (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={typeIcons[row.type]} alt={row.type} style={{ width: '24px', height: '24px' }} />
                      {row.type}
                    </Box>
                  )
                }))}
                defaultSortColumn="creationDate"
                defaultSortDirection="asc"
                backgroundColor="#f5f5f5"
                textColor="#333"
                sx={{ width: '100%', maxWidth: '1200px' }}
              />
            </Box>
          </Box>

          {/* Edit Note Modal */}
          {isModalOpen && (
            <EditNoteModal
              open={isModalOpen}
              onClose={closeModal}
              note={selectedNote}
              onSave={(updatedNote) => {
                // Update the notesData with the updated note
                setNotesData((prevNotes) => prevNotes.map((note) => 
                  note._id === updatedNote._id ? updatedNote : note
                ));
                closeModal();
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default EditNotes;