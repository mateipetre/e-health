// Define enums using objects
const CarePlanStatus = Object.freeze({
    DRAFT: 'draft',
    ACTIVE: 'active',
    ON_HOLD: 'on hold',
    REVOKED: 'revoked',
    COMPLETED: 'completed',
    UNKNOWN: 'unknown'
  });
  
  const CarePlanIntent = Object.freeze({
    PROPOSAL: 'proposal',
    PLAN: 'plan',
    ORDER: 'order',
    OPTION: 'option'
  });
  
  // Define the CarePlan class
  class CarePlan {
    constructor({
      id,
      status,
      intent,
      title,
      description,
      startDate,
      endDate,
      createdOn,
      diagnosisId,
      note
    }) {
      // Validate and initialize properties
      this.id = id;
  
      if (!Object.values(CarePlanStatus).includes(status)) {
        throw new Error(`Invalid status: ${status}. Allowed values are ${Object.values(CarePlanStatus).join(', ')}`);
      }
      this.status = status;
  
      if (!Object.values(CarePlanIntent).includes(intent)) {
        throw new Error(`Invalid intent: ${intent}. Allowed values are ${Object.values(CarePlanIntent).join(', ')}`);
      }
      this.intent = intent;
  
      this.title = title;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
      this.createdOn = createdOn;
      this.diagnosisId = diagnosisId;
      this.note = note;
    }
  }
  
  module.exports = {
    CarePlan,
    CarePlanStatus,
    CarePlanIntent
  };  