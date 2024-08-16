// Define HistoryRecordType as a constant object
const HistoryRecordType = {
    APPOINTMENT: 'Appointment',
    LAB: 'Lab',
  };
  
  Object.freeze(HistoryRecordType); // Ensure the object is immutable

// Define the PatientHistoryRecord class
class PatientHistoryRecord {
  constructor({ id, date, type, info, recordId }) {
    // Validate and initialize properties
    if (typeof id !== 'string') {
      throw new Error('id must be a string');
    }
    this.id = id;

    if (!(date instanceof Date)) {
      throw new Error('date must be a Date object');
    }
    this.date = date;

    if (!Object.values(HistoryRecordType).includes(type)) {
      throw new Error(`Invalid type: ${type}. Allowed values are ${Object.values(HistoryRecordType).join(', ')}`);
    }
    this.type = type;

    if (typeof info !== 'string') {
      throw new Error('info must be a string');
    }
    this.info = info;

    if (typeof recordId !== 'string') {
      throw new Error('recordId must be a string');
    }
    this.recordId = recordId;
  }
}

module.exports = { PatientHistoryRecord, HistoryRecordType };
