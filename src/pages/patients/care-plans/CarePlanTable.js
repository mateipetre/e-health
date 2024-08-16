import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import format from 'date-fns/format';
import useTranslator from '../../../hooks/useTranslator';
import usePatientCarePlans from '../hooks/usePatientCarePlans';

const CarePlanTable = (props) => {
  const { patientId } = props;
  const navigate = useNavigate();
  const { t } = useTranslator();
  const { data, status } = usePatientCarePlans(patientId);

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{t('patient.error.loading')}</Alert>
      </div>
    );
  }

  if (status === 'success' && data) {
    const carePlans = data;

    if (carePlans.length === 0) {
      return (
        <Alert severity="warning">
          <AlertTitle>{t('patient.carePlans.warning.noCarePlans')}</AlertTitle>
          {t('patient.carePlans.warning.addCarePlanAbove')}
        </Alert>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('patient.carePlan.title')}</TableCell>
              <TableCell>{t('patient.carePlan.startDate')}</TableCell>
              <TableCell>{t('patient.carePlan.endDate')}</TableCell>
              <TableCell>{t('patient.carePlan.status')}</TableCell>
              <TableCell>{t('actions.label')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carePlans.map((carePlan) => (
              <TableRow key={carePlan.id}>
                <TableCell>{carePlan.title}</TableCell>
                <TableCell>{format(new Date(carePlan.startDate), 'yyyy-MM-dd')}</TableCell>
                <TableCell>{format(new Date(carePlan.endDate), 'yyyy-MM-dd')}</TableCell>
                <TableCell>{carePlan.status}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => navigate(`/patients/${patientId}/care-plans/${carePlan.id}`)}
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
  }

  return null;
};

export default CarePlanTable;