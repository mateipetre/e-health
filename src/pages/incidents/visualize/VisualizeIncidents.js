import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CircularProgress, Box } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

import { useUpdateTitle } from '../../page-header/title/TitleContext';
import useTranslator from '../../../hooks/useTranslator';
import useIncidents from '../hooks/useIncidents';
import IncidentFilter from '../IncidentFilter';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const VisualizeIncidents = () => {
  const { t } = useTranslator();
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle(t('incidents.visualize.view'));
  }, [updateTitle, t]);

  const searchFilter = IncidentFilter.REPORTED;
  const searchRequest = { status: searchFilter };
  const { data, isLoading } = useIncidents(searchRequest);
  const [incident, setIncident] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [monthlyIncidents, setMonthlyIncidents] = useState(Array(12).fill(0));

  const getIncidentMonth = (reportedOn) => Number(reportedOn.slice(5, 7)) - 1;

  useEffect(() => {
    if (data === undefined || isLoading) {
      // incidents data not loaded yet, do nothing
    } else {
      const totalIncidents = data.length;
      if (totalIncidents > incident) {
        const incidentMonth = getIncidentMonth(data[incident].reportedOn);
        setMonthlyIncidents((prevIncidents) =>
          prevIncidents.map((value, index) => (index === incidentMonth ? value + 1 : value)),
        );
        setIncident(incident + 1);
      } else if (totalIncidents === incident) {
        // incidents data finished processing
        setShowGraph(true);
      }
    }
  }, [data, isLoading, incident]);

  const chartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        backgroundColor: 'blue',
        borderColor: 'black',
        data: monthlyIncidents,
        label: 'Incidents',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Reported Incidents Overtime',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Numbers',
        },
      },
    },
  };

  return !showGraph ? (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  ) : (
    <Box>
      <Line data={chartData} options={chartOptions} />
    </Box>
  );
};

export default VisualizeIncidents;