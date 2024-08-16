const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

function toLocaleString(date) {
  return date.toLocaleString([], options);
}

export function getAppointmentLabel(appointment) {
  if (!appointment) {
    return '';
  }

  const { id, startDateTime, endDateTime } = appointment;

  return startDateTime && endDateTime
    ? `${toLocaleString(new Date(startDateTime))} - ${toLocaleString(new Date(endDateTime))}`
    : id;
}