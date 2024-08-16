import { convertLab, convertAppointment } from './helpers';

// Convert an array of Lab objects to an array of PatientHistoryRecord objects
const mapLabs = (labs) => {
  if (!labs) {
    return [];
  }

  let flattenedRecords = [];
  labs.forEach((lab) => {
    flattenedRecords = flattenedRecords.concat(convertLab(lab));
  });

  return flattenedRecords;
};

// Convert an array of Appointment objects to an array of PatientHistoryRecord objects
const mapAppointments = (appointments) => {
  if (!appointments) {
    return [];
  }

  let flattenedRecords = [];
  appointments.forEach((appt) => {
    flattenedRecords = flattenedRecords.concat(convertAppointment(appt));
  });

  return flattenedRecords;
};

// Combine and sort history records from labs and appointments
export const mapHistoryRecords = (labs, appointments) => {
  const labRecords = mapLabs(labs);
  const appointmentRecords = mapAppointments(appointments);

  const result = labRecords.concat(appointmentRecords);
  result.sort((a, b) => b.date.getTime() - a.date.getTime());

  return result;
};