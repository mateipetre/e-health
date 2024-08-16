// Import dependencies
import AbstractDBModel from './AbstractDBModel';

// Define allowed status values
const ALLOWED_STATUSES = ['requested', 'completed', 'canceled'];

// Define the Imaging class
class Imaging extends AbstractDBModel {
  constructor({
    code,
    patient,
    fullName,
    type,
    status,
    visitId,
    requestedOn,
    requestedBy,
    requestedByFullName = null,
    completedOn = null,
    canceledOn = null,
    notes = null
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

    if (typeof fullName !== 'string') {
      throw new Error('fullName must be a string');
    }
    this.fullName = fullName;

    if (typeof type !== 'string') {
      throw new Error('type must be a string');
    }
    this.type = type;

    if (!ALLOWED_STATUSES.includes(status)) {
      throw new Error(`Invalid status: ${status}. Allowed values are ${ALLOWED_STATUSES.join(', ')}`);
    }
    this.status = status;

    if (typeof visitId !== 'string') {
      throw new Error('visitId must be a string');
    }
    this.visitId = visitId;

    if (typeof requestedOn !== 'string') {
      throw new Error('requestedOn must be a string');
    }
    this.requestedOn = requestedOn;

    if (typeof requestedBy !== 'string') {
      throw new Error('requestedBy must be a string');
    }
    this.requestedBy = requestedBy;

    if (requestedByFullName !== null && typeof requestedByFullName !== 'string') {
      throw new Error('requestedByFullName must be a string if provided');
    }
    this.requestedByFullName = requestedByFullName;

    if (completedOn !== null && typeof completedOn !== 'string') {
      throw new Error('completedOn must be a string if provided');
    }
    this.completedOn = completedOn;

    if (canceledOn !== null && typeof canceledOn !== 'string') {
      throw new Error('canceledOn must be a string if provided');
    }
    this.canceledOn = canceledOn;

    if (notes !== null && typeof notes !== 'string') {
      throw new Error('notes must be a string if provided');
    }
    this.notes = notes;
  }
}

export default Imaging;