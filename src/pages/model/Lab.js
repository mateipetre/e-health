// Import dependencies
import AbstractDBModel from './AbstractDBModel';
import Note from './Note';

// Define allowed status values
const ALLOWED_STATUSES = ['requested', 'completed', 'canceled'];

// Define the Lab class
class Lab extends AbstractDBModel {
  constructor({
    code,
    patient,
    type,
    requestedBy,
    notes = [],
    result = null,
    status,
    requestedOn,
    completedOn = null,
    canceledOn = null,
    visitId = null
  }) {
    super(); // Call the parent class's constructor if needed

    // Validate and initialize properties
    if (typeof code !== 'string') {
      throw new Error('code must be a string');
    }
    this.code = code;

    if (typeof patient !== 'string') {
      throw new Error('patient must be a string');
    }
    this.patient = patient;

    if (typeof type !== 'string') {
      throw new Error('type must be a string');
    }
    this.type = type;

    if (typeof requestedBy !== 'string') {
      throw new Error('requestedBy must be a string');
    }
    this.requestedBy = requestedBy;

    if (!Array.isArray(notes) || !notes.every(note => note instanceof Note)) {
      throw new Error('notes must be an array of Note instances');
    }
    this.notes = notes;

    if (result !== null && typeof result !== 'string') {
      throw new Error('result must be a string if provided');
    }
    this.result = result;

    if (!ALLOWED_STATUSES.includes(status)) {
      throw new Error(`Invalid status: ${status}. Allowed values are ${ALLOWED_STATUSES.join(', ')}`);
    }
    this.status = status;

    if (typeof requestedOn !== 'string') {
      throw new Error('requestedOn must be a string');
    }
    this.requestedOn = requestedOn;

    if (completedOn !== null && typeof completedOn !== 'string') {
      throw new Error('completedOn must be a string if provided');
    }
    this.completedOn = completedOn;

    if (canceledOn !== null && typeof canceledOn !== 'string') {
      throw new Error('canceledOn must be a string if provided');
    }
    this.canceledOn = canceledOn;

    if (visitId !== null && typeof visitId !== 'string') {
      throw new Error('visitId must be a string if provided');
    }
    this.visitId = visitId;
  }
}

export default Lab;