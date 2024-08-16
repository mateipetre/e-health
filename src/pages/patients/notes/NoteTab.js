import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import useTranslator from '../../../hooks/useTranslator';
import Permissions from '../../../app-components/Permissions';
import NewNoteModal from './NewNoteModal';
import NotesList from './NotesList';
import ViewNote from './ViewNote';

const NoteTab = ({ patient }) => {
  const { t } = useTranslator();
  const { permissions } = useSelector((state) => state.user);
  const [showNewNoteModal, setShowNoteModal] = useState(false);

  const breadcrumbs = [
    {
      i18nKey: 'patient.notes.label',
      location: `/patients/${patient.id}/notes`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs);

  const onNewNoteClick = () => {
    setShowNoteModal(true);
  };

  const closeNewNoteModal = () => {
    setShowNoteModal(false);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-end">
          {permissions.includes(Permissions.WritePatients) && (
            <Button
              variant="outlined"
              color="success"
              startIcon={<AddIcon />}
              onClick={onNewNoteClick}
            >
              {t('patient.notes.new')}
            </Button>
          )}
        </div>
      </div>
      <br />
      <Routes>
        <Route path="/patients/:id/notes" element={<NotesList patientId={patient.id} />} />
        <Route path="/patients/:id/notes/:noteId" element={<ViewNote />} />
      </Routes>

      <NewNoteModal
        show={showNewNoteModal}
        toggle={closeNewNoteModal}
        onCloseButtonClick={closeNewNoteModal}
        patientId={patient.id}
      />
    </div>
  );
};

export default NoteTab;