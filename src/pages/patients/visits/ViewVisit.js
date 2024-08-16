import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../app-components/Loading';
import Box from '@mui/material/Box';

import useVisit from '../hooks/useVisit';
import VisitForm from './VisitForm';

const ViewVisit = ({ patientId }) => {
  const { visitId } = useParams();

  // Ensure visitId is a string or provide a default value
  const visitIdAsString = visitId || '';

  const { data: visit, status } = useVisit(patientId, visitIdAsString);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Loading />
      </Box>
    );
  }

  if (!visit) {
    return <p>Visit not found</p>;
  }

  return (
    <>
      <h2>{visit.reason}</h2>
      <VisitForm visit={visit} disabled />
    </>
  );
};

export default ViewVisit;