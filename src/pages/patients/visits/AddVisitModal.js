import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import addMonths from 'date-fns/addMonths';

import useTranslator from '../../../hooks/useTranslator';
import useAddVisit from '../hooks/useAddVisit';
import VisitForm from './VisitForm';

const initialVisitState = {
  startDateTime: new Date().toISOString(),
  endDateTime: addMonths(new Date(), 1).toISOString(),
  updatedAt: '',
  type: '',
  status: '',
  reason: '',
  location: '',
  rev: '',
};

const AddVisitModal = ({ show, onCloseButtonClick, patientId }) => {
  const { t } = useTranslator();
  const { mutate } = useAddVisit();
  const [visit, setVisit] = useState(initialVisitState);
  const [error, setError] = useState(null);

  useEffect(() => {
    setVisit(initialVisitState);
  }, [show]);

  const onVisitChange = (newVisit) => {
    setVisit(prevVisit => ({ ...prevVisit, ...newVisit }));
  };

  const onClose = () => {
    onCloseButtonClick();
  };

  const onSaveButtonClick = async () => {
    try {
      await mutate({ patientId, visit });
      onClose();
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('patient.visits.new')}</DialogTitle>
      <DialogContent>
        <VisitForm visit={visit} visitError={error} onChange={onVisitChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          {t('actions.cancel')}
        </Button>
        <Button
          onClick={onSaveButtonClick}
          color="success"
          startIcon={<AddIcon />}
        >
          {t('patient.visits.new')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVisitModal;