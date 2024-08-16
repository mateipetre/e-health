import isBefore from 'date-fns/isBefore';
// eslint-disable-next-line no-unused-vars
import CareGoal from '../../model/CareGoal';

/**
 * Custom error class for care goal validation errors.
 */
export class CareGoalError extends Error {
  constructor(
    message,
    description,
    status,
    achievementStatus,
    priority,
    startDate,
    dueDate
  ) {
    super(message);
    this.message = message;
    this.description = description;
    this.status = status;
    this.achievementStatus = achievementStatus;
    this.priority = priority;
    this.startDate = startDate;
    this.dueDate = dueDate;
  }
}

/**
 * Validates a care goal object and returns an error object if validation fails.
 * @param {Partial<CareGoal>} careGoal - The care goal object to validate.
 * @returns {Object} - An object containing validation errors.
 */
export default function validateCareGoal(careGoal) {
  const error = {};

  if (!careGoal.description) {
    error.description = 'patient.careGoal.error.descriptionRequired';
  }

  if (!careGoal.status) {
    error.status = 'patient.careGoal.error.statusRequired';
  }

  if (!careGoal.achievementStatus) {
    error.achievementStatus = 'patient.careGoal.error.achievementStatusRequired';
  }

  if (!careGoal.priority) {
    error.priority = 'patient.careGoal.error.priorityRequired';
  }

  if (!careGoal.startDate) {
    error.startDate = 'patient.careGoal.error.startDate';
  }

  if (!careGoal.dueDate) {
    error.dueDate = 'patient.careGoal.error.dueDate';
  }

  if (careGoal.startDate && careGoal.dueDate) {
    if (isBefore(new Date(careGoal.dueDate), new Date(careGoal.startDate))) {
      error.dueDate = 'patient.careGoal.error.dueDateMustBeAfterStartDate';
    }
  }

  return error;
}