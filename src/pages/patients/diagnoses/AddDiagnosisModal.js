import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useTranslator from '../../../hooks/useTranslator';
import { DiagnosisStatus } from '../../model/Diagnosis';
import useAddPatientDiagnosis from '../hooks/useAddPatientDiagnosis';
import DiagnosisForm from './DiagnosisForm';

const initialDiagnosisState = {
  name: '',
  diagnosisDate: new Date().toISOString(),
  onsetDate: new Date().toISOString(),
  abatementDate: new Date().toISOString(),
  note: '',
  visit: '',
  status: DiagnosisStatus.Active,
};

const AddDiagnosisModal = (props) => {
  const { show, onCloseButtonClick, patient } = props;
  const { t } = useTranslator();
  const { mutate } = useAddPatientDiagnosis();

  const [diagnosis, setDiagnosis] = useState(initialDiagnosisState);
  const [diagnosisError, setDiagnosisError] = useState();

  useEffect(() => {
    setDiagnosis(initialDiagnosisState);
  }, [show]);

  const onDiagnosisChange = (newDiagnosis) => {
    setDiagnosis(newDiagnosis);
  };

  const onSaveButtonClick = async () => {
    try {
      await mutate({ diagnosis, patientId: patient.id });
      onCloseButtonClick();
    } catch (e) {
      setDiagnosisError(e);
    }
  };

  return (
    <Dialog
      open={show}
      onClose={onCloseButtonClick}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t('patient.diagnoses.new')}</DialogTitle>
      <DialogContent>
        <DiagnosisForm
          diagnosis={diagnosis}
          diagnosisError={diagnosisError}
          onChange={onDiagnosisChange}
          patient={patient}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={onCloseButtonClick}
        >
          {t('actions.cancel')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSaveButtonClick}
          startIcon={<AddIcon />} // AddIcon imported here
        >
          {t('patient.diagnoses.new')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDiagnosisModal;