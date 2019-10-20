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

      let key    = idx;
      let setKey = (newKey) => {
        key = newKey;
      };
      let res    = callback(value, idx, setKey);
      if (accumulate) {
        accumulate[key] = res;
      }
    }
  } else {
    let keys = Object.keys(target);
    for (let i = 0; i < keys.length; i++) {
      let idx    = keys[i];
      let value  = target[idx];
      let key    = idx;
      let setKey = (newKey) => {
        key = newKey;
      };
      let res    = callback(value, idx, setKey);
      if (accumulate) {
        if (Array.isArray(accumulate)) {
          accumulate[i] = res;
        } else {
          accumulate[key] = res;
        }
      }
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

      let key    = idx;
      let setKey = (newKey) => {
        key = newKey;
      };
      let res    = await callback(value, idx, setKey);
      if (accumulate) {
        accumulate[key] = res;
      }
    }
  } else {
    let keys = Object.keys(target);
    for (let i = 0; i < keys.length; i++) {
      let idx    = keys[i];
      let value  = target[idx];
      let key    = idx;
      let setKey = (newKey) => {
        key = newKey;
      };
      let res    = await callback(value, idx, setKey);
      if (accumulate) {
        if (Array.isArray(accumulate)) {
          accumulate[i] = res;
        } else {
          accumulate[key] = res;
        }
      }
    }
  }

  return accumulate;
}


export default {
  nop,
  iterateSync,
  iterateAsync
};