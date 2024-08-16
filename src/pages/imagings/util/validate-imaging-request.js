const statusType = ['requested', 'completed', 'canceled'];

class ImagingRequestError extends Error {
  constructor(message, patient, type, status) {
    super(message);
    this.patient = patient;
    this.type = type;
    this.status = status;
    Object.setPrototypeOf(this, ImagingRequestError.prototype);
  }
}

function validateImagingRequest(request) {
  const imagingRequestError = {};
  if (!request.patient) {
    imagingRequestError.patient = 'imagings.requests.error.patientRequired';
  }

  if (!request.type) {
    imagingRequestError.type = 'imagings.requests.error.typeRequired';
  }

  if (!request.status) {
    imagingRequestError.status = 'imagings.requests.error.statusRequired';
  } else if (!statusType.includes(request.status)) {
    imagingRequestError.status = 'imagings.requests.error.incorrectStatus';
  }

  return imagingRequestError;
}

export { ImagingRequestError, validateImagingRequest };