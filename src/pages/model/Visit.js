// Define VisitStatus as a constant object
import AbstractDBModel from './AbstractDBModel';

export const VisitStatus = Object.freeze({
    Planned: 'planned',
    Arrived: 'arrived',
    Triaged: 'triaged',
    InProgress: 'in progress',
    OnLeave: 'on leave',
    Finished: 'finished',
    Cancelled: 'cancelled',
  });
  

// Define the Visit class
class Visit extends AbstractDBModel {
  constructor({ id, createdAt, updatedAt, startDateTime, endDateTime, type, status, reason, location }) {
    super(); // Call the parent class constructor

    // Validate and initialize properties
    if (typeof id !== 'string') {
      throw new Error('id must be a string');
    }
    this.id = id;

    if (typeof createdAt !== 'string') {
      throw new Error('createdAt must be a string');
    }
    this.createdAt = createdAt;

    if (typeof updatedAt !== 'string') {
      throw new Error('updatedAt must be a string');
    }
    this.updatedAt = updatedAt;

    if (typeof startDateTime !== 'string') {
      throw new Error('startDateTime must be a string');
    }
    this.startDateTime = startDateTime;

    if (typeof endDateTime !== 'string') {
      throw new Error('endDateTime must be a string');
    }
    this.endDateTime = endDateTime;

    if (typeof type !== 'string') {
      throw new Error('type must be a string');
    }
    this.type = type;

    if (!Object.values(VisitStatus).includes(status)) {
      throw new Error(`Invalid status: ${status}. Allowed values are ${Object.values(VisitStatus).join(', ')}`);
    }
    this.status = status;

    if (typeof reason !== 'string') {
      throw new Error('reason must be a string');
    }
    this.reason = reason;

    if (typeof location !== 'string') {
      throw new Error('location must be a string');
    }
    this.location = location;
  }
}

export default Visit;
