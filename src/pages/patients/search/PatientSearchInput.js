import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

import useDebounce from '../../../hooks/useDebounce';
import useTranslator from '../../../hooks/useTranslator';

const PatientSearchInput = ({ onChange }) => {
  const { t } = useTranslator();
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    onChange({
      queryString: debouncedSearchText,
    });
  }, [debouncedSearchText, onChange]);

  const onSearchBoxChange = (event) => {
    const queryString = event.currentTarget.value;
    setSearchText(queryString);
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      size="medium"
      type="text"
      onChange={onSearchBoxChange}
      value={searchText}
      placeholder={t('actions.search')}
    />
  );
};

export default PatientSearchInput;