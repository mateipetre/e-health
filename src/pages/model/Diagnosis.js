// Define DiagnosisStatus enum using an object
const DiagnosisStatus = Object.freeze({
    ACTIVE: 'active',
    RECURRENCE: 'recurrence',
    RELAPSE: 'relapse',
    INACTIVE: 'inactive',
    REMISSION: 'remission',
    RESOLVED: 'resolved'
  });

// Define the Diagnosis class
class Diagnosis {
    constructor({
      id,
      name,
      diagnosisDate,
      onsetDate,
      abatementDate,
      status,
      note,
      visit
    }) {
      // Validate and initialize properties
      if (typeof id !== 'string') {
        throw new Error('id must be a string');
      }
      this.id = id;
  
      if (typeof name !== 'string') {
        throw new Error('name must be a string');
      }
      this.name = name;
  
      if (typeof diagnosisDate !== 'string') {
        throw new Error('diagnosisDate must be a string');
      }
      this.diagnosisDate = diagnosisDate;
  
      if (typeof onsetDate !== 'string') {
        throw new Error('onsetDate must be a string');
      }
      this.onsetDate = onsetDate;
  
      if (typeof abatementDate !== 'string') {
        throw new Error('abatementDate must be a string');
      }
      this.abatementDate = abatementDate;
  
      if (!Object.values(DiagnosisStatus).includes(status)) {
        throw new Error(`Invalid status: ${status}. Allowed values are ${Object.values(DiagnosisStatus).join(', ')}`);
      }
      this.status = status;
  
      if (typeof note !== 'string') {
        throw new Error('note must be a string');
      }
      this.note = note;
  
      if (typeof visit !== 'string') {
        throw new Error('visit must be a string');
      }
      this.visit = visit;
    }
  }
  
  module.exports = {
    Diagnosis,
    DiagnosisStatus
  };
  