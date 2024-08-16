import React from 'react';
import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import MedicationsList from './MedicationsList';

// Medications component
const Medications = (props) => {
  const { patient } = props;

  // Set up breadcrumbs
  const breadcrumbs = [
    {
      i18nKey: 'patient.medications.label',
      location: `/patients/${patient.id}/medications`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs);

  // Render MedicationsList
  return (
    <div>
      <MedicationsList patient={patient} />
    </div>
  );
};

export default Medications;