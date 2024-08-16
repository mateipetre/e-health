import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Alert, Typography } from '@mui/material';
import format from 'date-fns/format';

import Loading from '../../../app-components/Loading';
import useTranslator from '../../../hooks/useTranslator';
import usePatientCareGoals from '../hooks/usePatientCareGoals';

const CareGoalTable = ({ patientId }) => {
  const navigate = useNavigate();
  const { t } = useTranslator();
  const { data, status } = usePatientCareGoals(patientId) || { data: [], status: 'loading' };

  if (status === 'loading' || data === undefined) {
    return <Loading />;
  }

  if (data.length === 0) {
    return (
      <Alert severity="warning">
        <Typography variant="h6">{t('patient.careGoals.warning.noCareGoals')}</Typography>
        <Typography>{t('patient.careGoals.warning.addCareGoalAbove')}</Typography>
      </Alert>
    );
  }

  const columns = [
    { label: t('patient.careGoal.description'), key: 'description' },
    {
      label: t('patient.careGoal.startDate'),
      key: 'startDate',
      format: (date) => format(new Date(date), 'yyyy-MM-dd'),
    },
    {
      label: t('patient.careGoal.dueDate'),
      key: 'dueDate',
      format: (date) => format(new Date(date), 'yyyy-MM-dd'),
    },
    {
      label: t('patient.careGoal.status'),
      key: 'status',
    },
  ];

  const handleRowClick = (row) => {
    navigate(`/patients/${patientId}/care-goals/${row.id}`);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.key}>{col.label}</TableCell>
          ))}
          <TableCell>{t('actions.label')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id} onClick={() => handleRowClick(row)}>
            {columns.map((col) => (
              <TableCell key={col.key}>
                {col.format ? col.format(row[col.key]) : row[col.key]}
              </TableCell>
            ))}
            <TableCell>
              <Button onClick={() => handleRowClick(row)}>{t('actions.view')}</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CareGoalTable;