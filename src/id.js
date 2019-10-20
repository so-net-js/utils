import Uuid from 'uuid/v1';
import Nano from 'nanoid';


/**
 * Generates UUID
 * @returns {string}
 */
function uuid() {
  return Uuid();
}

/**
 * Generates NANO ID
 * @returns {string}
 */
function nano() {
  return Nano();
}

export default {
  uuid,
  nano
};