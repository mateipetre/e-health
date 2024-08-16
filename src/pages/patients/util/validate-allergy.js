// eslint-disable-next-line no-unused-vars
import Allergy from '../../model/Allergy';

/**
 * Custom error class for allergy validation errors.
 */
export class AllergyError extends Error {
  constructor(message, name) {
    super(message);
    this.nameError = name;
    Object.setPrototypeOf(this, AllergyError.prototype);
  }
}

/**
 * Validates an allergy object and returns an error object if validation fails.
 * @param {Partial<Allergy>} allergy - The allergy object to validate.
 * @returns {Object} - An object containing validation errors.
 */
export default function validateAllergy(allergy) {
  const error = {};
  if (!allergy.name) {
    error.nameError = 'patient.allergies.error.nameRequired';
  }

  return error;
}