import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import Loading from '../../../app-components/Loading';
import useTranslator from '../../../hooks/useTranslator';
import usePatientsAppointments from '../hooks/usePatientAppointments';

const AppointmentsList = ({ patient }) => {
  const navigate = useNavigate();
  const { t } = useTranslator();
  const patientId = patient.id;

  const { data, status } = usePatientsAppointments(patientId);

  const breadcrumbs = [
    {
      i18nKey: 'scheduling.appointments.label',
      location: `/patients/${patientId}/appointments`,
    },
  ];

  useAddBreadcrumbs(breadcrumbs);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return (
      <Alert severity="error">
        {t('states.error')}
        <br />
        {t('patient.appointments.error.unableToLoad')}
      </Alert>
    );
  }

  const appointmentsData = Array.isArray(data) ? data : [];

  return (
    <>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-end">
          <Button
            variant="outlined"
            color="success"
            onClick={() => navigate(`/appointments/new`, { state: { patient } })}
          >
            {t('scheduling.appointments.new')}
          </Button>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-12">
          {appointmentsData.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('scheduling.appointment.startDate')}</TableCell>
                    <TableCell>{t('scheduling.appointment.endDate')}</TableCell>
                    <TableCell>{t('scheduling.appointment.location')}</TableCell>
                    <TableCell>{t('scheduling.appointment.type')}</TableCell>
                    <TableCell>{t('actions.label')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointmentsData.map((row) => (
                    <TableRow key={row.id} onClick={() => navigate(`/appointments/${row.id}`)} style={{ cursor: 'pointer' }}>
                      <TableCell>
                        {row.startDateTime ? format(new Date(row.startDateTime), 'yyyy-MM-dd, hh:mm a') : ''}
                      </TableCell>
                      <TableCell>
                        {row.endDateTime ? format(new Date(row.endDateTime), 'yyyy-MM-dd, hh:mm a') : ''}
                      </TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/appointments/${row.id}`);
                          }}
                        >
                          {t('actions.view')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="warning">
              {t('patient.appointments.warning.noAppointments')}
              <br />
              {t('patient.appointments.addAppointmentAbove')}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentsList;