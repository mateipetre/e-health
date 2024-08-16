import React from 'react';
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';
import { Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

import Loading from '../../../app-components/Loading';
import useTranslator from '../../../hooks/useTranslator';
import usePatientDiagnoses from '../hooks/usePatientDiagnoses';

const DiagnosisTable = ({ patientId }) => {
  const navigate = useNavigate();
  const { t } = useTranslator();
  const { data, status } = usePatientDiagnoses(patientId);

  if (status === 'loading') {
    return <Loading />;
  }

  if (data === undefined || data.length === 0) {
    return (
      <Alert severity="warning">
        <strong>{t('patient.diagnoses.warning.noDiagnoses')}</strong>
        <div>{t('patient.diagnoses.addDiagnosisAbove')}</div>
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('patient.diagnoses.diagnosisName')}</TableCell>
            <TableCell>{t('patient.diagnoses.diagnosisDate')}</TableCell>
            <TableCell>{t('patient.diagnoses.onsetDate')}</TableCell>
            <TableCell>{t('patient.diagnoses.abatementDate')}</TableCell>
            <TableCell>{t('patient.diagnoses.status')}</TableCell>
            <TableCell>{t('actions.label')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((diagnosis) => (
            <TableRow key={diagnosis.id}>
              <TableCell>{diagnosis.name}</TableCell>
              <TableCell>
                {format(diagnosis.diagnosisDate ? new Date(diagnosis.diagnosisDate) : new Date(0), 'yyyy-MM-dd')}
              </TableCell>
              <TableCell>
                {format(diagnosis.onsetDate ? new Date(diagnosis.onsetDate) : new Date(0), 'yyyy-MM-dd')}
              </TableCell>
              <TableCell>
                {format(diagnosis.abatementDate ? new Date(diagnosis.abatementDate) : new Date(0), 'yyyy-MM-dd')}
              </TableCell>
              <TableCell>{diagnosis.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/patients/${patientId}/diagnoses/${diagnosis.id}`)}
                >
                  {t('actions.view')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DiagnosisTable;