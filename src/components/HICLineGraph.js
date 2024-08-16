import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { styled } from '@mui/system';
import { Card, CardContent, Typography } from '@mui/material';

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphContainer = styled(Card)(({ bgcolor }) => ({
  backgroundColor: bgcolor || '#fff',
  borderRadius: '12px',
  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
  overflow: 'hidden',
}));

const HICLineGraph = ({ title, data, options, bgcolor, height, width }) => {
  return (
    <GraphContainer bgcolor={bgcolor}>
      <CardContent>
        {title && (
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
        )}
        <Line data={data} options={options} height={height} width={width} />
      </CardContent>
    </GraphContainer>
  );
};

HICLineGraph.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
  bgcolor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

HICLineGraph.defaultProps = {
  title: '',
  options: {},
  bgcolor: '',
  height: 400,
  width: 600,
};

export default HICLineGraph;