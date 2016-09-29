import forEach from "lodash/forEach";

/**
 * Deeply replace all null values with undefined from an object's properties.
 *
 * @param object Object options. Object will be mutated.
 * @returns Object.
 */
export default function nullsToUndefined(object: Object) {
  if (object === undefined) {
    return object;
  }

  forEach(object, (value, key) => {
    if (value === null) {
      // Set null to undefined to "remove" it
      object[key] = undefined;
    } else if (typeof value === "object") {
      // Recursivity
      nullsToUndefined(value);
    }
  });

  return object;
}
