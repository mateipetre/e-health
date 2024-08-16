import { HistoryRecordType } from '../../../model/PatientHistoryRecord';

// Convert Lab object to PatientHistoryRecord array
export const convertLab = (lab) => {
  const labEvents = [];
  
  if (lab.requestedOn) {
    labEvents.push({
      date: new Date(lab.requestedOn),
      type: HistoryRecordType.LAB,
      info: `Requested - ${lab.type}`,
      recordId: lab.id,
      id: `requestedLab${lab.id}`,
    });
  }
  
  if (lab.canceledOn) {
    labEvents.push({
      date: new Date(lab.canceledOn),
      type: HistoryRecordType.LAB,
      info: `Canceled - ${lab.type}`,
      recordId: lab.id,
      id: `canceledLab${lab.id}`,
    });
  } else if (lab.completedOn) {
    labEvents.push({
      date: new Date(lab.completedOn),
      type: HistoryRecordType.LAB,
      info: `Completed - ${lab.type}`,
      recordId: lab.id,
      id: `completedLab${lab.id}`,
    });
  }
  
  return labEvents;
};

// Convert Appointment object to PatientHistoryRecord array
export const convertAppointment = (appt) => {
  const apptEvents = [];
  
  if (appt.startDateTime) {
    apptEvents.push({
      date: new Date(appt.startDateTime),
      type: HistoryRecordType.APPOINTMENT,
      info: `Started - ${appt.type}`,
      recordId: appt.id,
      id: `startedAppt${appt.id}`,
    });
  }
  
  if (appt.endDateTime) {
    apptEvents.push({
      date: new Date(appt.endDateTime),
      type: HistoryRecordType.APPOINTMENT,
      info: `Ended - ${appt.type}`,
      recordId: appt.id,
      id: `endedAppt${appt.id}`,
    });
  }
  
  return apptEvents;
};