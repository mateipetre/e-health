import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const EventCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  borderLeft: '6px solid #1976d2',
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Added shadow
}));

const EventTitle = styled(Typography)({
  fontSize: '18px', // Used hardcoded value
  fontWeight: '500',
  color: '#333',
});

const EventTime = styled(Typography)({
  fontSize: '14px', // Used hardcoded value
  color: '#666',
});

const HICEvent = ({ id, allDay, start, end, title }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <EventCard>
      <CardContent>
        <EventTitle variant="h5">{title}</EventTitle>
        <Box mt={1}>
          <EventTime variant="body2">
            {allDay ? 'All Day' : `${formatDate(start)} - ${formatDate(end)}`}
          </EventTime>
        </Box>
      </CardContent>
    </EventCard>
  );
};

HICEvent.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  allDay: PropTypes.bool,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

HICEvent.defaultProps = {
  allDay: false,
};

export default HICEvent;