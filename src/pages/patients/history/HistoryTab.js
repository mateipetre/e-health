import React from 'react';
import HistoryTable from './HistoryTable';

const HistoryTab = ({ patientId }) => (
  <>
    <HistoryTable patientId={patientId} />
  </>
);

export default HistoryTab;