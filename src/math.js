/**
 * Interpolates value between two intervals
 * @param targetMin {number} target interval left value
 * @param targetMax {number} target interval right value
 * @param inputMin {number} initial interval left value
 * @param inputMax {number} initial interval right value
 * @param value {number} value in initial interval
 * @returns {number} interpolated value
 */
function lerp(targetMin, targetMax, inputMin, inputMax, value) {
  if (inputMin === inputMax) return 0;
  return (targetMin + (value - inputMin) * ((targetMax - targetMin) / (inputMax - inputMin)));
}

/**
 * Interpolates value between two intervals in integers only
 * @param targetMin {number} target interval left value
 * @param targetMax {number} target interval right value
 * @param inputMin {number} initial interval left value
 * @param inputMax {number} initial interval right value
 * @param value {number} value in initial interval
 * @returns {number} interpolated value
 */
function lerpInt(targetMin, targetMax, inputMin, inputMax, value) {
  return Math.floor(lerpInt(targetMin, targetMax, inputMin, inputMax, value));
}


/**
 * Return random value between from and to
 * if no from and to - value is between 0, 1
 * if no to then value is between 0, from
 *
 * @param from {number} from border
 * @param to {number} to border
 * @returns {number} result
 */
function rand(from, to) {
  if (!from && !to) {
    return Math.random();
  }
  if (from && !to) {
    return lerp(0, from, 0, 1, Math.random());
  }
  return lerp(from, to, 0, 1, Math.random());
}

/**
 * Return random value between from and to in integers
 * if no from and to - value is between 0, 1
 * if no to then value is between 0, from
 *
 * @param from {number} from border
 * @param to {number} to border
 * @returns {number} result
 */
function randInt(from, to) {
  return Math.floor(rand(from, to));
}

export default {
  lerp,
  lerpInt,
  rand,
  randInt,
};