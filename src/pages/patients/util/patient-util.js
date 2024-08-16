// Utility function to handle name parts, returning an empty string if undefined
const getNamePartString = (namePart) => {
  if (!namePart) {
    return '';
  }

  return namePart;
};

// Appends a name part to the existing name
const appendNamePart = (name, namePart) =>
  `${name} ${getNamePartString(namePart)}`.trim();

// Constructs the full patient name from given name, family name, and suffix
export function getPatientName(givenName, familyName, suffix) {
  let name = '';
  name = appendNamePart(name, givenName);
  name = appendNamePart(name, familyName);
  name = appendNamePart(name, suffix);
  return name.trim();
}

// Retrieves the patient code, returning an empty string if patient is undefined
export const getPatientCode = (p) => {
  if (p) {
    return p.code;
  }

  return '';
};

// Constructs the full name of the patient from given name, family name, and suffix
export function getPatientFullName(patient) {
  if (!patient) {
    return '';
  }

  return getPatientName(patient.givenName, patient.familyName, patient.suffix);
}