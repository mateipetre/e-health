import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import addMonths from 'date-fns/addMonths';

import useTranslator from '../../../hooks/useTranslator';
import { CarePlanIntent, CarePlanStatus } from '../../model/CarePlan';
import useAddCarePlan from '../hooks/useAddCarePlan';
import CarePlanForm from './CarePlanForm';

const initialCarePlanState = {
  title: '',
  description: '',
  startDate: new Date().toISOString(),
  endDate: addMonths(new Date(), 1).toISOString(),
  note: '',
  diagnosisId: '',
  status: CarePlanStatus.Active,
  intent: CarePlanIntent.Plan,
};

const AddCarePlanModal = ({ show, onCloseButtonClick, patient }) => {
  const { t } = useTranslator();
  const { mutate } = useAddCarePlan();
  const [carePlan, setCarePlan] = useState(initialCarePlanState);
  const [carePlanError, setCarePlanError] = useState(undefined);

  useEffect(() => {
    setCarePlan(initialCarePlanState);
  }, [show]);

  const onCarePlanChange = (newCarePlan) => {
    setCarePlan(newCarePlan);
  };

  const onClose = () => {
    onCloseButtonClick();
  };

  const onSaveButtonClick = async () => {
    try {
      mutate({ patientId: patient.id, carePlan });
      onClose();
    } catch (e) {
      setCarePlanError(e); // No need for explicit cast to CarePlanError
    }
  };

  const body = (
    <CarePlanForm
      patient={patient}
      carePlan={carePlan}
      carePlanError={carePlanError}
      onChange={onCarePlanChange}
    />
  );

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>{t('patient.carePlan.new')}</DialogTitle>
      <DialogContent>{body}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {t('actions.cancel')}
        </Button>
        <Button onClick={onSaveButtonClick} color="primary">
          {t('patient.carePlan.new')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCarePlanModal;
