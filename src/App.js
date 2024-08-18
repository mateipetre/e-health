/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, Navigate,useNavigate  } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import MainPage from './pages/mainpage/MainPage';
import Login from './pages/login/Login';
import CardiologyPage from './pages/mainpage/CardiologyPage';
import DermatologyPage from './pages/mainpage/DermatologyPage';
import GastroenterologyPage from './pages/mainpage/GastroenterologyPage';
import NeurologyPage from './pages/mainpage/NeurologyPage';
import OncologyPage from './pages/mainpage/OncologyPage';
import OrthopedicsPage from './pages/mainpage/OrthopedicsPage';
import { TitleProvider } from './pages/page-header/title/TitleContext';
import TermsOfService from './pages/mainpage/TermsOfService';
import AboutUs from './pages/mainpage/AboutUs';
import FAQPage from './pages/mainpage/FAQPage';
import PrivacyPolicy from './pages/mainpage/PrivacyPolicy';
import HealthInCampus from './pages/dashboard/DoctorDashboard';
import Dashboard from './pages/dashboard/PatientDashboard';
import Appointments from './pages/scheduling/appointments/Appointments';
import Patients from './pages/patients/Patients';
import Labs from './pages/labs/Labs';
import Medications from './pages/medications/Medications';
import Incidents from './pages/incidents/Incidents';
import Settings from './app-components/Settings';
import Imagings from './pages/imagings/Imagings';
import ViewImagings from './pages/imagings/search/ViewImagings';
import NewImagingRequest from './pages/imagings/requests/NewImagingRequest';
import ViewIncidents from './pages/incidents/list/ViewIncidents';
import ReportIncident from './pages/incidents/report/ReportIncident';
import VisualizeIncidents from './pages/incidents/visualize/VisualizeIncidents';
import ViewIncident from './pages/incidents/view/ViewIncident';
import ViewLabs from './pages/labs/ViewLabs';
import ViewLab from './pages/labs/ViewLab';
import NewLabRequest from './pages/labs/requests/NewLabRequest';
import ViewMedications from './pages/medications/search/ViewMedications';
import ViewMedication from './pages/medications/ViewMedication';
import NewMedicationRequest from './pages/medications/requests/NewMedicationRequest';
import ViewPatients from './pages/patients/search/ViewPatients';
import NewPatient from './pages/patients/new/NewPatient';
import ViewPatient from './pages/patients/view/ViewPatient';
import EditPatient from './pages/patients/edit/EditPatient';
import AllergiesList from './pages/patients/allergies/AllergiesList';
import ViewAllergy from './pages/patients/allergies/ViewAllergy';
import ViewCareGoals from './pages/patients/care-goals/ViewCareGoals';
import ViewCareGoal from './pages/patients/care-goals/ViewCareGoal';
import ViewCarePlans from './pages/patients/care-plans/ViewCarePlans';
import ViewCarePlan from './pages/patients/care-plans/ViewCarePlan';
import ViewDiagnoses from './pages/patients/diagnoses/ViewDiagnoses';
import ViewDiagnosis from './pages/patients/diagnoses/ViewDiagnosis';
import LabsList from './pages/patients/labs/LabsList';
import NotesList from './pages/patients/notes/NotesList';
import ViewNote from './pages/patients/notes/ViewNote';
import GeneralInformation from './pages/patients/GeneralInformation';
import RelatedPersonTab from './pages/patients/related-persons/RelatedPersonTab';
import PatientMedications from './pages/patients/medications/Medications';
import VisitForm from './pages/patients/visits/VisitTab';
import ViewVisit from './pages/patients/visits/ViewVisit';
import AppointmentsList from './pages/patients/appointments/AppointmentsList';
import ViewAppointments from './pages/scheduling/appointments/ViewAppointments';
import NewAppointment from './pages/scheduling/appointments/new/NewAppointment';
import EditAppointment from './pages/scheduling/appointments/edit/EditAppointment';
import ViewAppointment from './pages/scheduling/appointments/view/ViewAppointment';
import UserProfile from './pages/dashboard/PatientProfile';
import DoctorProfile from './pages/dashboard/DoctorProfile';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    axios.defaults.withCredentials = true;

    axios.get('http://localhost:8080/auth/check')
      .then((response) => {
        if (!cancelled) {
          setAuthenticated(response.data.authenticated);
          if (response.data.authenticated) {
            setUser(response.data.user);
          }
        }
      })
      .catch((e) => {
        console.log('Error fetching authentication status:', e);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" size={60} />
      </div>
    );
  }

  return (
    <Suspense fallback={<CircularProgress color="primary" size={60} />}>
      <TitleProvider>
        <Routes>
          {/* MainPage route */}
          <Route path="/" element={<MainPage />} />
          
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard route, accessible only when authenticated */}
          <Route path="/patient-dashboard" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/doctor-dashboard" element={authenticated ? <DoctorDashboard /> : <Navigate to="/login" />} />
          <Route path="/patient-profile" element={<UserProfile />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          
          {/* Catch-all route to redirect to MainPage */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/cardiology" element={<CardiologyPage />} />
          <Route path="/neurology" element={<NeurologyPage />} />
          <Route path="/dermatology" element={<DermatologyPage />} />
          <Route path="/gastroenterology" element={<GastroenterologyPage />} />
          <Route path="/oncology" element={<OncologyPage />} />
          <Route path="/orthopedics" element={<OrthopedicsPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/imaging" element={<Imagings />} />
          <Route path="/imaging/view" element={<ViewImagings />} />
          <Route path="/imaging/new" element={<NewImagingRequest />} />
          <Route path="/incidents/view" element={<ViewIncidents />} />
          <Route path="/incidents/visualize" element={<VisualizeIncidents />} />
          <Route path="/incidents/new" element={<ReportIncident />} />
          <Route path="/incidents/:id" element={<ViewIncident />} />
          <Route path="/labs/view" element={<ViewLabs />} />
          <Route path="/labs/:id" element={<ViewLab />} />
          <Route path="/labs/new" element={<NewLabRequest />} />
          <Route path="/medications/view" element={<ViewMedications />} />
          <Route path="/medications/:id" element={<ViewMedication />} />
          <Route path="/medications/new" element={<NewMedicationRequest />} />
          <Route path="/patients/view" element={<ViewPatients />} />
          <Route path="/patients/new" element={<NewPatient />} />
          <Route path="/patients/:id" element={<ViewPatient />} />
          <Route path="/patients/edit/:id" element={<EditPatient />} />
          <Route path="/patients/:id/allergies/view" element={<AllergiesList />} />
          <Route path="/patients/:id/allergies/:allergyId" element={<ViewAllergy />} />
          <Route path="/patients/:id/care-goals/view" element={<ViewCareGoals />} />
          <Route path="/patients/:id/care-goals/:careGoalId" element={<ViewCareGoal />} />
          <Route path="/patients/:id/care-plans/view" element={<ViewCarePlans />} />
          <Route path="/patients/:id/care-plans/:carePlanId" element={<ViewCarePlan />} />
          <Route path="/patients/:id/diagnoses/view" element={<ViewDiagnoses />} />
          <Route path="/patients/:id/diagnoses/:diagnosisId" element={<ViewDiagnosis />} />
          <Route path="/patients/:id/labs/view" element={<LabsList />} />
          <Route path="/patients/:id/notes/view" element={<NotesList />} />
          <Route path="/patients/:id/notes/:noteId" element={<ViewNote />} />
          <Route path="/patients/:id/info" element={<GeneralInformation />} />
          <Route path="/patients/:id/relatedpersons" element={<RelatedPersonTab />} />
          <Route path="/patients/:id/medications" element={<PatientMedications />} />
          <Route path="/patients/:id/visits" element={<VisitForm />} />
          <Route path="/patients/:id/visits/visitId" element={<ViewVisit />} />
          <Route path="/patients/:id/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/view" element={<ViewAppointments />} />
          <Route path="/appointments/new" element={<NewAppointment />} />
          <Route path="/appointments/edit/:id" element={<EditAppointment />} />
          <Route path="/appointments/:id" element={<ViewAppointment />} />
        </Routes>
      </TitleProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
};

export default App;