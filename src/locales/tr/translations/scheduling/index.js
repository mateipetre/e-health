// eslint-disable-next-line import/no-anonymous-default-export
export default {
  scheduling: {
    label: 'Planlama',
    appointments: {
      label: 'Randevular',
      new: 'Yeni Randevu Oluştur',
      schedule: 'Randevuyu Planla',
      editAppointment: 'Randevuyu Düzenle',
      createAppointment: 'Randevuyu Kaydet',
      deleteAppointment: 'Randevuyu Sil',
      viewAppointment: 'Randevuyu Görüntüle',
      updateAppointment: 'Randevuyu Güncelle',
    },
    appointment: {
      startDate: 'Başlangıç Zamanı',
      endDate: 'Bitiş Zamanı',
      location: 'Yer',
      type: 'Tür',
      types: {
        checkup: 'Check-up',
        emergency: 'Acil',
        followUp: 'Kontrol',
        routine: 'Rutin',
        walkIn: 'Rezervasyonsuz',
      },
      errors: {
        createAppointmentError: 'Randevu kaydı oluşturulamıyor!',
        updateAppointmentError: 'Randevu kaydı güncellenemiyor.',
        patientRequired: 'Hasta alanı zorunludur.',
        startDateMustBeBeforeEndDate: 'Başlangıç zamanı Bitiş zamanından önce olmalıdır.',
      },
      reason: 'Gerekçe',
      patient: 'Hasta',
      deleteConfirmationMessage: 'Bu randevu kaydını silmek istediğinize emin misiniz?',
      successfullyCreated: 'Randevu kaydı başarılı bir şekilde oluşturuldu.',
      successfullyDeleted: 'Randevu kaydı başarılı bir şekilde silindi.',
      successfullyUpdated: 'Randevu kaydı başarılı bir şekilde güncellendi.',
    },
  },
}
