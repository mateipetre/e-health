import Name from './Name';

// Define the User class
class User extends Name {
  constructor({ id, ...nameProps }) {
    super(nameProps); // Call the parent class constructor

    // Validate and initialize properties
    if (typeof id !== 'string') {
      throw new Error('id must be a string');
    }
    this.id = id;
  }
}

export default User;