import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';

const StyledTableContainer = styled(TableContainer)({
  borderRadius: '8px',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '16px',
});

const StyledTable = styled(Table)({
  minWidth: '650px',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#eeeeea',
});

const StyledTableCell = styled(TableCell)(({ textColor }) => ({
  color: textColor || '#333',
  fontWeight: 'bold',
  borderBottom: 'none',
}));

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fafafa',
  },
});

const StyledButton = styled(Button)({
  borderRadius: '36px',
  padding: '8px 16px',
  textTransform: 'none', // Prevents all caps text
  backgroundColor: '#2196f3',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
});

const HICTable = ({ columns, data, defaultSortColumn, defaultSortDirection, backgroundColor, textColor, buttonColumn, ...rest }) => {
  const [sortConfig, setSortConfig] = useState({
    column: defaultSortColumn,
    direction: defaultSortDirection,
  });

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.column === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ column, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.column] < b[sortConfig.column]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.column] > b[sortConfig.column]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <StyledTableContainer component={Paper} backgroundColor={backgroundColor} {...rest}>
      <StyledTable>
        <StyledTableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell key={index} textColor={textColor}>
                {column.isSortable ? (
                  <TableSortLabel
                    active={sortConfig.column === column.field}
                    direction={sortConfig.direction}
                    onClick={() => handleSort(column.field)}
                  >
                    {column.header}
                  </TableSortLabel>
                ) : (
                  column.header
                )}
              </StyledTableCell>
            ))}
            {buttonColumn && (
              <StyledTableCell key="actions" align="right">
                Actions
              </StyledTableCell>
            )}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {sortedData.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {column.renderIcon && row[column.field] && (
                    <IconButton onClick={() => column.onClick(row)}>
                      {column.renderIcon(row)}
                    </IconButton>
                  )}
                  {!column.renderIcon && row[column.field]}
                </TableCell>
              ))}
              {buttonColumn && (
                <TableCell align="right">
                  <StyledButton variant="contained" onClick={() => buttonColumn.onClick(row)}>
                    {buttonColumn.label}
                  </StyledButton>
                </TableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

HICTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      isSortable: PropTypes.bool,
      renderIcon: PropTypes.func, // New prop for rendering icons
      onClick: PropTypes.func, // Function to handle icon click
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultSortColumn: PropTypes.string.isRequired,
  defaultSortDirection: PropTypes.oneOf(['asc', 'desc']),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  buttonColumn: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};

HICTable.defaultProps = {
  defaultSortDirection: 'asc',
  backgroundColor: '#ffffff',
  textColor: '#333333',
};

export default HICTable;