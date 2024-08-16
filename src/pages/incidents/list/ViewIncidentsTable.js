import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Menu,
  MenuItem,
  Paper,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useTranslator from '../../../hooks/useTranslator';
import useIncidents from '../hooks/useIncidents';

function ViewIncidentsTable({ searchRequest }) {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const { data, isLoading } = useIncidents(searchRequest);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (data === undefined || isLoading) {
    return <CircularProgress />;
  }

  const downloadCSV = () => {
    const searchParams = new URLSearchParams({ searchRequest });

    fetch(`/api/incidents/csv?${searchParams}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;

        const incidentsText = t('incidents.label');
        const filename = `${incidentsText}-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.csv`;

        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };

  const menuItems = [
    {
      onClick: downloadCSV,
      text: 'CSV',
    },
  ];

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        startIcon={<MoreVertIcon />}
        style={{ marginLeft: 'auto', marginBottom: '4px' }}
      >
        {t('incidents.reports.download')}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick();
              handleMenuClose();
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('incidents.reports.code')}</TableCell>
              <TableCell>{t('incidents.reports.dateOfIncident')}</TableCell>
              <TableCell>{t('incidents.reports.reportedBy')}</TableCell>
              <TableCell>{t('incidents.reports.reportedOn')}</TableCell>
              <TableCell>{t('incidents.reports.status')}</TableCell>
              <TableCell>{t('actions.label')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.date ? format(new Date(row.date), 'yyyy-MM-dd hh:mm a') : ''}</TableCell>
                <TableCell>{row.reportedBy}</TableCell>
                <TableCell>{row.reportedOn ? format(new Date(row.reportedOn), 'yyyy-MM-dd hh:mm a') : ''}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => navigate(`incidents/${row.id}`)}
                  >
                    {t('actions.view')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ViewIncidentsTable;