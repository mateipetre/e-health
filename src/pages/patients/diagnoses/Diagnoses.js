import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs';
import Loading from '../../../app-components/Loading';
import useTranslator from '../../../hooks/useTranslator';
import Permissions from '../../../app-components/Permissions';
import usePatient from '../hooks/usePatient';
import AddDiagnosisModal from './AddDiagnosisModal';
import ViewDiagnoses from './ViewDiagnoses';
import ViewDiagnosis from './ViewDiagnosis';

const Diagnoses = () => {
  const { id: patientId } = useParams();
  const { t } = useTranslator();
  const { permissions } = useSelector((state) => state.user);
  const { data, status } = usePatient(patientId);
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);

  const breadcrumbs = [
    {
      i18nKey: 'patient.diagnoses.label',
      location: `/patients/${patientId}/diagnoses`,
    },
  ];
  useAddBreadcrumbs(breadcrumbs);

  const onAddDiagnosisModalClose = () => {
    setShowDiagnosisModal(false);
  };

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error' || !data) {
    // Render an appropriate error message or fallback UI
    return <div>{t('states.error')}: {t('patient.error.unableToLoadPatient')}</div>;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-end">
          {permissions.includes(Permissions.AddDiagnosis) && (
            <Button
              variant="outlined"
              color="success"
              startIcon={<AddIcon />}
              onClick={() => setShowDiagnosisModal(true)}
            >
              {t('patient.diagnoses.new')}
            </Button>
          )}
        </div>
      </div>
      <br />
      <Routes>
        <Route path="/patients/:id/diagnoses" element={<ViewDiagnoses />} />
        <Route path="/patients/:id/diagnoses/:diagnosisId" element={<ViewDiagnosis />} />
      </Routes>
      <AddDiagnosisModal
        show={showDiagnosisModal}
        onCloseButtonClick={onAddDiagnosisModalClose}
        patient={data}
      />
    </>
  );
};

export default Diagnoses;