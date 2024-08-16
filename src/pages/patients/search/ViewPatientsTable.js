import React from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import useTranslator from '../../../hooks/useTranslator';
import { formatDate } from '../../../util/formatDate';
import usePatients from '../hooks/usePatients';
import NoPatientsExist from './NoPatientsExist';

const ViewPatientsTable = (props) => {
  const { searchRequest } = props;
  const { t } = useTranslator();
  const navigate = useNavigate();
  const { data, status } = usePatients(searchRequest);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (!data || data.totalCount === 0) {
    return <NoPatientsExist />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('patient.code')}</TableCell>
            <TableCell>{t('patient.givenName')}</TableCell>
            <TableCell>{t('patient.familyName')}</TableCell>
            <TableCell>{t('patient.sex')}</TableCell>
            <TableCell>{t('patient.dateOfBirth')}</TableCell>
            <TableCell>{t('actions.label')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.code}</TableCell>
              <TableCell>{patient.givenName}</TableCell>
              <TableCell>{patient.familyName}</TableCell>
              <TableCell>{patient.sex}</TableCell>
              <TableCell>{formatDate(patient.dateOfBirth)}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/patients/${patient.id}`)}
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

export default ViewPatientsTable;