import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Paper } from '@mui/material';
import useTranslator from '../../../hooks/useTranslator';
import Permissions from '../../../app-components/Permissions';
import { formatDate } from '../../../util/formatDate';
import NewAllergyModal from '../allergies/NewAllergyModal';
import AddCarePlanModal from '../care-plans/AddCarePlanModal';
import AddDiagnosisModal from '../diagnoses/AddDiagnosisModal';
import usePatientAllergies from '../hooks/usePatientAllergies';
import AddVisitModal from '../visits/AddVisitModal';

const getPatientCode = (p) => {
  return p ? p.code : '';
}

const ImportantPatientInfo = ({ patient }) => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const { permissions } = useSelector((state) => state.user);
  const [showNewAllergyModal, setShowNewAllergyModal] = useState(false);
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);
  const [showAddCarePlanModal, setShowAddCarePlanModal] = useState(false);
  const [showAddVisitModal, setShowAddVisitModal] = useState(false);
  const { data, status } = usePatientAllergies(patient.id);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h5">{patient.fullName}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">
            <strong>{t('patient.code')}</strong>: {getPatientCode(patient)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">
            <strong>{t('patient.sex')}</strong>: {patient.sex}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">
            <strong>{t('patient.dateOfBirth')}</strong>: {patient.dateOfBirth ? formatDate(patient.dateOfBirth) : t('patient.unknownDateOfBirth')}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          {permissions.includes(Permissions.AddVisit) && (
            <Button variant="outlined" color="success" onClick={() => setShowAddVisitModal(true)}>
              {t('patient.visits.new')}
            </Button>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">{t('patient.allergies.label')}</Typography>
          <Paper style={{ overflow: 'hidden' }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('patient.allergies.allergyName')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && (status === 'error' || status === 'success') ? (
                    (data).map((allergy) => (
                      <TableRow key={allergy.id} hover onClick={() => navigate(`/patients/${patient.id}/allergies`)} style={{ cursor: 'pointer' }}>
                        <TableCell>{allergy.name}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>{t('patient.noData')}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          {permissions.includes(Permissions.AddAllergy) && (
            <Button variant="contained" color="primary" onClick={() => setShowNewAllergyModal(true)} style={{ marginTop: '1rem' }}>
              {t('patient.allergies.new')}
            </Button>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6">{t('patient.diagnoses.label')}</Typography>
          <Paper style={{ overflow: 'hidden' }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('patient.diagnoses.diagnosisName')}</TableCell>
                    <TableCell>{t('patient.diagnoses.diagnosisDate')}</TableCell>
                    <TableCell>{t('patient.diagnoses.status')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patient.diagnoses ? (
                    patient.diagnoses.map((diagnosis) => (
                      <TableRow key={diagnosis.id} hover onClick={() => navigate(`/patients/${patient.id}/diagnoses/${diagnosis.id}`)} style={{ cursor: 'pointer' }}>
                        <TableCell>{diagnosis.name}</TableCell>
                        <TableCell>{formatDate(diagnosis.diagnosisDate)}</TableCell>
                        <TableCell>{diagnosis.status}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>{t('patient.noData')}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          {permissions.includes(Permissions.AddDiagnosis) && (
            <Button variant="contained" color="primary" onClick={() => setShowDiagnosisModal(true)} style={{ marginTop: '1rem' }}>
              {t('patient.diagnoses.new')}
            </Button>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6">{t('patient.carePlan.label')}</Typography>
          <Paper style={{ overflow: 'hidden' }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('patient.carePlan.title')}</TableCell>
                    <TableCell>{t('patient.carePlan.startDate')}</TableCell>
                    <TableCell>{t('patient.carePlan.endDate')}</TableCell>
                    <TableCell>{t('patient.carePlan.status')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patient.carePlans ? (
                    patient.carePlans.map((carePlan) => (
                      <TableRow key={carePlan.id} hover onClick={() => navigate(`/patients/${patient.id}/care-plans/${carePlan.id}`)} style={{ cursor: 'pointer' }}>
                        <TableCell>{carePlan.title}</TableCell>
                        <TableCell>{formatDate(carePlan.startDate)}</TableCell>
                        <TableCell>{formatDate(carePlan.endDate)}</TableCell>
                        <TableCell>{carePlan.status}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>{t('patient.noData')}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          {permissions.includes(Permissions.AddCarePlan) && (
            <Button variant="contained" color="primary" onClick={() => setShowAddCarePlanModal(true)} style={{ marginTop: '1rem' }}>
              {t('patient.carePlan.new')}
            </Button>
          )}
        </Grid>
      </Grid>

      <NewAllergyModal
        show={showNewAllergyModal}
        onCloseButtonClick={() => setShowNewAllergyModal(false)}
        patientId={patient.id}
      />

      <AddDiagnosisModal
        show={showDiagnosisModal}
        onCloseButtonClick={() => setShowDiagnosisModal(false)}
        patient={patient}
      />

      <AddCarePlanModal
        show={showAddCarePlanModal}
        onCloseButtonClick={() => setShowAddCarePlanModal(false)}
        patient={patient}
      />

      <AddVisitModal
        show={showAddVisitModal}
        onCloseButtonClick={() => setShowAddVisitModal(false)}
        patientId={patient.id}
      />
    </div>
  );
};

export default ImportantPatientInfo;