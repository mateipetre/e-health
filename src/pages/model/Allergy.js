// Define the Allergy class with validation
class Allergy {
    constructor(id, name) {
      // Validate and initialize properties
      if (typeof id !== 'string') {
        throw new Error('id must be a string');
      }
      if (id.trim() === '') {
        throw new Error('id cannot be an empty string');
      }
      this.id = id;
  
      if (typeof name !== 'string') {
        throw new Error('name must be a string');
      }
      if (name.trim() === '') {
        throw new Error('name cannot be an empty string');
      }
      this.name = name;
    }
  }
  
  export default Allergy;  