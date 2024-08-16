// Define the ContactInfoPiece class
class ContactInfoPiece {
    constructor({ id, value, type }) {
      if (typeof id !== 'string') {
        throw new Error('id must be a string');
      }
      if (typeof value !== 'string') {
        throw new Error('value must be a string');
      }
      if (type !== undefined && typeof type !== 'string') {
        throw new Error('type must be a string if provided');
      }
  
      this.id = id;
      this.value = value;
      this.type = type;
    }
  }

  // Define the ContactInformation class
class ContactInformation {
    constructor({ phoneNumbers, emails, addresses }) {
      // Validate phoneNumbers
      if (!Array.isArray(phoneNumbers) || !phoneNumbers.every(item => item instanceof ContactInfoPiece)) {
        throw new Error('phoneNumbers must be an array of ContactInfoPiece objects');
      }
      this.phoneNumbers = phoneNumbers;
  
      // Validate emails
      if (!Array.isArray(emails) || !emails.every(item => item instanceof ContactInfoPiece)) {
        throw new Error('emails must be an array of ContactInfoPiece objects');
      }
      this.emails = emails;
  
      // Validate addresses
      if (!Array.isArray(addresses) || !addresses.every(item => item instanceof ContactInfoPiece)) {
        throw new Error('addresses must be an array of ContactInfoPiece objects');
      }
      this.addresses = addresses;
    }
  }
  
  module.exports = {
    ContactInfoPiece,
    ContactInformation
  };  