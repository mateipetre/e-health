export class RelatedPersonError extends Error {
  constructor(message, related, relationship) {
    super(message);
    this.relatedPersonError = related;
    this.relationshipTypeError = relationship;
    Object.setPrototypeOf(this, RelatedPersonError.prototype);
  }
}

export default function validateRelatedPerson(relatedPerson) {
  const error = {};

  if (!relatedPerson.patientId) {
    error.relatedPersonError = 'patient.relatedPersons.error.relatedPersonRequired';
  }

  if (!relatedPerson.type) {
    error.relationshipTypeError = 'patient.relatedPersons.error.relationshipTypeRequired';
  }

  return error;
}