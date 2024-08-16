import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Snackbar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Autocomplete,
} from '@mui/material';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import useTranslator from '../../../hooks/useTranslator';
import useRequestLab from '../hooks/useRequestLab';
import usePatient from '../../patients/hooks/usePatient';
import usePatients from '../../patients/hooks/usePatients';
import uuid from '../../../util/uuid';
import { format } from 'date-fns';

const NewLabRequest = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { mutate } = useRequestLab();
  
  const [newNoteText, setNewNoteText] = useState('');
  const [error, setError] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [visitOptions, setVisitOptions] = useState([]);
  const [newLabRequest, setNewLabRequest] = useState({
    patient: '',
    type: '',
    status: 'requested',
    requestedBy: user?.id || '',
    requestedOn: '',
    visitId: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { data: patients = [], refetch: refetchPatients } = usePatients();
  const { data: patient } = usePatient(selectedPatientId);

  const updateTitle = useUpdateTitle();
  useEffect(() => {
    updateTitle(t('labs.requests.new'));
  }, [updateTitle, t]);

  const breadcrumbs = [
    {
      i18nKey: 'labs.requests.new',
      location: `/labs/new`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs);

  const onPatientChange = (patient) => {
    if (patient) {
      setSelectedPatientId(patient.id);

      const visits = patient.visits?.map((v) => ({
        label: `${v.type} at ${format(new Date(v.startDateTime), 'yyyy-MM-dd hh:mm a')}`,
        value: v.id,
      })) || [];

      setVisitOptions(visits);
      setNewLabRequest((prevRequest) => ({
        ...prevRequest,
        patient: patient.id,
        fullName: patient.fullName,
      }));
    } else {
      setVisitOptions([]);
      setNewLabRequest((prevRequest) => ({
        ...prevRequest,
        patient: '',
        visitId: '',
      }));
    }
  };

  const onLabTypeChange = (event) => {
    const type = event.target.value;
    setNewLabRequest((prevRequest) => ({
      ...prevRequest,
      type,
    }));
  };

  const onNoteChange = (event) => {
    const noteText = event.target.value;
    setNewNoteText(noteText);

    const newNote = {
      id: uuid(),
      date: new Date().toISOString(),
      text: noteText,
      deleted: false,
    };

    setNewLabRequest((prevRequest) => ({
      ...prevRequest,
      notes: [newNote],
    }));
  };

  const onSave = async () => {
    try {
      const newLab = await mutate(newLabRequest);

      navigate(`/labs/${newLab?.id}`);
      setSnackbarMessage(`${t('labs.successfullyCreated')} ${newLab?.type} ${t('labs.lab.for')} ${patient?.fullName}`);
      setOpenSnackbar(true);
      setError(null);
    } catch (e) {
      setError(e);
    }
  };

  const onVisitChange = (event) => {
    setNewLabRequest((prevRequest) => ({
      ...prevRequest,
      visitId: event.target.value,
    }));
  };

  const onCancel = () => {
    navigate('/labs');
  };

  return (
    <>
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          message={t(error.message || '')}
          action={<Button color="inherit" onClick={() => setError(null)}>Close</Button>}
        />
      )}
      <form>
        <FormControl fullWidth margin="normal">
          <InputLabel id="patientTypeahead-label" required>{t('labs.lab.patient')}</InputLabel>
          <Autocomplete
            id="patientTypeahead"
            options={patients} // Use the patients fetched by usePatients
            onInputChange={(event, value) => {
              refetchPatients({ queryString: value });
            }}
            onChange={(event, patient) => onPatientChange(patient)}
            renderInput={(params) => <TextField {...params} label={t('labs.lab.patient')} />}
            isInvalid={!!error?.patient}
            helperText={t(error?.patient || '')}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="visit-label" required>{t('patient.visit')}</InputLabel>
          <Select
            id="visit"
            value={newLabRequest.visitId}
            onChange={onVisitChange}
          >
            {visitOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{t('This is a required input')}</FormHelperText>
        </FormControl>
        <TextField
          name="labType"
          label={t('labs.lab.type')}
          required
          fullWidth
          margin="normal"
          value={newLabRequest.type}
          onChange={onLabTypeChange}
          error={!!error?.type}
          helperText={t(error?.type || '')}
        />
        <TextField
          name="labNotes"
          label={t('labs.lab.notes')}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={newNoteText}
          onChange={onNoteChange}
        />
        <div style={{ textAlign: 'right', marginTop: '16px' }}>
          <Button variant="contained" color="success" onClick={onSave} style={{ marginRight: '8px' }}>
            {t('labs.requests.new')}
          </Button>
          <Button variant="contained" color="error" onClick={onCancel}>
            {t('actions.cancel')}
          </Button>
        </div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
          action={<Button color="inherit" onClick={() => setOpenSnackbar(false)}>Close</Button>}
        />
      </form>
    </>
  );
};

export default NewLabRequest;
