/**
 * Empty function
 */
function nop() {
}

function iterateSync(target, callback, accumulate) {
  if (typeof target !== 'object') throw new Error('target must be an "object" or an "array"');

  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i++) {
      let idx   = i;
      let value = target[i];

      let key        = idx;
      let shouldStop = false;
      let setKey     = (newKey) => {
        key = newKey;
      };

      let stopExecution = () => {
        shouldStop = true;
      };
      let res           = callback(value, idx, setKey, stopExecution);
      if (accumulate) {
        accumulate[key] = res;
      }
      if (shouldStop) return accumulate;
    }
  } else {
    let keys = Object.keys(target);
    for (let i = 0; i < keys.length; i++) {
      let idx           = keys[i];
      let value         = target[idx];
      let key           = idx;
      let shouldStop    = false;
      let setKey        = (newKey) => {
        key = newKey;
      };
      let stopExecution = () => {
        shouldStop = true;
      };
      let res           = callback(value, idx, setKey, stopExecution);
      if (accumulate) {
        if (Array.isArray(accumulate)) {
          accumulate[i] = res;
        } else {
          accumulate[key] = res;
        }
      }
      if (shouldStop) return accumulate;
    }
  }

  return accumulate;
}

async function iterateAsync(target, callback, accumulate) {
  if (typeof target !== 'object') throw new Error('target must be an "object" or an "array"');

  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i++) {
      let idx   = i;
      let value = target[i];

      let key           = idx;
      let shouldStop    = false;
      let setKey        = (newKey) => {
        key = newKey;
      };
      let stopExecution = () => {
        shouldStop = true;
      };
      let res           = await callback(value, idx, setKey, stopExecution);
      if (accumulate) {
        accumulate[key] = res;
      }
      if (shouldStop) return accumulate;
    }
  } else {
    let keys = Object.keys(target);
    for (let i = 0; i < keys.length; i++) {
      let idx           = keys[i];
      let value         = target[idx];
      let shouldStop    = false;
      let key           = idx;
      let setKey        = (newKey) => {
        key = newKey;
      };
      let stopExecution = () => {
        shouldStop = true;
      };
      let res           = await callback(value, idx, setKey, stopExecution);
      if (accumulate) {
        if (Array.isArray(accumulate)) {
          accumulate[i] = res;
        } else {
          accumulate[key] = res;
        }
      }
      if (shouldStop) return accumulate;
    }
  }

  return accumulate;
}


export default {
  nop,
  iterateSync,
  iterateAsync
};