import isBefore from 'date-fns/isBefore';
// eslint-disable-next-line no-unused-vars
import CarePlan from '../../model/CarePlan';

/**
 * Custom error class for care plan validation errors.
 */
export class CarePlanError extends Error {
  constructor(
    message,
    title,
    description,
    status,
    intent,
    startDate,
    endDate,
    note,
    condition
  ) {
    super(message);
    this.message = message;
    this.title = title;
    this.description = description;
    this.status = status;
    this.intent = intent;
    this.startDate = startDate;
    this.endDate = endDate;
    this.note = note;
    this.condition = condition;
  }
}

/**
 * Validates a care plan object and returns an error object if validation fails.
 * @param {Partial<CarePlan>} carePlan - The care plan object to validate.
 * @returns {Object} - An object containing validation errors.
 */
export default function validateCarePlan(carePlan) {
  const error = {};

  if (!carePlan.title) {
    error.title = 'patient.carePlan.error.titleRequired';
  }

  if (!carePlan.description) {
    error.description = 'patient.carePlan.error.descriptionRequired';
  }

  if (!carePlan.status) {
    error.status = 'patient.carePlan.error.statusRequired';
  }

  if (!carePlan.intent) {
    error.intent = 'patient.carePlan.error.intentRequired';
  }

  if (!carePlan.startDate) {
    error.startDate = 'patient.carePlan.error.startDateRequired';
  }

  if (!carePlan.endDate) {
    error.endDate = 'patient.carePlan.error.endDateRequired';
  }

  if (carePlan.startDate && carePlan.endDate) {
    if (isBefore(new Date(carePlan.endDate), new Date(carePlan.startDate))) {
      error.endDate = 'patient.carePlan.error.endDateMustBeAfterStartDate';
    }
  }

  if (!carePlan.diagnosisId) {
    error.condition = 'patient.carePlan.error.conditionRequired';
  }

  return error;
}
