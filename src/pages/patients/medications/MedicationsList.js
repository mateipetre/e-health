import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import format from 'date-fns/format';

import Loading from '../../../app-components/Loading';
import useTranslator from '../../../hooks/useTranslator';
import usePatientMedications from '../hooks/usePatientMedications';

// MedicationsList component
const MedicationsList = (props) => {
  const { patient } = props;
  const navigate = useNavigate();
  const { t } = useTranslator();
  const { data, status } = usePatientMedications(patient.id);

  // Handling loading state
  if (status === 'loading') {
    return <Loading />;
  }

  // Handling empty data state
  if (data.length === 0) {
    return (
      <Alert severity="warning">
        <strong>{t('patient.medications.warning.noMedications')}</strong>
        <p>{t('patient.medications.noMedicationsMessage')}</p>
      </Alert>
    );
  }

  // Render data in Material-UI Table
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('medications.medication.medication')}</TableCell>
            <TableCell>{t('medications.medication.priority')}</TableCell>
            <TableCell>{t('medications.medication.intent')}</TableCell>
            <TableCell>{t('medications.medication.requestedOn')}</TableCell>
            <TableCell>{t('medications.medication.status')}</TableCell>
            <TableCell>{t('actions.label')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((medication) => (
            <TableRow key={medication.id}>
              <TableCell>{medication.medication}</TableCell>
              <TableCell>{medication.priority}</TableCell>
              <TableCell>{medication.intent}</TableCell>
              <TableCell>
                {medication.requestedOn ? format(new Date(medication.requestedOn), 'yyyy-MM-dd hh:mm a') : ''}
              </TableCell>
              <TableCell>{medication.status}</TableCell>
              <TableCell>
                <button onClick={() => navigate(`/medications/${medication.id}`)}>
                  {t('actions.view')}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MedicationsList;