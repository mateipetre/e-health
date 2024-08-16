// eslint-disable-next-line no-unused-vars
import Diagnosis from '../../model/Diagnosis';

/**
 * Custom error class for diagnosis validation errors.
 */
export class DiagnosisError extends Error {
  constructor(message, name) {
    super(message);
    this.nameError = name;
    Object.setPrototypeOf(this, DiagnosisError.prototype);
  }
}

/**
 * Validates a diagnosis object and returns an error object if validation fails.
 * @param {Partial<Diagnosis>} diagnosis - The diagnosis object to validate.
 * @returns {Object} - An object containing validation errors.
 */
export default function validateDiagnosis(diagnosis) {
  const error = {};

  if (!diagnosis.name) {
    error.name = 'patient.diagnoses.error.nameRequired';
  }

  if (!diagnosis.diagnosisDate) {
    error.diagnosisDate = 'patient.diagnoses.error.dateRequired';
  }

  if (!diagnosis.onsetDate) {
    error.onsetDate = 'patient.diagnoses.error.dateRequired';
  }

  if (!diagnosis.abatementDate) {
    error.abatementDate = 'patient.diagnoses.error.dateRequired';
  }

  if (!diagnosis.status) {
    error.status = 'patient.diagnoses.error.statusRequired';
  }

  return error;
}