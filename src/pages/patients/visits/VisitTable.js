import React from 'react';
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';
import { Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

import Loading from '../../../app-components/Loading';
import useTranslator from '../../../hooks/useTranslator';
import usePatientVisits from '../hooks/usePatientVisits';

const VisitTable = ({ patientId }) => {
  const navigate = useNavigate();
  const { t } = useTranslator();

  const { data: patientVisits, status } = usePatientVisits(patientId) || { data: [], status: 'loading' };

  if (status === 'loading') {
    return <Loading />;
  }

  if (patientVisits.length === 0) {
    return (
      <Alert severity="warning">
        <strong>{t('patient.visits.warning.noVisits')}</strong>
        <div>{t('patient.visits.warning.addVisitAbove')}</div>
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('patient.visits.startDateTime')}</TableCell>
            <TableCell>{t('patient.visits.endDateTime')}</TableCell>
            <TableCell>{t('patient.visits.type')}</TableCell>
            <TableCell>{t('patient.visits.status')}</TableCell>
            <TableCell>{t('patient.visits.reason')}</TableCell>
            <TableCell>{t('patient.visits.location')}</TableCell>
            <TableCell>{t('actions.label')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientVisits.map((visit) => (
            <TableRow key={visit.id}>
              <TableCell>{format(new Date(visit.startDateTime), 'yyyy-MM-dd hh:mm a')}</TableCell>
              <TableCell>{format(new Date(visit.endDateTime), 'yyyy-MM-dd hh:mm a')}</TableCell>
              <TableCell>{visit.type}</TableCell>
              <TableCell>{visit.status}</TableCell>
              <TableCell>{visit.reason}</TableCell>
              <TableCell>{visit.location}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/patients/${patientId}/visits/${visit.id}`)}
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

export default VisitTable;