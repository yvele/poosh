import compactObject from "../object/compact";

function ignore(value: any) {
  return value === null;
}

/**
 * Deeply remove all useless values from an options object.
 *
 * @param options
 * @returns
 */
export default function compact(options: Object): Object {
  return compactObject(options, ignore) || {};
}
