import isEmpty from 'lodash/isEmpty';

// Define the LabError class
export class LabError extends Error {
  constructor(message, result, patient, type) {
    super(message);
    this.name = 'LabError';
    this.result = result;
    this.patient = patient;
    this.type = type;
  }
}

// Validate Lab Request
export function validateLabRequest(lab) {
  const errors = {};

  if (!lab.patient) {
    errors.patient = 'labs.requests.error.patientRequired';
  }

  if (!lab.type) {
    errors.type = 'labs.requests.error.typeRequired';
  }

  if (!isEmpty(errors)) {
    return new LabError('labs.requests.error.unableToRequest', errors.result, errors.patient, errors.type);
  }

  return null;
}

// Validate Lab Completion
export function validateLabComplete(lab) {
  if (!lab.result) {
    return new LabError('labs.requests.error.unableToComplete', 'labs.requests.error.resultRequiredToComplete');
  }

  return null;
}