import React from 'react';
import { useNavigate } from 'react-router';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@material-ui/core';
import format from 'date-fns/format';

import useTranslator from '../../../hooks/useTranslator';
import useMedicationRequestSearch from '../hooks/useMedicationSearch';

const MedicationRequestTable = (props) => {
  const { searchRequest } = props;
  const { t } = useTranslator();
  const navigate = useNavigate();
  const { data, status } = useMedicationRequestSearch(searchRequest) || { data: [], status: 'loading' };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  const onViewClick = (medication) => {
    navigate(`/medications/${medication.id}`);
  };

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
              <TableCell>{medication.requestedOn ? format(new Date(medication.requestedOn), 'yyyy-MM-dd hh:mm a') : ''}</TableCell>
              <TableCell>{medication.status}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onViewClick(medication)}>
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

export default MedicationRequestTable;