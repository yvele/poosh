/**
 * Push a value to an array only if the value is non falsy.
 * Array is optional as a new one will be created if the value is non falsy.
 *
 * @param value
 * @param array Optional array. If not specified it will be created.
 * @returns Array
 */
export default function pushNonFalsy (value: any, array: ?Array): ?Array {
  if (value) {
    array = array || [];
    array.push(value);
  }

  return array;
}
