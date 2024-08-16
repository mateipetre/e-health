import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import addMonths from 'date-fns/addMonths';
import AddIcon from '@mui/icons-material/Add';

import useTranslator from '../../../hooks/useTranslator';
import { CareGoalStatus, CareGoalAchievementStatus } from '../../model/CareGoal';
import useAddCareGoal from '../hooks/useAddCareGoal';
import CareGoalForm from './CareGoalForm';

const initialCareGoalState = {
  description: '',
  startDate: new Date().toISOString(),
  dueDate: addMonths(new Date(), 1).toISOString(),
  note: '',
  priority: 'medium',
  status: CareGoalStatus.Accepted,
  achievementStatus: CareGoalAchievementStatus.InProgress,
};

const AddCareGoalModal = ({ patient, show, onCloseButtonClick }) => {
  const { t } = useTranslator();
  const { mutate } = useAddCareGoal();
  const [careGoal, setCareGoal] = useState(initialCareGoalState);
  const [careGoalError, setCareGoalError] = useState(undefined);

  useEffect(() => {
    if (show) {
      setCareGoal(initialCareGoalState);
    }
  }, [show]);

  const onClose = () => {
    onCloseButtonClick();
  };

  const onCareGoalChange = (newCareGoal) => {
    setCareGoal({ ...careGoal, ...newCareGoal });
  };

  const onSaveButtonClick = async () => {
    try {
      await mutate({ patientId: patient.id, careGoal });
      onClose();
    } catch (e) {
      setCareGoalError(e);
    }
  };

  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('patient.careGoal.new')}</DialogTitle>
      <DialogContent>
        <CareGoalForm careGoal={careGoal} careGoalError={careGoalError} onChange={onCareGoalChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          {t('actions.cancel')}
        </Button>
        <Button onClick={onSaveButtonClick} color="success" variant="contained" startIcon={<AddIcon />}>
          {t('patient.careGoal.new')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCareGoalModal;