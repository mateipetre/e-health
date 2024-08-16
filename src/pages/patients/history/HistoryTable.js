import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Alert } from '@mui/material';
import format from 'date-fns/format';
import useTranslator from '../../../hooks/useTranslator';
import { HistoryRecordType } from '../../model/PatientHistoryRecord';
import usePatientAppointments from '../hooks/usePatientAppointments';
import usePatientLabs from '../hooks/usePatientLabs';
import { mapHistoryRecords } from './mappers/HistoryRecordsMapper';

const getRecordPath = (historyRecord) => {
  if (historyRecord.type === HistoryRecordType.LAB) {
    return `/labs/${historyRecord.recordId}`;
  }
  return `/appointments/${historyRecord.recordId}`;
};

const HistoryTable = ({ patientId }) => {
  const { t } = useTranslator();
  const navigate = useNavigate();

  const { data: labs } = usePatientLabs(patientId) || { data: [] };
  const { data: appointments } = usePatientAppointments(patientId) || { data: [] };

  const mappedHistoryRecords = mapHistoryRecords(labs, appointments);

  if (mappedHistoryRecords.length === 0) {
    return (
      <Alert severity="warning">
        <Typography variant="h6">{t('patient.history.noHistoryTitle')}</Typography>
        <Typography>{t('patient.history.noHistoryMessage')}</Typography>
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('patient.history.eventDate')}</TableCell>
            <TableCell>{t('patient.history.recordType')}</TableCell>
            <TableCell>{t('patient.history.information')}</TableCell>
            <TableCell>{t('actions.label')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedHistoryRecords.map((record) => (
            <TableRow key={record.id} hover onClick={() => navigate(getRecordPath(record))}>
              <TableCell>{format(new Date(record.date), 'yyyy-MM-dd hh:mm a')}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.info}</TableCell>
              <TableCell>
                <Typography variant="body2" color="primary">{t('actions.view')}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;