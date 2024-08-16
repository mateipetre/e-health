import React, { useState } from 'react';
import { List, ListItem, IconButton, ListItemText, Divider } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LaboratoryIcon from '@mui/icons-material/Laboratory';
import MedicationIcon from '@mui/icons-material/Medication';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ImageIcon from '@mui/icons-material/Image';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import useTranslator from '../hooks/useTranslator';
import Permissions from '../app-components/Permissions';
import { updateSidebar } from '../components/component-slice';

/**
 * Sidebar component.
 * @returns {JSX.Element} The sidebar component.
 */
const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarCollapsed } = useSelector((state) => state.components);
  const permissions = useSelector((state) => state.user.permissions);

  const { t } = useTranslator();
  const path = useLocation();
  const navigate = useNavigate();
  const { pathname } = path;
  const splittedPath = pathname.split('/');

  /**
   * Navigate to a specific location.
   * @param {string} location - The path to navigate to.
   */
  const navigateTo = (location) => {
    navigate(location);
  };

  const [expandedItem, setExpandedItem] = useState(
    splittedPath[1]?.includes('patients') ? 'patient' :
    splittedPath[1]?.includes('appointments') ? 'appointment' :
    splittedPath[1]?.includes('labs') ? 'labs' :
    splittedPath[1]?.includes('medications') ? 'medications' :
    splittedPath[1]?.includes('incidents') ? 'incidents' :
    splittedPath[1]?.includes('imagings') ? 'imagings' : 'none'
  );

  /**
   * Set the expansion state of a specific item.
   * @param {string} item - The item to expand or collapse.
   */
  const setExpansion = (item) => {
    setExpandedItem(expandedItem === item ? 'none' : item);
  };

  const getDashboardLink = () => (
    <ListItem
      button
      selected={pathname === '/'}
      onClick={() => {
        navigateTo('/');
        setExpansion('none');
      }}
    >
      <DashboardIcon />
      <ListItemText primary={!sidebarCollapsed ? t('dashboard.label') : ''} />
    </ListItem>
  );

  const getPatientLinks = () => (
    <>
      <ListItem
        button
        selected={splittedPath[1]?.includes('patients')}
        onClick={() => {
          navigateTo('/patients');
          setExpansion('patient');
        }}
      >
        <IconButton>
          {splittedPath[1]?.includes('patients') && expandedItem === 'patient' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <PeopleIcon />
        <ListItemText primary={!sidebarCollapsed ? t('patients.label') : ''} />
      </ListItem>
      {splittedPath[1]?.includes('patients') && expandedItem === 'patient' && (
        <List>
          {permissions.includes(Permissions.WritePatients) && (
            <ListItem
              button
              onClick={() => navigateTo('/patients/new')}
              selected={splittedPath[1]?.includes('patients') && splittedPath.length > 2}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('patients.newPatient') : ''} />
            </ListItem>
          )}
          {permissions.includes(Permissions.ReadPatients) && (
            <ListItem
              button
              onClick={() => navigateTo('/patients')}
              selected={splittedPath[1]?.includes('patients') && splittedPath.length < 3}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('patients.patientsList') : ''} />
            </ListItem>
          )}
        </List>
      )}
    </>
  );

  const getAppointmentLinks = () => (
    <>
      <ListItem
        button
        selected={splittedPath[1]?.includes('appointments')}
        onClick={() => {
          navigateTo('/appointments');
          setExpansion('appointment');
        }}
      >
        <IconButton>
          {splittedPath[1]?.includes('appointments') && expandedItem === 'appointment' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <EventNoteIcon />
        <ListItemText primary={!sidebarCollapsed ? t('scheduling.label') : ''} />
      </ListItem>
      {splittedPath[1]?.includes('appointments') && expandedItem === 'appointment' && (
        <List>
          {permissions.includes(Permissions.WriteAppointments) && (
            <ListItem
              button
              onClick={() => navigateTo('/appointments/new')}
              selected={splittedPath[1]?.includes('appointments') && splittedPath.length > 2}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('scheduling.appointments.new') : ''} />
            </ListItem>
          )}
          {permissions.includes(Permissions.ReadAppointments) && (
            <ListItem
              button
              onClick={() => navigateTo('/appointments')}
              selected={splittedPath[1]?.includes('appointments') && splittedPath.length < 3}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('scheduling.appointments.schedule') : ''} />
            </ListItem>
          )}
        </List>
      )}
    </>
  );

  const getLabLinks = () => (
    <>
      <ListItem
        button
        selected={splittedPath[1]?.includes('labs')}
        onClick={() => {
          navigateTo('/labs');
          setExpansion('labs');
        }}
      >
        <IconButton>
          {splittedPath[1]?.includes('labs') && expandedItem === 'labs' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <LaboratoryIcon />
        <ListItemText primary={!sidebarCollapsed ? t('labs.label') : ''} />
      </ListItem>
      {splittedPath[1]?.includes('labs') && expandedItem === 'labs' && (
        <List>
          {permissions.includes(Permissions.RequestLab) && (
            <ListItem
              button
              onClick={() => navigateTo('/labs/new')}
              selected={splittedPath[1]?.includes('labs') && splittedPath.length > 2}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('labs.requests.new') : ''} />
            </ListItem>
          )}
          {permissions.includes(Permissions.ViewLabs) && (
            <ListItem
              button
              onClick={() => navigateTo('/labs')}
              selected={splittedPath[1]?.includes('labs') && splittedPath.length < 3}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('labs.requests.label') : ''} />
            </ListItem>
          )}
        </List>
      )}
    </>
  );

  const getMedicationLinks = () => (
    <>
      <ListItem
        button
        selected={splittedPath[1]?.includes('medications')}
        onClick={() => {
          navigateTo('/medications');
          setExpansion('medications');
        }}
      >
        <IconButton>
          {splittedPath[1]?.includes('medications') && expandedItem === 'medications' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <MedicationIcon />
        <ListItemText primary={!sidebarCollapsed ? t('medications.label') : ''} />
      </ListItem>
      {splittedPath[1]?.includes('medications') && expandedItem === 'medications' && (
        <List>
          {permissions.includes(Permissions.RequestMedication) && (
            <ListItem
              button
              onClick={() => navigateTo('/medications/new')}
              selected={splittedPath[1]?.includes('medications') && splittedPath.length > 2}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('medications.requests.new') : ''} />
            </ListItem>
          )}
          {permissions.includes(Permissions.ViewMedications) && (
            <ListItem
              button
              onClick={() => navigateTo('/medications')}
              selected={splittedPath[1]?.includes('medications') && splittedPath.length < 3}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('medications.requests.label') : ''} />
            </ListItem>
          )}
        </List>
      )}
    </>
  );

  const getIncidentLinks = () => (
    <>
      <ListItem
        button
        selected={splittedPath[1]?.includes('incidents')}
        onClick={() => {
          navigateTo('/incidents');
          setExpansion('incidents');
        }}
      >
        <IconButton>
          {splittedPath[1]?.includes('incidents') && expandedItem === 'incidents' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <ReportProblemIcon />
        <ListItemText primary={!sidebarCollapsed ? t('incidents.label') : ''} />
      </ListItem>
      {splittedPath[1]?.includes('incidents') && expandedItem === 'incidents' && (
        <List>
          {permissions.includes(Permissions.ReportIncident) && (
            <ListItem
              button
              onClick={() => navigateTo('/incidents/new')}
              selected={splittedPath[1]?.includes('incidents') && splittedPath.length > 2}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('incidents.reports.new') : ''} />
            </ListItem>
          )}
          {permissions.includes(Permissions.ViewIncidents) && (
            <ListItem
              button
              onClick={() => navigateTo('/incidents')}
              selected={splittedPath[1]?.includes('incidents') && splittedPath.length < 3}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('incidents.reports.label') : ''} />
            </ListItem>
          )}
          {permissions.includes(Permissions.ViewIncidentWidgets) && (
            <ListItem
              button
              onClick={() => navigateTo('/incidents/visualize')}
              selected={splittedPath[1]?.includes('incidents') && splittedPath.length < 3}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('incidents.visualize.label') : ''} />
            </ListItem>
          )}
        </List>
      )}
    </>
  );

  const getImagingLinks = () => (
    <>
      <ListItem
        button
        selected={splittedPath[1]?.includes('imaging')}
        onClick={() => {
          navigateTo('/imaging');
          setExpansion('imagings');
        }}
      >
        <IconButton>
          {splittedPath[1]?.includes('imaging') && expandedItem === 'imagings' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <ImageIcon />
        <ListItemText primary={!sidebarCollapsed ? t('imagings.label') : ''} />
      </ListItem>
      {splittedPath[1]?.includes('imaging') && expandedItem === 'imagings' && (
        <List>
          {permissions.includes(Permissions.RequestImaging) && (
            <ListItem
              button
              onClick={() => navigateTo('/imaging/new')}
              selected={splittedPath[1]?.includes('imaging') && splittedPath.length > 2}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('imagings.requests.new') : ''} />
            </ListItem>
          )}
          {permissions.includes(Permissions.ViewImagings) && (
            <ListItem
              button
              onClick={() => navigateTo('/imaging')}
              selected={splittedPath[1]?.includes('imaging') && splittedPath.length < 3}
              style={{ paddingLeft: '2rem' }}
            >
              <ListItemText primary={!sidebarCollapsed ? t('imagings.requests.label') : ''} />
            </ListItem>
          )}
        </List>
      )}
    </>
  );

  return (
    <nav
      className="d-none d-md-block bg-light sidebar"
      style={{ width: sidebarCollapsed ? '56px' : '' }}
    >
      <div className="sidebar-sticky">
        <List>
          <ListItem
            button
            onClick={() => dispatch(updateSidebar())}
          >
            <IconButton>
              {sidebarCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </ListItem>
          {getDashboardLink()}
          <Divider />
          {getPatientLinks()}
          {getAppointmentLinks()}
          {getMedicationLinks()}
          {getLabLinks()}
          {getImagingLinks()}
          {getIncidentLinks()}
        </List>
      </div>
    </nav>
  );
};

export default Sidebar;