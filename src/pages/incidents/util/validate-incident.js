import isAfter from 'date-fns/isAfter';

export class IncidentError extends Error {
  constructor(
    message,
    date,
    department,
    category,
    categoryItem,
    description,
  ) {
    super(message);
    this.date = date;
    this.department = department;
    this.category = category;
    this.categoryItem = categoryItem;
    this.description = description;
    Object.setPrototypeOf(this, IncidentError.prototype);
  }
}

export default function validateIncident(incident) {
  const newError = {};

  if (!incident.date) {
    newError.date = 'incidents.reports.error.dateRequired';
  } else if (isAfter(new Date(incident.date), new Date(Date.now()))) {
    newError.date = 'incidents.reports.error.dateMustBeInThePast';
  }

  if (!incident.department) {
    newError.department = 'incidents.reports.error.departmentRequired';
  }

  if (!incident.category) {
    newError.category = 'incidents.reports.error.categoryRequired';
  }

  if (!incident.categoryItem) {
    newError.categoryItem = 'incidents.reports.error.categoryItemRequired';
  }

  if (!incident.description) {
    newError.description = 'incidents.reports.error.descriptionRequired';
  }

  return newError;
}