// eslint-disable-next-line import/no-anonymous-default-export
export default {
  patient: {
    label: 'Hasta',
    code: 'Hasta Kodu',
    firstName: 'İsim',
    lastName: 'Soyisim',
    suffix: 'Son ek',
    prefix: 'Ünvan',
    givenName: 'İsim',
    familyName: 'Soyisim',
    dateOfBirth: 'Doğum Tarihi',
    approximateDateOfBirth: 'Yaklaşık Doğum Tarihi',
    age: 'Yaş',
    approximateAge: 'Yaklaşık Yaş',
    placeOfBirth: 'Doğum Yeri',
    sex: 'Cinsiyet',
    bloodType: 'Kan Grubu',
    contactInfoType: {
      label: 'Türü',
      options: {
        home: 'Ev',
        mobile: 'Mobil',
        work: 'İş',
        temporary: 'Geçici',
        old: 'Eski',
      },
    },
    phoneNumber: 'Telefon Numarası',
    email: 'Email',
    address: 'Adres',
    occupation: 'Meslek',
    type: 'Hasta Tipi',
    preferredLanguage: 'Tercih Edilen Dil',
    basicInformation: 'Temel Bilgi',
    generalInformation: 'Genel Bilgi',
    contactInformation: 'İletişim Bilgisi',
    unknownDateOfBirth: 'Doğum Tarihi Bilinmiyor',
    relatedPerson: 'Akraba',
    relatedPersons: {
      error: {
        unableToAddRelatedPerson: 'Akraba kısmına yeni kişi eklenemiyor.',
        relatedPersonRequired: 'Akraba alanı gereklidir.',
        relationshipTypeRequired: 'Akrabalık türü gereklidir.',
      },
      label: 'Akraba',
      new: 'Yeni Akraba',
      add: 'Akrabayı Ekle',
      relationshipType: 'Akrabalık Türü',
      warning: {
        noRelatedPersons: 'Akraba bulunamadı.',
      },
      addRelatedPersonAbove: 'Üstteki buton ile yeni akraba ekleyebilirsiniz.',
    },
    appointments: {
      new: 'Yeni Randevu Ekle',
      warning: {
        noAppointments: 'Randevu Yok',
      },
      addAppointmentAbove: 'Üstteki buton ile yeni randevu ekleyebilirsiniz.',
    },
    allergies: {
      label: 'Alerjiler',
      allergyName: 'Alerji Adı',
      new: 'Yeni Alerji Ekle',
      error: {
        nameRequired: 'Ad girilmesi zorunludur.',
        unableToAdd: 'Alerji eklenemiyor.',
      },
      warning: {
        noAllergies: 'Alerji kaydı yok.',
      },
      addAllergyAbove: 'Üstteki buton ile yeni alerji ekleyebilirsiniz.',
      successfullyAdded: 'Yeni alerji kaydı başarılı bir şekilde eklendi!',
    },
    diagnoses: {
      label: 'Tanılar',
      new: 'Yeni Tanı Ekle',
      diagnosisName: 'Tanı Adı',
      diagnosisDate: 'Tanı Eklenme Tarihi',
      onsetDate: 'Başlangıç Tarihi',
      abatementDate: 'Azalma Tarihi',
      visit: 'Ziyaret',
      status: 'Durum',
      active: 'Aktif',
      recurrence: 'Nüksetme',
      relapse: 'Kötüleşme',
      inactive: 'Pasif',
      remission: 'Hafifleme',
      resolved: 'Tedavi Edildi',
      note: 'Not',
      warning: {
        noDiagnoses: 'Tanı kaydı bulunamadı.',
      },
      error: {
        nameRequired: 'Tanı Adı girilmesi zorunludur.',
        dateRequired: 'Tanı Ekleme Tarihi girilmesi zorunludur.',
        unableToAdd: 'Yeni tanı eklenemiyor.',
      },
      addDiagnosisAbove: 'Üstteki buton ile yeni tanı ekleyebilirsiniz.',
      successfullyAdded: 'Yeni tanı kaydı başarılı bir şekilde eklendi!',
    },
    note: 'Not',
    notes: {
      label: 'Notlar',
      new: 'Yeni Not Ekle',
      warning: {
        noNotes: 'Not bulunamadı.',
      },
      error: {
        noteRequired: 'Not kısmı doldurulması zorunludur.',
        unableToAdd: 'Yeni not eklenemiyor.',
      },
      addNoteAbove: 'Üstteki buton ile yeni not ekleyebilirsiniz.',
    },
    labs: {
      label: 'Laboratuvarlar',
      new: 'Yeni Laboratuvar Ekle',
      warning: {
        noLabs: 'Laboratuvar bulunamadı.',
      },
      noLabsMessage: 'Bu hasta için Laboratuvar kaydı bulunamadı.',
    },
    medications: {
      label: 'İlaçlar',
      new: 'Yeni İlaç Ekle',
      warning: {
        noMedications: 'İlaç bulunamadı.',
      },
      noMedicationsMessage: 'Bu hasta için İlaç kaydı bulunamadı.',
    },
    careGoal: {
      new: 'Yeni Tedavi Hedefi Ekle',
      label: 'Tedavi Hedefleri',
      title: 'Başlık',
      description: 'Açıklama',
      status: 'Durum',
      achievementStatus: 'Başarı Durumu',
      priority: {
        label: 'Öncelik',
        low: 'düşük',
        medium: 'orta',
        high: 'yüksek',
      },
      startDate: 'Başlangıç Zamanı',
      dueDate: 'Planlanan Bitiş Zamanı',
      note: 'Not',
      error: {
        unableToAdd: 'Yeni tedavi hedefi eklenemiyor.',
        descriptionRequired: 'Açıklama alanının doldurulması zorunludur.',
        priorityRequired: 'Öncelik bilgisinin girilmesi zorunludur.',
        statusRequired: 'Durum bilgisinin girilmesi zorunludur.',
        achievementStatusRequired: 'Başarı Durumu bilgisinin girilmesi zorunludur.',
        startDate: 'Başlangıç Zamanı bilgisinin girilmesi zorunludur.',
        dueDate: 'Planlanan Bitiş Zamanı bilgisinin girilmesi zorunludur.',
        dueDateMustBeAfterStartDate:
          'Planlanan Bitiş Zamanı Başlangıç Zamanından sonra olmak zorundadır.',
      },
    },
    careGoals: {
      warning: {
        noCareGoals: 'Tedavi Hedefi Yok.',
        addCareGoalAbove: 'Üstteki buton ile yeni tedavi hedefi ekleyebilirsiniz.',
      },
    },
    carePlan: {
      new: 'Yeni Tedavi Planı Ekle',
      label: 'Tedavi Planları',
      title: 'Başlık',
      description: 'Açıklama',
      status: 'Durum',
      condition: 'Şart',
      intent: 'Amaç',
      startDate: 'Başlangıç Zamanı',
      endDate: 'Bitiş Zamanı',
      note: 'Not',
      error: {
        unableToAdd: 'Yeni tedavi planı eklenemiyor.',
        titleRequired: 'Başlık bilgisinin girilmesi zorunludur.',
        descriptionRequired: 'Açıklama bilgisinin girilmesi zorunludur.',
        conditionRequired: 'Şart bilgisinin girilmesi zorunludur.',
        statusRequired: 'Durum bilgisinin girilmesi zorunludur.',
        intentRequired: 'Amaç bilgisinin girilmesi zorunludur.',
        startDate: 'Başlangıç zamanı bilgisinin girilmesi zorunludur.',
        endDate: 'Bitiş zamanı bilgisinin girilmesi zorunludur',
      },
    },
    carePlans: {
      warning: {
        noCarePlans: 'Tedavi Planı Yok',
        addCarePlanAbove: 'Üstteki buton ile yeni tedavi planı ekleyebilirsiniz.',
      },
    },
    visit: 'Muayene',
    visits: {
      new: 'Yeni Muayene Ekle',
      label: 'Muayeneler',
      startDateTime: 'Başlangıç Zamanı',
      endDateTime: 'Bitiş Zamanı',
      type: 'Tür',
      status: 'Durum',
      reason: 'Gerekçe',
      location: 'Yer',
      error: {
        unableToAdd: 'Yeni muayene eklenemiyor.',
        startDateRequired: 'Başlangıç tarihi bilgisinin girilmesi zorunludur.',
        endDateRequired: 'Bitiş tarihi bilgisinin girilmesi zorunludur.',
        endDateMustBeAfterStartDate: 'Bitiş tarihi Başlangıç tarihinden sonra olmalıdır.',
        typeRequired: 'Tür bilgisinin girilmesi zorunludur.',
        statusRequired: 'Durum bilgisinin girilmesi zorunludur.',
        reasonRequired: 'Gerekçe bilgisinin girilmesi zorunludur.',
        locationRequired: 'Yer bilgisinin girilmesi zorunludur.',
      },
      warning: {
        noVisits: 'Muayene Yok',
        addVisitAbove: 'Üstteki buton ile yeni muayene ekleyebilirsiniz.',
      },
    },
    types: {
      charity: 'Ücretsiz/İndirimli',
      private: 'Özel',
    },
    errors: {
      createPatientError: 'Yeni hasta eklenemiyor.',
      updatePatientError: 'Hasta güncellenemiyor.',
      patientGivenNameFeedback: 'İsim alanı zorunludur.',
      patientDateOfBirthFeedback: 'Doğum Tarihi bugünden büyük olmamalıdır.',
      patientNumInSuffixFeedback: 'Rakam içermemelidir.',
      patientNumInPrefixFeedback: 'Rakam içermemelidir.',
      patientNumInFamilyNameFeedback: 'Rakam içermemelidir.',
      patientNumInPreferredLanguageFeedback: 'Rakam içermemelidir.',
      invalidEmail: 'Email adresi geçerli bir adres olmalıdır.',
      invalidPhoneNumber: 'Telefon numarası geçerli bir numara olmalıdır.',
    },
  },
}
