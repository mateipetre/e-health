import isAfter from 'date-fns/isAfter';
import parseISO from 'date-fns/parseISO';
import validator from 'validator';

// Validate emails and return an array of error messages
const validateEmails = (emails) =>
  (emails || []).map((email) =>
    !validator.isEmail(email.value) ? 'patient.errors.invalidEmail' : undefined
  );

// Validate phone numbers and return an array of error messages
const validatePhoneNumbers = (phoneNumbers) =>
  (phoneNumbers || []).map((phone) =>
    !validator.isMobilePhone(phone.value) ? 'patient.errors.invalidPhoneNumber' : undefined
  );

// Check if the given date is after today
const existAndIsAfterToday = (value) => {
  if (!value) {
    return false;
  }

  const today = new Date(Date.now());
  const dateOfBirth = parseISO(value);

  return isAfter(dateOfBirth, today);
};

// Check if the given value contains numbers
const existAndHasNumbers = (value) => value && /\d/.test(value);

// Define field errors for patient validation
export class PatientValidationError extends Error {
  constructor() {
    super('Patient data is invalid.');
    this.name = 'PatientValidationError';
    this.fieldErrors = {};
  }

  // Return the count of validation errors
  get count() {
    return Object.keys(this.fieldErrors).length;
  }
}

// Validate patient data and return errors if any
export default function validatePatient(patient) {
  const error = new PatientValidationError();

  if (!patient.givenName) {
    error.fieldErrors.givenName = 'patient.errors.patientGivenNameFeedback';
  }

  if (existAndIsAfterToday(patient.dateOfBirth)) {
    error.fieldErrors.dateOfBirth = 'patient.errors.patientDateOfBirthFeedback';
  }

  if (existAndHasNumbers(patient.suffix)) {
    error.fieldErrors.suffix = 'patient.errors.patientNumInSuffixFeedback';
  }

  if (existAndHasNumbers(patient.prefix)) {
    error.fieldErrors.prefix = 'patient.errors.patientNumInPrefixFeedback';
  }

  if (existAndHasNumbers(patient.familyName)) {
    error.fieldErrors.familyName = 'patient.errors.patientNumInFamilyNameFeedback';
  }

  if (existAndHasNumbers(patient.preferredLanguage)) {
    error.fieldErrors.preferredLanguage = 'patient.errors.patientNumInPreferredLanguageFeedback';
  }

  const emailsErrors = validateEmails(patient.emails);
  const phoneNumbersErrors = validatePhoneNumbers(patient.phoneNumbers);

  if (emailsErrors.some(Boolean)) {
    error.fieldErrors.emails = emailsErrors;
  }

  if (phoneNumbersErrors.some(Boolean)) {
    error.fieldErrors.phoneNumbers = phoneNumbersErrors;
  }

  return error.count === 0 ? null : error;
}