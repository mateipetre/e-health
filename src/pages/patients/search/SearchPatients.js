import { Container, Row, Col } from 'react-bootstrap';
import React, { useCallback, useState } from 'react';

import PatientSearchInput from './PatientSearchInput';
import ViewPatientsTable from './ViewPatientsTable';

const SearchPatients = () => {
  const [searchRequest, setSearchRequest] = useState({ queryString: '' });

  const onSearchRequestChange = useCallback((newSearchRequest) => {
    setSearchRequest(newSearchRequest);
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <PatientSearchInput onChange={onSearchRequestChange} />
          </Col>
        </Row>
        <Row>
          <ViewPatientsTable searchRequest={searchRequest} />
        </Row>
      </Container>
    </div>
  );
};

export default SearchPatients;