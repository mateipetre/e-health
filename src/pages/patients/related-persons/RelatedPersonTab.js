import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Alert, CircularProgress, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, IconButton, AlertTitle } from '@mui/material';
import { Add, Delete, Visibility } from '@mui/icons-material';

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import useTranslator from '../../../hooks/useTranslator';
import Permissions from '../../../app-components/Permissions';
import usePatientRelatedPersons from '../hooks/usePatientRelatedPersons';
import useRemovePatientRelatedPerson from '../hooks/useRemovePatientRelatedPerson';
import AddRelatedPersonModal from './AddRelatedPersonModal';

const RelatedPersonTab = (props) => {
  const { patient } = props;
  const navigate = useNavigate();
  const { t } = useTranslator();
  const { permissions } = useSelector((state) => state.user);
  const [showNewRelatedPersonModal, setShowRelatedPersonModal] = useState(false);
  const { mutate } = useRemovePatientRelatedPerson();

  const breadcrumbs = [
    {
      i18nKey: 'patient.relatedPersons.label',
      location: `/patients/${patient.id}/relatedpersons`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs);

  const { data: relatedPersons } = usePatientRelatedPersons(patient.id);

  const onNewRelatedPersonClick = () => {
    setShowRelatedPersonModal(true);
  };

  const closeNewRelatedPersonModal = () => {
    setShowRelatedPersonModal(false);
  };

  const onRelatedPersonDelete = (relatedPerson) => {
    mutate({ patientId: patient.id, relatedPersonId: relatedPerson.id });
  };

  const navigateTo = (location) => {
    navigate(location);
  };

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        {permissions.includes(Permissions.WritePatients) && (
          <Button
            variant="outlined"
            color="success"
            startIcon={<Add />}
            onClick={onNewRelatedPersonClick}
          >
            {t('patient.relatedPersons.add')}
          </Button>
        )}
      </Box>

      <Box>
        {relatedPersons ? (
          relatedPersons.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('patient.givenName')}</TableCell>
                    <TableCell>{t('patient.familyName')}</TableCell>
                    <TableCell>{t('patient.relatedPersons.relationshipType')}</TableCell>
                    <TableCell>{t('actions.label')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {relatedPersons.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.givenName}</TableCell>
                      <TableCell>{row.familyName}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => navigateTo(`/patients/${row.id}`)}>
                          <Visibility />
                        </IconButton>
                        <IconButton color="error" onClick={() => onRelatedPersonDelete(row)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="warning">
              <AlertTitle>{t('patient.relatedPersons.warning.noRelatedPersons')}</AlertTitle>
              {t('patient.relatedPersons.addRelatedPersonAbove')}
            </Alert>
          )
        ) : (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress color="primary" />
          </Box>
        )}
      </Box>

      <AddRelatedPersonModal
        patientId={patient.id}
        show={showNewRelatedPersonModal}
        toggle={closeNewRelatedPersonModal}
        onCloseButtonClick={closeNewRelatedPersonModal}
      />
    </div>
  );
};

export default RelatedPersonTab;