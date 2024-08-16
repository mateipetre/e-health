import isBefore from 'date-fns/isBefore';

export class VisitError extends Error {
  constructor(message, name) {
    super(message);
    this.nameError = name;
    Object.setPrototypeOf(this, VisitError.prototype);
  }
}

export default function validateVisit(visit) {
  const error = {};

  if (!visit.startDateTime) {
    error.startDateTime = 'patient.visits.error.startDateRequired';
  }

  if (!visit.endDateTime) {
    error.endDateTime = 'patient.visits.error.endDateRequired';
  }

  if (!visit.type) {
    error.status = 'patient.visits.error.typeRequired';
  }

  if (visit.startDateTime && visit.endDateTime) {
    if (isBefore(new Date(visit.endDateTime), new Date(visit.startDateTime))) {
      error.endDateTime = 'patient.visits.error.endDateMustBeAfterStartDate';
    }
  }

  if (!visit.status) {
    error.status = 'patient.visits.error.statusRequired';
  }

  if (!visit.reason) {
    error.status = 'patient.visits.error.reasonRequired';
  }

  if (!visit.location) {
    error.status = 'patient.visits.error.locationRequired';
  }

  return error;
}
