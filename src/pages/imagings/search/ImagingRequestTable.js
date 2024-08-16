import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import format from 'date-fns/format';
import Loading from '../../../app-components/Loading';
import useTranslator from '../../../hooks/useTranslator';
import { extractUsername } from '../../../util/extractUsername';
import useImagingSearch from '../hooks/useImagingSearch';

const ImagingRequestTable = ({ searchRequest }) => {
  const { t } = useTranslator();
  const { data, status } = useImagingSearch(searchRequest) || { data: [], status: 'loading' };

  if (status === 'loading') {
    return <Loading />;
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