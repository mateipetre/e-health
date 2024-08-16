import AbstractDBModel from './AbstractDBModel';
const Allergy = require('./Allergy').default;
const CareGoal = require('./CareGoal');
const CarePlan = require('./CarePlan');
const Diagnosis = require('./Diagnosis');
const Note = require('./Note');
const RelatedPerson = require('./RelatedPerson');
const Visit = require('./Visit').default;

class Patient extends AbstractDBModel {
    constructor({
      sex,
      dateOfBirth,
      isApproximateDateOfBirth,
      preferredLanguage = null,
      occupation = null,
      type = null,
      code,
      relatedPersons = [],
      allergies = [],
      diagnoses = [],
      notes = [],
      index,
      carePlans = [],
      careGoals = [],
      bloodType,
      visits = []
    }) {
      super(); // Call the parent class's constructor if needed
  
      // Validate and initialize properties
      if (typeof sex !== 'string') {
        throw new Error('sex must be a string');
      }
      this.sex = sex;
  
      if (typeof dateOfBirth !== 'string') {
        throw new Error('dateOfBirth must be a string');
      }
      this.dateOfBirth = dateOfBirth;
  
      if (typeof isApproximateDateOfBirth !== 'boolean') {
        throw new Error('isApproximateDateOfBirth must be a boolean');
      }
      this.isApproximateDateOfBirth = isApproximateDateOfBirth;
  
      if (preferredLanguage !== null && typeof preferredLanguage !== 'string') {
        throw new Error('preferredLanguage must be a string if provided');
      }
      this.preferredLanguage = preferredLanguage;
  
      if (occupation !== null && typeof occupation !== 'string') {
        throw new Error('occupation must be a string if provided');
      }
      this.occupation = occupation;
  
      if (type !== null && typeof type !== 'string') {
        throw new Error('type must be a string if provided');
      }
      this.type = type;
  
      if (typeof code !== 'string') {
        throw new Error('code must be a string');
      }
      this.code = code;
  
      if (!Array.isArray(relatedPersons) || !relatedPersons.every(rp => rp instanceof RelatedPerson)) {
        throw new Error('relatedPersons must be an array of RelatedPerson instances');
      }
      this.relatedPersons = relatedPersons;
  
      if (!Array.isArray(allergies) || !allergies.every(a => a instanceof Allergy)) {
        throw new Error('allergies must be an array of Allergy instances');
      }
      this.allergies = allergies;
  
      if (!Array.isArray(diagnoses) || !diagnoses.every(d => d instanceof Diagnosis)) {
        throw new Error('diagnoses must be an array of Diagnosis instances');
      }
      this.diagnoses = diagnoses;
  
      if (!Array.isArray(notes) || !notes.every(n => n instanceof Note)) {
        throw new Error('notes must be an array of Note instances');
      }
      this.notes = notes;
  
      if (typeof index !== 'string') {
        throw new Error('index must be a string');
      }
      this.index = index;
  
      if (!Array.isArray(carePlans) || !carePlans.every(cp => cp instanceof CarePlan)) {
        throw new Error('carePlans must be an array of CarePlan instances');
      }
      this.carePlans = carePlans;
  
      if (!Array.isArray(careGoals) || !careGoals.every(cg => cg instanceof CareGoal)) {
        throw new Error('careGoals must be an array of CareGoal instances');
      }
      this.careGoals = careGoals;
  
      if (typeof bloodType !== 'string') {
        throw new Error('bloodType must be a string');
      }
      this.bloodType = bloodType;
  
      if (!Array.isArray(visits) || !visits.every(v => v instanceof Visit)) {
        throw new Error('visits must be an array of Visit instances');
      }
      this.visits = visits;
    }
  }
  
export default Patient;  