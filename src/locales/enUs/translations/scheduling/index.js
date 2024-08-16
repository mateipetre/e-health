// eslint-disable-next-line import/no-anonymous-default-export
export default {
  scheduling: {
    label: 'Scheduling',
    appointments: {
      label: 'Appointments',
      new: 'New Appointment',
      schedule: 'Appointment Schedule',
      editAppointment: 'Edit Appointment',
      createAppointment: 'Schedule Appointment',
      deleteAppointment: 'Delete Appointment',
      viewAppointment: 'View Appointment',
      updateAppointment: 'Update Appointment',
    },
    appointment: {
      startDate: 'Start Date',
      endDate: 'End Date',
      location: 'Location',
      type: 'Type',
      types: {
        checkup: 'Checkup',
        emergency: 'Emergency',
        followUp: 'Follow Up',
        routine: 'Routine',
        walkIn: 'Walk In',
      },
      errors: {
        createAppointmentError: 'Could not create new appointment.',
        updateAppointmentError: 'Could not update appointment.',
        patientRequired: 'Patient is required.',
        startDateMustBeBeforeEndDate: 'Start Time must be before End Time.',
      },
      reason: 'Reason',
      patient: 'Patient',
      deleteConfirmationMessage: 'Are you sure that you want to delete this appointment?',
      successfullyCreated: 'Successfully created appointment.',
      successfullyDeleted: 'Successfully deleted appointment.',
      successfullyUpdated: 'Successfully updated appointment.',
    },
  },
}
