import React from 'react';
import { Grid } from '@mui/material';

const HICColumn = ({ as, xl, lg, md, sm, xs, children, className, style }) => {
  return (
    <Grid
      as={as || 'div'}
      item
      xl={xl}
      lg={lg}
      md={md}
      sm={sm}
      xs={xs}
      className={className}
      style={style}
    >
      {children}
    </Grid>
  );
};

export default HICColumn;