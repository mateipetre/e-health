
// Check if the new patient might be a duplicate of an existing patient
export function isPossibleDuplicatePatient(newPatient, existingPatient) {
  return (
    newPatient.givenName === existingPatient.givenName &&
    newPatient.familyName === existingPatient.familyName &&
    newPatient.sex === existingPatient.sex &&
    newPatient.dateOfBirth === existingPatient.dateOfBirth
  );
}