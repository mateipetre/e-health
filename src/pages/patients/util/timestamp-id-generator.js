import getTime from 'date-fns/getTime';

/**
 * Generates a timestamp ID as a string.
 * @returns {string} - The timestamp ID.
 */
export function getTimestampId() {
  return getTime(new Date()).toString();
}