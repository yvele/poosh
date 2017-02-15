import mergeWith from "lodash/mergeWith";
import union from "lodash/union";

function customizer(destValue, srcValue) {
  if (srcValue && Array.isArray(destValue)) {
    // Concat arrays and remove duplicates
    return union(destValue, srcValue);
  }

  // Merging is handled by the mergeWith method
  return undefined;
}

/**
 * Merge an options object with another one.
 * Array values are contatened and duplicates will be removed.
 *
 * @param dest Destination options object.
 * @param src Source options object.
 * @returns Destination object.
 */
export default function merge(dest?: Object, ...src?: Object): ?Object {
  if (!dest || !src) {
    return dest;
  }

  return mergeWith(dest, ...src, customizer);
}
