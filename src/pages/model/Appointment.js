import AbstractDBModel from './AbstractDBModel';

// Define the Appointment class with validation
class Appointment extends AbstractDBModel {
  constructor(
    id,
    rev,
    createdAt,
    updatedAt,
    startDateTime,
    endDateTime,
    patient,
    location,
    reason,
    type
  ) {
    super(id, rev, createdAt, updatedAt);

    // Validate and initialize properties
    if (typeof startDateTime !== 'string') {
      throw new Error('startDateTime must be a string');
    }
    if (startDateTime.trim() === '') {
      throw new Error('startDateTime cannot be an empty string');
    }
    this.startDateTime = startDateTime;

    if (typeof endDateTime !== 'string') {
      throw new Error('endDateTime must be a string');
    }
    if (endDateTime.trim() === '') {
      throw new Error('endDateTime cannot be an empty string');
    }
    this.endDateTime = endDateTime;

    if (typeof patient !== 'string') {
      throw new Error('patient must be a string');
    }
    if (patient.trim() === '') {
      throw new Error('patient cannot be an empty string');
    }
    this.patient = patient;

    if (typeof location !== 'string') {
      throw new Error('location must be a string');
    }
    if (location.trim() === '') {
      throw new Error('location cannot be an empty string');
    }
    this.location = location;

    if (typeof reason !== 'string') {
      throw new Error('reason must be a string');
    }
    if (reason.trim() === '') {
      throw new Error('reason cannot be an empty string');
    }
    this.reason = reason;

    if (typeof type !== 'string') {
      throw new Error('type must be a string');
    }
    if (type.trim() === '') {
      throw new Error('type cannot be an empty string');
    }
    this.type = type;
  }
}

export default Appointment;