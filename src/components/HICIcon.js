import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@mui/icons-material';

const iconMapping = {
  appointment: Icons.Event,
  add: Icons.Add,
  remove: Icons.Remove,
  create: Icons.Create,
  admin: Icons.AdminPanelSettings,
  user: Icons.Person,
  doctor: Icons.LocalHospital,
  patient: Icons.PersonOutline,
  nurse: Icons.Healing,
  calendar: Icons.CalendarToday,
  billing: Icons.Receipt,
  treatment: Icons.MedicalServices,
  disease: Icons.Biotech,
  dashboard: Icons.Dashboard,
  edit: Icons.Edit,
  delete: Icons.Delete,
  view: Icons.Visibility,
  image: Icons.Image,
  incident: Icons.ReportProblem,
  inventory: Icons.Inventory,
  lab: Icons.Science,
  logout: Icons.Logout,
  login: Icons.Login,
  medication: Icons.LocalPharmacy,
  menu: Icons.Menu,
  'patient-add': Icons.PersonAdd,
  'patient-remove': Icons.PersonRemove,
  save: Icons.Save,
  setting: Icons.Settings,
  'live-meeting': Icons.VideoCall,
  call: Icons.Call,
  map: Icons.Map,
  fingerprint: Icons.Fingerprint,
};

const HICIcon = ({ name, size, color, className, style }) => {
  const IconComponent = iconMapping[name];

  if (!IconComponent) {
    console.error(`Icon '${name}' not found in icon mapping.`);
    return null;
  }

  return <IconComponent fontSize={size} color={color} className={className} style={style} />;
};

HICIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['inherit', 'default', 'small', 'large']),
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'action',
    'error',
    'disabled',
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
};

HICIcon.defaultProps = {
  size: 'default',
  color: 'inherit',
  className: '',
  style: {},
};

export default HICIcon;