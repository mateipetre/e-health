import React from 'react';
import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { styled } from '@mui/system';
import 'chart.js/auto';

// Define custom pastel colors
const pastelColors = [
  '#B3E5FC', // Brighter pastel blue
  '#B2DFDB', // Brighter pastel green
  '#FFCDD2', // Brighter pastel red
  '#FFE0B2', // Brighter pastel orange
  '#E1BEE7', // Brighter pastel purple
];

const HICBarGraphContainer = styled(Box)({
  padding: '16px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
  fontFamily: 'Lato, sans-serif',
});

const HICBarGraph = ({ data, options, height, width }) => {
  // Ensure the default options include the Poppins font
  const defaultOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Lato',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Lato',
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: 'Lato',
          },
        },
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  // Generate pastel colors for each dataset
  const datasetsWithColors = data.datasets.map((dataset, index) => ({
    ...dataset,
    backgroundColor: pastelColors[index % pastelColors.length],
  }));

  const dataWithColors = {
    ...data,
    datasets: datasetsWithColors,
  };

  return (
    <HICBarGraphContainer>
      <Bar data={dataWithColors} options={mergedOptions} height={height} width={width} />
    </HICBarGraphContainer>
  );
};

export default HICBarGraph;