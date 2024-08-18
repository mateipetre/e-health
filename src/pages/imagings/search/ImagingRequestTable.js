import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import format from 'date-fns/format';
import Loading from '../../../app-components/Loading';
import useTranslator from '../../../hooks/useTranslator';
import { extractUsername } from '../../../util/extractUsername';

const ImagingRequestTable = () => {
  const { t } = useTranslator();

  // Hardcoded data
  const data = [
    {
      id: 1,
      code: 'IMG001',
      type: 'X-Ray',
      requestedOn: '2023-08-01T10:30:00Z',
      fullName: 'John Doe',
      requestedByFullName: 'Dr. Smith',
      status: 'Requested',
    },
    {
      id: 2,
      code: 'IMG002',
      type: 'MRI',
      requestedOn: '2023-08-02T11:00:00Z',
      fullName: 'Jane Doe',
      requestedByFullName: 'Dr. Johnson',
      status: 'Completed',
    },
  ];
  const status = 'success';

  if (status === 'loading') {
    return <Loading />;
  }

  if (data.length === 0 && status === 'success') {
    return <div>No imaging requests found</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('imagings.imaging.code')}</TableCell>
            <TableCell>{t('imagings.imaging.type')}</TableCell>
            <TableCell>{t('imagings.imaging.requestedOn')}</TableCell>
            <TableCell>{t('imagings.imaging.patient')}</TableCell>
            <TableCell>{t('imagings.imaging.requestedBy')}</TableCell>
            <TableCell>{t('imagings.imaging.status')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>
                {row.requestedOn ? format(new Date(row.requestedOn), 'yyyy-MM-dd hh:mm a') : ''}
              </TableCell>
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{extractUsername(row.requestedByFullName || '')}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ImagingRequestTable;