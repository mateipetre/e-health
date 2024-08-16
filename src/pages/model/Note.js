// Define the Note class
class Note {
    constructor({ id, date, text, deleted }) {
      // Validate and initialize properties
      if (typeof id !== 'string') {
        throw new Error('id must be a string');
      }
      this.id = id;
  
      if (typeof date !== 'string') {
        throw new Error('date must be a string');
      }
      this.date = date;
  
      if (typeof text !== 'string') {
        throw new Error('text must be a string');
      }
      this.text = text;
  
      if (typeof deleted !== 'boolean') {
        throw new Error('deleted must be a boolean');
      }
      this.deleted = deleted;
    }
  }
  
export default Note;  