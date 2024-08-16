// Import dependencies
import AbstractDBModel from './AbstractDBModel';

// Define allowed values
const ALLOWED_STATUSES = [
  'draft',
  'active',
  'on hold',
  'canceled',
  'completed',
  'entered in error',
  'stopped',
  'unknown'
];

const ALLOWED_INTENTS = [
  'proposal',
  'plan',
  'order',
  'original order',
  'reflex order',
  'filler order',
  'instance order',
  'option'
];

const ALLOWED_PRIORITIES = ['routine', 'urgent', 'asap', 'stat'];

// Define the Medication class
class Medication extends AbstractDBModel {
  constructor({
    requestedBy,
    requestedOn,
    completedOn,
    canceledOn,
    medication,
    status,
    intent,
    priority,
    patient,
    notes,
    quantity
  }) {
    super(); // Call the parent class's constructor if needed

    // Validate and initialize properties
    this.requestedBy = requestedBy;
    this.requestedOn = requestedOn;
    this.completedOn = completedOn;
    this.canceledOn = canceledOn;
    this.medication = medication;

    // Validate status
    if (!ALLOWED_STATUSES.includes(status)) {
      throw new Error(`Invalid status: ${status}. Allowed values are ${ALLOWED_STATUSES.join(', ')}`);
    }
    this.status = status;

    // Validate intent
    if (!ALLOWED_INTENTS.includes(intent)) {
      throw new Error(`Invalid intent: ${intent}. Allowed values are ${ALLOWED_INTENTS.join(', ')}`);
    }
    this.intent = intent;

    // Validate priority
    if (!ALLOWED_PRIORITIES.includes(priority)) {
      throw new Error(`Invalid priority: ${priority}. Allowed values are ${ALLOWED_PRIORITIES.join(', ')}`);
    }
    this.priority = priority;

    this.patient = patient;
    this.notes = notes;

    // Validate quantity
    if (typeof quantity !== 'object' || quantity === null || typeof quantity.value !== 'number' || typeof quantity.unit !== 'string') {
      throw new Error('Quantity must be an object with a numeric value and a string unit');
    }
    this.quantity = quantity;
  }
}

export default Medication;