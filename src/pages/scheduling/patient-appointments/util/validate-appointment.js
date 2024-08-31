import isBefore from 'date-fns/isBefore';

class AppointmentError extends Error {
  constructor(patient, startDateTime, message) {
    super(message);
    this.patient = patient;
    this.startDateTime = startDateTime;
    Object.setPrototypeOf(this, AppointmentError.prototype);
  }
}

function validateAppointment(appointment) {
  const newError = {};

  if (!appointment.patient) {
    newError.patient = 'scheduling.appointment.errors.patientRequired';
  }
  if (isBefore(new Date(appointment.endDateTime), new Date(appointment.startDateTime))) {
    newError.startDateTime = 'scheduling.appointment.errors.startDateMustBeBeforeEndDate';
  }

  return newError;
}

export { AppointmentError, validateAppointment as default };