// Define the Name class
class Name {
    constructor({
      prefix = null,
      givenName = null,
      familyName = null,
      suffix = null,
      fullName = null
    } = {}) {
      // Validate and initialize properties
      if (prefix !== null && typeof prefix !== 'string') {
        throw new Error('prefix must be a string if provided');
      }
      this.prefix = prefix;
  
      if (givenName !== null && typeof givenName !== 'string') {
        throw new Error('givenName must be a string if provided');
      }
      this.givenName = givenName;
  
      if (familyName !== null && typeof familyName !== 'string') {
        throw new Error('familyName must be a string if provided');
      }
      this.familyName = familyName;
  
      if (suffix !== null && typeof suffix !== 'string') {
        throw new Error('suffix must be a string if provided');
      }
      this.suffix = suffix;
  
      if (fullName !== null && typeof fullName !== 'string') {
        throw new Error('fullName must be a string if provided');
      }
      this.fullName = fullName;
    }
  }
  
  export default Name;  