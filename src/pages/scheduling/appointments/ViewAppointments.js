import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Loading from '../../../app-components/Loading';

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import { useButtonToolbarSetter } from '../../page-header/button-toolbar/ButtonBarProvider';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import axios from 'axios';
import useTranslator from '../../../hooks/useTranslator';
import useAppointments from '../hooks/useAppointments';

const breadcrumbs = [{ i18nKey: 'scheduling.appointments.label', location: '/appointments' }];

const ViewAppointments = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const updateTitle = useUpdateTitle();
  
  useEffect(() => {
    updateTitle(t('scheduling.appointments.label'));
  }, [updateTitle, t]);

  const { data: appointments, isLoading } = useAppointments();
  const [events, setEvents] = useState([]);
  const setButtonToolBar = useButtonToolbarSetter();
  
  useAddBreadcrumbs(breadcrumbs, true);

  useEffect(() => {
    setButtonToolBar([
      <Button
        key="newAppointmentButton"
        variant="outlined"
        color="success"
        startIcon={<i className="material-icons">add</i>}
        onClick={() => navigate('/appointments/new')}
      >
        {t('scheduling.appointments.new')}
      </Button>,
    ]);

    return () => {
      setButtonToolBar([]);
    };
  }, [setButtonToolBar, navigate, t]);

  useEffect(() => {
    if (appointments && !isLoading) {
      const fetchPatients = async () => {
        const eventsArray = await Promise.all(appointments.map(async (appointment) => {
          try {
            const response = await axios.get(`/api/patients/${appointment.patient}`);
            const patient = response.data;

            return {
              id: appointment.id,
              date: new Date(appointment.startDateTime),
              title: patient && patient.fullName ? patient.fullName : '',
            };
          } catch (error) {
            console.error('Error fetching patient:', error);
            return {
              id: appointment.id,
              date: new Date(appointment.startDateTime),
              title: '',
            };
          }
        }));
        setEvents(eventsArray);
      };

      fetchPatients();
    }

    return () => {
      setEvents([]);
    };
  }, [appointments, isLoading]);

  if (isLoading || appointments === undefined) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading />
      </Box>
    );
  }

  return (
    <div>
      <Calendar
        onClickDay={(date) => {
          const event = events.find(e => e.date.toDateString() === date.toDateString());
          if (event) {
            navigate(`/appointments/${event.id}`);
          }
        }}
      />
    </div>
  );
};

export default ViewAppointments;