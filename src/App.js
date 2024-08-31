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
import Dashboard from './pages/dashboard/PatientDashboard';
import DoctorAppointments from './pages/scheduling/appointments/Appointments';
import DoctorViewAppointments from './pages/scheduling/appointments/ViewAppointments';
import DoctorNewAppointment from './pages/scheduling/appointments/new/NewAppointment'
import DoctorEditAppointment from './pages/scheduling/appointments/edit/EditAppointments'
import DoctorDeleteAppointment from './pages/scheduling/appointments/delete/DeleteAppointment'
import PatientAppointments from './pages/scheduling/patient-appointments/Appointments';
import Patients from './pages/patients/Patients';
import Labs from './pages/labs/Labs';
import Medications from './pages/medications/Medications';
import Incidents from './pages/incidents/Incidents';
import Settings from './app-components/Settings';
import Imagings from './pages/imagings/Imagings';
// import ViewImagings from './pages/imagings/search/ViewImagings';
import NewImagingRequest from './pages/imagings/requests/NewImagingRequest';
// import ViewIncidents from './pages/incidents/list/ViewIncidents';
import ReportIncident from './pages/incidents/report/ReportIncident';
import VisualizeIncidents from './pages/incidents/visualize/VisualizeIncidents';
import ViewIncident from './pages/incidents/view/ViewIncident';
// import ViewLabs from './pages/labs/ViewLabs';
// import ViewLab from './pages/labs/ViewLab';
import NewLabRequest from './pages/labs/requests/NewLabRequest';
// import ViewMedications from './pages/medications/search/ViewMedications';
// import ViewMedication from './pages/medications/ViewMedications';
import NewMedicationRequest from './pages/medications/requests/NewMedicationRequest';
// import ViewPatients from './pages/patients/search/ViewPatients';
import NewPatient from './pages/patients/new/NewPatient';
import ViewPatient from './pages/patients/view/ViewPatient';
import EditPatient from './pages/patients/edit/EditPatient';
import AllergiesList from './pages/patients/allergies/AllergiesList';
import ViewAllergy from './pages/patients/allergies/ViewAllergy';
// import ViewCareGoals from './pages/patients/care-goals/ViewCareGoals';
// import ViewCareGoal from './pages/patients/care-goals/ViewCareGoal';
// import ViewCarePlans from './pages/patients/care-plans/ViewCarePlans';
// import ViewCarePlan from './pages/patients/care-plans/ViewCarePlan';
// import ViewDiagnoses from './pages/patients/diagnoses/ViewDiagnoses';
import ViewDiagnosis from './pages/patients/diagnoses/ViewDiagnosis';
import LabsList from './pages/patients/labs/LabsList';
import NotesList from './pages/patients/notes/NotesList';
import ViewNote from './pages/patients/notes/ViewNote';
import GeneralInformation from './pages/patients/GeneralInformation';
import RelatedPersonTab from './pages/patients/related-persons/RelatedPersonTab';
// import PatientMedications from './pages/patients/medications/Medications';
import VisitForm from './pages/patients/visits/VisitTab';
import ViewVisit from './pages/patients/visits/ViewVisit';
import AppointmentsList from './pages/patients/appointments/AppointmentsList';
import ViewAppointments from './pages/scheduling/patient-appointments/ViewAppointments';
import NewAppointment from './pages/scheduling/patient-appointments/new/NewAppointment';
import UserProfile from './pages/dashboard/PatientProfile';
import DoctorProfile from './pages/dashboard/DoctorProfile';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import Allergies from './pages/allergies/Allergies'
import CareGoals from './pages/care-goals/CareGoals'
import CarePlans from './pages/care-plans/CarePlans'
import Diagnoses from './pages/diagnoses/Diagnoses'
import Notes from './pages/notes/Notes'
import RelatedPersons from './pages/related-persons/RelatedPersons'
import EditAppointments from './pages/scheduling/patient-appointments/edit/EditAppointments';
import DeleteAppointment from './pages/scheduling/patient-appointments/delete/DeleteAppointment';
import ViewAllergies from './pages/allergies/ViewAllergies'
import DeleteAllergy from './pages/allergies/delete/DeleteAllergy'
import EditAllergies from './pages/allergies/edit/EditAllergies'
import NewAllergy from './pages/allergies/new/NewAllergy'
import ViewDiagnoses from './pages/diagnoses/ViewDiagnoses'
import NewDiagnosis from './pages/diagnoses/new/NewDiagnosis'
import EditDiagnoses from './pages/diagnoses/edit/EditDiagnoses';
import DeleteDiagnosis from './pages/diagnoses/delete/DeleteDiagnosis'
import ViewCareGoals from './pages/care-goals/ViewCareGoals'
import NewCareGoal from './pages/care-goals/new/NewCareGoal'
import EditCareGoals from './pages/care-goals/edit/EditCareGoals';
import DeleteCareGoal from './pages/care-goals/delete/DeleteCareGoal'
import ViewCarePlans from './pages/care-plans/ViewCarePlans'
import NewCarePlan from './pages/care-plans/new/NewCarePlan'
import EditCarePlans from './pages/care-plans/edit/EditCarePlans';
import DeleteCarePlan from './pages/care-plans/delete/DeleteCarePlan'
import ViewMedications from './pages/medications/ViewMedications'
import DeleteMedication from './pages/medications/delete/CancelMedication'
import NewMedication from './pages/medications/new/NewMedication'
import EditMedications from './pages/medications/edit/EditMedications'
import ViewImagings from './pages/imagings/ViewImagings';
import DeleteImaging from './pages/imagings/delete/DeleteImaging'
import NewImaging from './pages/imagings/new/NewImaging'
import ViewIncidents from './pages/incidents/ViewIncidents'
import NewIncident from './pages/incidents/new/NewIncident'
import ResolveIncident from './pages/incidents/delete/ResolveIncident'
import EditIncidents from './pages/incidents/edit/EditIncidents'
import ViewLabs from './pages/labs/ViewLabs'
import NewLab from './pages/labs/new/NewLab'
import EditLabs from './pages/labs/edit/EditLabs'
import CancelLab from './pages/labs/delete/CancelLab'
import ViewNotes from './pages/notes/ViewNotes'
import NewNote from './pages/notes/new/NewNote'
import EditNotes from './pages/notes/edit/EditNotes'
import DeleteNote from './pages/notes/delete/DeleteNote'
import ViewRelatedPersons from './pages/related-persons/ViewRelatedPersons'
import NewRelatedPerson from './pages/related-persons/new/NewRelatedPerson'
import EditRelatedPersons from './pages/related-persons/edit/EditRelatedPersons'
import DeleteRelatedPerson from './pages/related-persons/delete/DeleteRelatedPerson'
import ViewPatients from './pages/patients/ViewPatients'
import PatientAllergies from './pages/allergies/PatientAllergies'
import PatientViewAllergies from './pages/allergies/PatientViewAllergies'
import PatientNewAllergy from './pages/allergies/new/PatientNewAllergy'
import PatientEditAllergies from './pages/allergies/edit/PatientEditAllergies'
import PatientDeleteAllergy from './pages/allergies/delete/PatientDeleteAllergy'
import PatientDiagnoses from './pages/diagnoses/PatientDiagnoses'
import PatientViewDiagnoses from './pages/diagnoses/PatientViewDiagnoses'
import PatientNewDiagnosis from './pages/diagnoses/new/PatientNewDiagnosis'
import PatientEditDiagnoses from './pages/diagnoses/edit/PatientEditDiagnoses'
import PatientDeleteDiagnosis from './pages/diagnoses/delete/PatientDeleteDiagnosis'
import PatientMedications from './pages/medications/PatientMedications'
import PatientViewMedications from './pages/medications/PatientViewMedications'
import PatientNewMedication from './pages/medications/new/PatientNewMedication'
import PatientEditMedications from './pages/medications/edit/PatientEditMedications'
import PatientCancelMedication from './pages/medications/delete/PatientCancelMedication'
import DoctorIncidents from './pages/incidents/DoctorIncidents'
import DoctorNotes from './pages/notes/DoctorNotes'
import DoctorViewIncidents from './pages/incidents/DoctorViewIncidents'
import DoctorViewNotes from './pages/notes/DoctorViewNotes'
import DoctorNewIncident from './pages/incidents/new/DoctorNewIncident'
import DoctorNewNote from './pages/notes/new/DoctorNewNote'
import DoctorEditIncidents from './pages/incidents/edit/DoctorEditIncidents'
import DoctorEditNotes from './pages/notes/edit/DoctorEditNotes'
import DoctorDeleteIncident from './pages/incidents/delete/DoctorResolveIncident'
import DoctorDeleteNote from './pages/notes/delete/DoctorDeleteNote'

