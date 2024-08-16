// eslint-disable-next-line no-unused-vars
import Note from '../../model/Note';

/**
 * Custom error class for note validation errors.
 */
export class NoteError extends Error {
  constructor(message, note) {
    super(message);
    this.noteError = note;
    Object.setPrototypeOf(this, NoteError.prototype);
  }
}

/**
 * Validates a note object and returns an error object if validation fails.
 * @param {Partial<Note>} note - The note object to validate.
 * @returns {Object} - An object containing validation errors.
 */
export default function validateNote(note) {
  const error = {};

  if (!note.text) {
    error.noteError = 'patient.notes.error.noteRequired';
  }

  return error;
}