import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const HICPieGraph = ({ data, colors, width, height, innerRadius, outerRadius, legend, tooltip }) => {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        paddingAngle={5}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      {legend && <Legend verticalAlign="top" height={36} />}
      {tooltip && <Tooltip />}
    </PieChart>
  );
};

HICPieGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  legend: PropTypes.bool,
  tooltip: PropTypes.bool,
};

HICPieGraph.defaultProps = {
  width: 400,
  height: 300,
  innerRadius: 0,
  outerRadius: 100,
  legend: true,
  tooltip: true,
};

export default HICPieGraph;
