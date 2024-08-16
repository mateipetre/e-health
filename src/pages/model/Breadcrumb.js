// Define the Breadcrumb class with validation
class Breadcrumb {
    constructor(location, i18nKey = '', text = '') {
      // Validate location
      if (typeof location !== 'string') {
        throw new Error('location must be a string');
      }
      if (location.trim() === '') {
        throw new Error('location cannot be an empty string');
      }
      this.location = location;
  
      // Validate i18nKey
      if (typeof i18nKey !== 'string') {
        throw new Error('i18nKey must be a string');
      }
      this.i18nKey = i18nKey;
  
      // Validate text
      if (typeof text !== 'string') {
        throw new Error('text must be a string');
      }
      this.text = text;
    }
  }

export default Breadcrumb;  