import Chat from "./Chat.js";
import Meeting from './Meeting.js';

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
          {/* <Route path="/appointments" element={<Appointments />} /> */}
          <Route path="/appointments" element={<PatientAppointments />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/incidents" element={<DoctorIncidents />} />
          <Route path="/doctor/notes" element={<DoctorNotes />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/imaging" element={<Imagings />} />
          {/* <Route path="/imaging/view" element={<ViewImagings />} />
          <Route path="/imaging/new" element={<NewImagingRequest />} /> */}
          {/* <Route path="/incidents/view" element={<ViewIncidents />} />
          <Route path="/incidents/visualize" element={<VisualizeIncidents />} />
          <Route path="/incidents/new" element={<ReportIncident />} />
          <Route path="/incidents/:id" element={<ViewIncident />} /> */}
          {/* <Route path="/labs/view" element={<ViewLabs />} /> */}
          {/* <Route path="/labs/:id" element={<ViewLab />} />
          <Route path="/labs/new" element={<NewLabRequest />} /> */}
          {/* <Route path="/medications/view" element={<ViewMedications />} /> */}
          {/* <Route path="/medications/:id" element={<ViewMedications />} /> */}
          {/* <Route path="/medications/new" element={<NewMedicationRequest />} /> */}
          <Route path="/patients/view" element={<ViewPatients />} />
          <Route path="/patients/new" element={<NewPatient />} />
          <Route path="/patients/:id" element={<ViewPatient />} />
          <Route path="/patients/edit/:id" element={<EditPatient />} />
          <Route path="/patients/:id/allergies/view" element={<AllergiesList />} />
          <Route path="/patients/:id/allergies/:allergyId" element={<ViewAllergy />} />
          <Route path="/patients/:id/care-goals/view" element={<ViewCareGoals />} />
          {/* <Route path="/patients/:id/care-goals/:careGoalId" element={<ViewCareGoal />} /> */}
          <Route path="/patients/:id/care-plans/view" element={<ViewCarePlans />} />
          {/* <Route path="/patients/:id/care-plans/:carePlanId" element={<ViewCarePlan />} /> */}
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
          <Route path="/appointments/update" element={<EditAppointments />} />
          <Route path="/appointments/delete" element={<DeleteAppointment />} />

          <Route path="/doctor/appointments/view" element={<DoctorViewAppointments />} />
          <Route path="/doctor/appointments/new" element={<DoctorNewAppointment />} />
          <Route path="/doctor/appointments/update" element={<DoctorEditAppointment />} />
          <Route path="/doctor/appointments/delete" element={<DoctorDeleteAppointment />} />

          <Route path="/doctor/incidents/view" element={<DoctorViewIncidents />} />
          <Route path="/doctor/incidents/new" element={<DoctorNewIncident />} />
          <Route path="/doctor/incidents/update" element={<DoctorEditIncidents />} />
          <Route path="/doctor/incidents/resolve" element={<DoctorDeleteIncident />} />

          <Route path="/doctor/notes/view" element={<DoctorViewNotes />} />
          <Route path="/doctor/notes/new" element={<DoctorNewNote />} />
          <Route path="/doctor/notes/update" element={<DoctorEditNotes />} />
          <Route path="/doctor/notes/delete" element={<DoctorDeleteNote />} />

          <Route path="/allergies" element={<Allergies />} />
          <Route path="/allergies/view" element={<ViewAllergies />} />
          <Route path="/allergies/new" element={<NewAllergy />} />
          <Route path="/allergies/update" element={<EditAllergies />} />
          <Route path="/allergies/delete" element={<DeleteAllergy />} />
          <Route path="/care-goals" element={<CareGoals />} />
          <Route path="/care-plans" element={<CarePlans />} />
          <Route path="/diagnoses" element={<Diagnoses />} />
          <Route path="/diagnoses/view" element={<ViewDiagnoses />} />
          <Route path="/diagnoses/new" element={<NewDiagnosis />} />
          <Route path="/diagnoses/update" element={<EditDiagnoses />} />
          <Route path="/diagnoses/delete" element={<DeleteDiagnosis />} />
          <Route path="/care-goals/view" element={<ViewCareGoals />} />
          <Route path="/care-goals/new" element={<NewCareGoal />} />
          <Route path="/care-goals/update" element={<EditCareGoals />} />
          <Route path="/care-goals/delete" element={<DeleteCareGoal />} /> 
          <Route path="/care-plans/view" element={<ViewCarePlans />} />
          <Route path="/care-plans/new" element={<NewCarePlan />} />
          <Route path="/care-plans/update" element={<EditCarePlans />} />
          <Route path="/care-plans/delete" element={<DeleteCarePlan />} />

          <Route path="/medications/view" element={<ViewMedications />} />
          <Route path="/medications/new" element={<NewMedication />} />
          <Route path="/medications/update" element={<EditMedications />} />
          <Route path="/medications/cancel" element={<DeleteMedication />} />

          <Route path="/imagings/view" element={<ViewImagings />} />
          <Route path="/imagings/new" element={<NewImaging />} />
          <Route path="/imagings/delete" element={<DeleteImaging />} />

          <Route path="/incidents/view" element={<ViewIncidents />} />
          <Route path="/incidents/new" element={<NewIncident />} />
          <Route path="/incidents/update" element={<EditIncidents />} />
          <Route path="/incidents/resolve" element={<ResolveIncident />} />

          <Route path="/labs/view" element={<ViewLabs />} />
          <Route path="/labs/new" element={<NewLab />} />
          <Route path="/labs/update" element={<EditLabs />} />
          <Route path="/labs/cancel" element={<CancelLab />} />

          <Route path="/notes/view" element={<ViewNotes />} />
          <Route path="/notes/new" element={<NewNote />} />
          <Route path="/notes/update" element={<EditNotes />} />
          <Route path="/notes/delete" element={<DeleteNote />} />

          <Route path="/related-persons/view" element={<ViewRelatedPersons />} />
          <Route path="/related-persons/new" element={<NewRelatedPerson />} />
          <Route path="/related-persons/update" element={<EditRelatedPersons />} />
          <Route path="/related-persons/delete" element={<DeleteRelatedPerson />} />

          <Route path="/imaging/view" element={<ViewImagings />} />
          <Route path="/imaging/new" element={<NewImaging />} />
          <Route path="/imaging/delete" element={<DeleteImaging />} />

          <Route path="/related-persons" element={<RelatedPersons />} />
          <Route path="/notes" element={<Notes />} />
          {/* <Route path="/patient-notes" element={<PatientNotes />} /> */}

          <Route path="/patients/allergies/:patientId" element={<PatientAllergies />} />
          <Route path="/patients/allergies/view/:patientId" element={<PatientViewAllergies />} />
          <Route path="/patients/allergies/new/:patientId" element={<PatientNewAllergy />} />
          <Route path="/patients/allergies/update/:patientId" element={<PatientEditAllergies />} />
          <Route path="/patients/allergies/delete/:patientId" element={<PatientDeleteAllergy />} />

          <Route path="/patients/diagnoses/:patientId" element={<PatientDiagnoses />} />
          <Route path="/patients/diagnoses/view/:patientId" element={<PatientViewDiagnoses />} />
          <Route path="/patients/diagnoses/new/:patientId" element={<PatientNewDiagnosis />} />
          <Route path="/patients/diagnoses/update/:patientId" element={<PatientEditDiagnoses />} />
          <Route path="/patients/diagnoses/delete/:patientId" element={<PatientDeleteDiagnosis />} />

          <Route path="/patients/medications/:patientId" element={<PatientMedications />} />
          <Route path="/patients/medications/view/:patientId" element={<PatientViewMedications />} />
          <Route path="/patients/medications/new/:patientId" element={<PatientNewMedication />} />
          <Route path="/patients/medications/update/:patientId" element={<PatientEditMedications />} />
          <Route path="/patients/medications/cancel/:patientId" element={<PatientCancelMedication />} />

          <Route path="/assistant" element={<Chat />} />
          <Route path="/meeting" element={<Meeting />} />
        </Routes>
      </TitleProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
};

export default App;