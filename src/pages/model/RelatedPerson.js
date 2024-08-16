// Define the RelatedPerson class
class RelatedPerson {
    constructor({ id, patientId, type }) {
      // Validate and initialize properties
      if (typeof id !== 'string') {
        throw new Error('id must be a string');
      }
      this.id = id;
  
      if (typeof patientId !== 'string') {
        throw new Error('patientId must be a string');
      }
      this.patientId = patientId;
  
      if (typeof type !== 'string') {
        throw new Error('type must be a string');
      }
      this.type = type;
    }
  }
  
export default RelatedPerson;  