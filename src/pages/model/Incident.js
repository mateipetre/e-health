// Import dependencies
import AbstractDBModel from './AbstractDBModel';

// Define allowed status values
const ALLOWED_STATUSES = ['reported', 'resolved'];

// Define the Incident class
class Incident extends AbstractDBModel {
  constructor({
    reportedBy,
    reportedOn,
    code,
    date,
    department,
    category,
    categoryItem,
    description,
    status,
    resolvedOn,
    patient = null
  }) {
    super(); // Call the parent class's constructor if needed

    // Validate and initialize properties
    if (typeof reportedBy !== 'string') {
      throw new Error('reportedBy must be a string');
    }
    this.reportedBy = reportedBy;

    if (typeof reportedOn !== 'string') {
      throw new Error('reportedOn must be a string');
    }
    this.reportedOn = reportedOn;

    if (typeof code !== 'string') {
      throw new Error('code must be a string');
    }
    this.code = code;

    if (typeof date !== 'string') {
      throw new Error('date must be a string');
    }
    this.date = date;

    if (typeof department !== 'string') {
      throw new Error('department must be a string');
    }
    this.department = department;

    if (typeof category !== 'string') {
      throw new Error('category must be a string');
    }
    this.category = category;

    if (typeof categoryItem !== 'string') {
      throw new Error('categoryItem must be a string');
    }
    this.categoryItem = categoryItem;

    if (typeof description !== 'string') {
      throw new Error('description must be a string');
    }
    this.description = description;

    if (!ALLOWED_STATUSES.includes(status)) {
      throw new Error(`Invalid status: ${status}. Allowed values are ${ALLOWED_STATUSES.join(', ')}`);
    }
    this.status = status;

    if (typeof resolvedOn !== 'string') {
      throw new Error('resolvedOn must be a string');
    }
    this.resolvedOn = resolvedOn;

    if (patient !== null && typeof patient !== 'string') {
      throw new Error('patient must be a string if provided');
    }
    this.patient = patient;
  }
}

export default Incident;