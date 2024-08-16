import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import format from 'date-fns/format';

import Loading from '../../../app-components/Loading';
import useTranslator from '../../../hooks/useTranslator';
import usePatientLabs from '../hooks/usePatientLabs';

// LabsList component
const LabsList = (props) => {
  const { patient } = props;
  const navigate = useNavigate();
  const { t } = useTranslator();
  const { data = [], status } = usePatientLabs(patient.id);

  // Handle loading state
  if (status === 'loading') {
    return <Loading />;
  }

  // Handle empty data state
  if (data.length === 0) {
    return (
      <Alert severity="warning">
        <Typography variant="h6">{t('patient.labs.warning.noLabs')}</Typography>
        <Typography>{t('patient.labs.noLabsMessage')}</Typography>
      </Alert>
    );
  }

  // Render table with lab data
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('labs.lab.type')}</TableCell>
            <TableCell>{t('labs.lab.requestedOn')}</TableCell>
            <TableCell>{t('labs.lab.status')}</TableCell>
            <TableCell>{t('actions.label')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.type}</TableCell>
              <TableCell>{format(new Date(row.requestedOn), 'yyyy-MM-dd hh:mm a')}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/labs/${row.id}`)}
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

export default LabsList;
