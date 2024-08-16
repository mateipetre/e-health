import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button, TextField, Typography, Card, CardContent, Chip, Alert, Snackbar, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import useAddBreadcrumbs from '../page-header/breadcrumbs/useAddBreadcrumbs';
import { useUpdateTitle } from '../page-header/title/TitleContext';
import usePatient from '../patients/hooks/usePatient';
import useTranslator from '../../hooks/useTranslator';
import Permissions from '../../app-components/Permissions';
import uuid from '../../util/uuid';
import useCancelLab from './hooks/useCancelLab';
import useCompleteLab from './hooks/useCompleteLab';
import useLab from './hooks/useLab';
import useUpdateLab from './hooks/useUpdateLab';

const getTitle = (patient, lab) =>
  patient && lab ? `${lab.type} for ${patient.fullName} (${lab.code})` : '';

const ViewLab = () => {
  const { id } = useParams();
  const { t } = useTranslator();
  const navigate = useNavigate();
  const { permissions } = useSelector((state) => state.user);

  const [labToView, setLabToView] = useState(undefined);
  const [newNoteText, setNewNoteText] = useState('');
  const [isEditable, setIsEditable] = useState(true);
  const [error, setError] = useState(undefined);

  const { data: lab } = useLab(id || '');
  const { data: patient } = usePatient(lab?.patient ?? '');
  const { mutateAsync: updateLab } = useUpdateLab();
  const { mutateAsync: completeLab } = useCompleteLab();
  const { mutateAsync: cancelLab } = useCancelLab();

  const updateTitle = useUpdateTitle();
  useEffect(() => {
    updateTitle(getTitle(patient, labToView));
  }, [patient, labToView, updateTitle]);

  const breadcrumbs = [
    {
      i18nKey: 'labs.requests.view',
      location: `/labs/${labToView?.id}`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs);

  useEffect(() => {
    if (lab) {
      setLabToView({ ...lab });
      setIsEditable(lab.status === 'requested');
    }
  }, [lab]);

  const onResultChange = (event) => {
    const result = event.target.value;
    setLabToView((prevLabToView) => prevLabToView && ({ ...prevLabToView, result }));
  };

  const onNotesChange = (event) => {
    const notes = event.target.value;
    setNewNoteText(notes);
  };

  const deleteNote = async (noteIdToDelete) => {
    if (!labToView || !labToView.notes) {
      return;
    }

    const updatedNotes = labToView.notes.map((note) => {
      if (note.id === noteIdToDelete) {
        note.deleted = true;
      }
      return note;
    });

    const newLab = {
      ...labToView,
      notes: updatedNotes,
    };

    await updateLab(newLab);
    setError({ message: t('labs.successfullyDeletedNote') });
  };

  const onUpdate = async () => {
    if (labToView) {
      const newLab = { ...labToView };

      if (newNoteText) {
        const newNote = {
          id: uuid(),
          date: new Date().toISOString(),
          text: newNoteText,
          deleted: false,
        };

        newLab.notes = newLab.notes ? [...newLab.notes, newNote] : [newNote];
        setNewNoteText('');
      }

      const updatedLab = await updateLab(newLab);
      navigate(`/labs/${updatedLab?.id}`);
      setError({ message: `${t('labs.successfullyUpdated')} ${updatedLab?.type} for ${patient?.fullName}` });
    }
    setError(undefined);
  };

  const onComplete = async () => {
    try {
      if (labToView) {
        const completedLab = await completeLab(labToView);
        navigate(`/labs/${completedLab?.id}`);
        setError({ message: `${t('labs.successfullyCompleted')} ${completedLab?.type} for ${patient?.fullName}` });
      }
      setError(undefined);
    } catch (e) {
      setError(e);
    }
  };

  const onCancel = async () => {
    if (labToView) {
      await cancelLab(labToView);
      navigate('/labs');
    }
  };

  const getButtons = () => {
    const buttons = [];
    if (labToView?.status === 'completed' || labToView?.status === 'canceled') {
      return buttons;
    }

    buttons.push(
      <Button variant="contained" color="success" onClick={onUpdate} key="actions.update">
        {t('labs.requests.update')}
      </Button>
    );

    if (permissions.includes(Permissions.CompleteLab)) {
      buttons.push(
        <Button variant="contained" color="primary" onClick={onComplete} key="labs.requests.complete">
          {t('labs.requests.complete')}
        </Button>
      );
    }

    if (permissions.includes(Permissions.CancelLab)) {
      buttons.push(
        <Button variant="contained" color="error" onClick={onCancel} key="labs.requests.cancel">
          {t('labs.requests.cancel')}
        </Button>
      );
    }

    return buttons;
  };

  if (labToView && patient) {
    const getBadgeColor = () => {
      if (labToView.status === 'completed') {
        return 'primary';
      }
      if (labToView.status === 'canceled') {
        return 'error';
      }
      return 'warning';
    };

    const getCanceledOnOrCompletedOnDate = () => {
      if (labToView.status === 'completed' && labToView.completedOn) {
        return (
          <CardContent>
            <Typography variant="h6">{t('labs.lab.completedOn')}</Typography>
            <Typography variant="body1">{format(new Date(labToView.completedOn), 'yyyy-MM-dd hh:mm a')}</Typography>
          </CardContent>
        );
      }
      if (labToView.status === 'canceled' && labToView.canceledOn) {
        return (
          <CardContent>
            <Typography variant="h6">{t('labs.lab.canceledOn')}</Typography>
            <Typography variant="body1">{format(new Date(labToView.canceledOn), 'yyyy-MM-dd hh:mm a')}</Typography>
          </CardContent>
        );
      }
      return null;
    };

    const getPastNotes = () => {
      if (labToView?.notes?.length) {
        return labToView.notes
          .filter((note) => !note.deleted)
          .map((note) => (
            <Card key={note.id} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1">{note.text}</Typography>
                {labToView.status === 'requested' && (
                  <IconButton onClick={() => deleteNote(note.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                )}
              </CardContent>
            </Card>
          ));
      }
      return null;
    };

    return (
      <>
        {error && <Snackbar open autoHideDuration={6000} onClose={() => setError(undefined)}>
          <Alert onClose={() => setError(undefined)} severity="error">
            {t(error.message || '')}
          </Alert>
        </Snackbar>}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{t('labs.lab.status')}</Typography>
            <Chip label={labToView.status} color={getBadgeColor()} />
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{t('labs.lab.for')}</Typography>
            <Typography variant="body1">{patient.fullName}</Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{t('labs.lab.type')}</Typography>
            <Typography variant="body1">{labToView.type}</Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{t('labs.lab.requestedOn')}</Typography>
            <Typography variant="body1">{format(new Date(labToView.requestedOn), 'yyyy-MM-dd hh:mm a')}</Typography>
          </CardContent>
        </Card>
        {getCanceledOnOrCompletedOnDate()}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <TextField
              label={t('labs.lab.result')}
              value={labToView.result || ''}
              onChange={onResultChange}
              fullWidth
              margin="normal"
              disabled={!isEditable}
              error={!!error?.result}
              helperText={t(error?.result || '')}
            />
            <Typography variant="h6">{t('labs.lab.notes')}</Typography>
            {getPastNotes()}
            {isEditable && (
              <>
                <TextField
                  label={t('labs.lab.notes')}
                  value={newNoteText}
                  onChange={onNotesChange}
                  fullWidth
                  margin="normal"
                />
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                  {getButtons()}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </>
    );
  }
  return <Typography variant="h4">Loading...</Typography>;
};

export default ViewLab;