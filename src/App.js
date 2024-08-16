/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import HealthInCampus from './HealthInCampus';
import Dashboard from './pages/dashboard/Dashboard';
import Appointments from './pages/scheduling/appointments/Appointments';
import Patients from './pages/patients/Patients';
import Labs from './pages/labs/Labs';
import Medications from './pages/medications/Medications';
import Incidents from './pages/incidents/Incidents';
import Settings from './app-components/Settings';
import Imagings from './pages/imagings/Imagings';

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
          <Route path="/homepage/*" element={authenticated ? <HealthInCampus /> : <Navigate to="/login" />} />
          
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/imaging/*" element={<Imagings />} />
        </Routes>
      </TitleProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
};

export default App;