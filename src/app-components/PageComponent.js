import React from 'react';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import useTranslator from '../hooks/useTranslator';

const pageSizes = [
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '200', value: 200 },
  { label: 'All', value: undefined },
];

export const defaultPageSize = pageSizes[0];

const PageComponent = ({
  hasNext,
  hasPrevious,
  pageNumber,
  setPreviousPageRequest,
  setNextPageRequest,
  pageSize,
  setPageSize
}) => {
  const { t } = useTranslator();

  return (
    <div style={{ textAlign: 'center' }}>
      <Button
        variant="outlined"
        color="success"
        disabled={!hasPrevious}
        style={{ float: 'left', marginRight: '5px' }}
        onClick={setPreviousPageRequest}
      >
        {t('actions.previous')}
      </Button>
      <Button
        variant="outlined"
        color="success"
        disabled={!hasNext}
        style={{ float: 'left' }}
        onClick={setNextPageRequest}
      >
        {t('actions.next')}
      </Button>
      <div style={{ display: 'inline-block' }}>
        {t('actions.page')} {pageNumber}
      </div>
      <div style={{ float: 'right' }}>
        <FormControl variant="outlined" size="small">
          <InputLabel id="page-size-label">{t('actions.pageSize')}</InputLabel>
          <Select
            labelId="page-size-label"
            id="page-size"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            label={t('actions.pageSize')}
          >
            {pageSizes.map((size) => (
              <MenuItem key={size.value} value={size.value}>
                {size.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default PageComponent;