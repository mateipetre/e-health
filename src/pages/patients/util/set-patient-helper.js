// eslint-disable-next-line no-unused-vars
import Patient from '../../model/Patient'
import { getPatientName } from './patient-util'

/**
 * Add full name. Get rid of empty phone numbers, emails, and addresses.
 * @param {Patient} patient - The patient object to clean up.
 * @returns {Patient} - The cleaned-up patient object.
 */
const cleanupPatient = (patient) => {
  const newPatient = { ...patient };
  newPatient.visits = newPatient.visits || [];

  const { givenName, familyName, suffix } = patient;
  newPatient.fullName = getPatientName(givenName, familyName, suffix);

  // Contact information keys
  const contactInformationKeys = ['phoneNumbers', 'emails', 'addresses'];

  contactInformationKeys.forEach((key) => {
    if (key in newPatient) {
      const nonEmpty = newPatient[key]
        .filter(({ value }) => value.trim() !== '')
        .map((entry) => {
          const newValue = entry.value.trim();
          if ('type' in entry) {
            return { id: entry.id, value: newValue, type: entry.type };
          }
          return { id: entry.id, value: newValue };
        });

      if (nonEmpty.length > 0) {
        newPatient[key] = nonEmpty;
      } else {
        delete newPatient[key];
      }
    }
  });

  return newPatient;
}

export { cleanupPatient };