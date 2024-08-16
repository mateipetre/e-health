import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Button, CircularProgress, Paper, Tabs, Tab, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import { useButtonToolbarSetter } from '../../page-header/button-toolbar/ButtonBarProvider';
import { useUpdateTitle } from '../../page-header/title/TitleContext';
import useTranslator from '../../../hooks/useTranslator';
import Permissions from '../../../app-components/Permissions';
import Allergies from '../allergies/Allergies';
import AppointmentsList from '../appointments/AppointmentsList';
import CareGoalTab from '../care-goals/CareGoalTab';
import CarePlanTab from '../care-plans/CarePlanTab';
import Diagnoses from '../diagnoses/Diagnoses';
import GeneralInformation from '../GeneralInformation';
import HistoryTab from '../history/HistoryTab';
import usePatient from '../hooks/usePatient';
import Labs from '../labs/Labs';
import Medications from '../medications/Medications';
import Note from '../notes/NoteTab';
import RelatedPerson from '../related-persons/RelatedPersonTab';
import { getPatientFullName } from '../util/patient-util';
import VisitTab from '../visits/VisitTab';
import ImportantPatientInfo from './ImportantPatientInfo';

const ViewPatient = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const setButtonToolBar = useButtonToolbarSetter();

  const { permissions } = useSelector((state) => state.user);
  const { data: patient, status } = usePatient(id);

  const updateTitle = useUpdateTitle();
  useEffect(() => {
    updateTitle(t('patient.label'));
  }, [updateTitle, t]);

  const breadcrumbs = [
    { i18nKey: 'patients.label', location: '/patients' },
    { text: getPatientFullName(patient), location: `/patients/${id}` },
  ];
  useAddBreadcrumbs(breadcrumbs, true);

  useEffect(() => {
    const buttons = [];
    if (permissions.includes(Permissions.WritePatients)) {
      buttons.push(
        <Button
          key="editPatientButton"
          variant="outlined"
          color="success"
          startIcon={<EditIcon />} // Use the imported Edit icon
          onClick={() => navigate(`/patients/edit/${id}`)}
        >
          {t('actions.edit')}
        </Button>
      );
    }

    setButtonToolBar(buttons);

    return () => {
      setButtonToolBar([]);
    };
  }, [setButtonToolBar, navigate, id, permissions, t]);

  if (status === 'loading' || !patient) {
    return <CircularProgress color="primary" size={40} />;
  }

  return (
    <div>
      <ImportantPatientInfo patient={patient} />
      <Box marginTop={2}>
        <Tabs
          value={location.pathname}
          onChange={(event, newValue) => navigate(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={t('patient.generalInformation')} value={`/patients/${patient.id}`} />
          <Tab label={t('patient.relatedPersons.label')} value={`/patients/${patient.id}/relatedpersons`} />
          <Tab label={t('scheduling.appointments.label')} value={`/patients/${patient.id}/appointments`} />
          <Tab label={t('patient.allergies.label')} value={`/patients/${patient.id}/allergies`} />
          <Tab label={t('patient.diagnoses.label')} value={`/patients/${patient.id}/diagnoses`} />
          <Tab label={t('patient.notes.label')} value={`/patients/${patient.id}/notes`} />
          <Tab label={t('patient.medications.label')} value={`/patients/${patient.id}/medications`} />
          <Tab label={t('patient.labs.label')} value={`/patients/${patient.id}/labs`} />
          <Tab label={t('patient.carePlan.label')} value={`/patients/${patient.id}/care-plans`} />
          <Tab label={t('patient.careGoal.label')} value={`/patients/${patient.id}/care-goals`} />
          <Tab label={t('patient.visits.label')} value={`/patients/${patient.id}/visits`} />
          <Tab label={t('patient.history.label')} value={`/patients/${patient.id}/history`} />
        </Tabs>
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
          <Routes>
            <Route path="/" element={<GeneralInformation patient={patient} />} />
            <Route path="/relatedpersons" element={<RelatedPerson patient={patient} />} />
            <Route path="/appointments" element={<AppointmentsList patient={patient} />} />
            <Route path="/allergies" element={<Allergies patient={patient} />} />
            <Route path="/diagnoses" element={<Diagnoses />} />
            <Route path="/notes" element={<Note patient={patient} />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/labs" element={<Labs patient={patient} />} />
            <Route path="/care-plans" element={<CarePlanTab />} />
            <Route path="/care-goals" element={<CareGoalTab />} />
            <Route path="/visits" element={<VisitTab patientId={patient.id} />} />
            <Route path="/history" element={<HistoryTab patientId={patient.id} />} />
          </Routes>
        </Paper>
      </Box>
    </div>
  );
};

export default ViewPatient;