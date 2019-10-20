/**
 * If awaited sleeps for timeout
 *
 * @param timeout {number} time in ms to sleep
 * @returns {Promise<void>}
 */
async function sleep(timeout = 100) {
  await (new Promise(resolve => setTimeout(resolve, timeout)));
}

export default {
  sleep
};