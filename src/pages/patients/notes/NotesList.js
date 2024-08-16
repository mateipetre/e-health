import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, List, ListItem, ListItemText } from '@mui/material';

import Loading from '../../../app-components/Loading';
import useTranslator from '../../../hooks/useTranslator';
import usePatientNotes from '../hooks/usePatientNotes';

const NotesList = ({ patientId }) => {
  const navigate = useNavigate();
  const { t } = useTranslator();
  const { data, status } = usePatientNotes(patientId);

  if (status === 'loading') {
    return <Loading />;
  }

  if (data === undefined || data.length === 0) {
    return (
      <Alert severity="warning">
        <strong>{t('patient.notes.warning.noNotes')}</strong><br />
        {t('patient.notes.addNoteAbove')}
      </Alert>
    );
  }

  return (
    <List>
      {data.map((note) => (
        <ListItem
          button
          key={note.id}
          onClick={() => navigate(`/patients/${patientId}/notes/${note.id}`)}
        >
          <ListItemText
            primary={<span className="ref__note-item-date">{new Date(note.date).toLocaleString()}</span>}
            secondary={<p className="ref__note-item-text">{note.text}</p>}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default NotesList;
