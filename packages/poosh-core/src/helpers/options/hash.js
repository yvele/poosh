import forOwn from "lodash/forOwn";
import sortBy from "lodash/sortBy";
import { crc32 } from "crc";

const EMPTY_HASH = "0000000";

/**
 * Get object's hash that will be used to compare local and cache versions.
 * Hash is performed regardless of keys order.
 * Hash ignores undefined and null values.
 * Hash is NOT performed deeply.
 *
 * @param object A flat object with string values.
 * @returns Hash as a string.
 */
export default function hash(object: Object): string {
  if (!object) {
    return EMPTY_HASH;
  }

  let pairs = [];
  forOwn(object, (value, key) => {
    if (value !== undefined && value !== null) {
      pairs.push([key, value]);
    }
  });

  if (!pairs.length) {
    return EMPTY_HASH;
  }

  // Consistant key/value pair ordering
  pairs = sortBy(pairs, pair => pair[0]);

  // eslint-disable-next-line no-magic-numbers
  return crc32(JSON.stringify(pairs)).toString(16);
}
