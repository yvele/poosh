import parseMs from "./parseMs";

/**
 * Parse seconds from a string or a number.
 *
 * @param value The value to parse.
 * @param path Option path from where the value come from. This value is used if error is thrown.
 * @returns Seconds as an integer.
 * @throws { InvalidOptions } Value cannot be parsed.
 */
export default function parseSeconds (value: number|string, path?: string): number {

  if (typeof value === "number") {
    return Math.floor(value);
  }

  if (typeof value === "string") {
    let sec = Number(value);
    if (!isNaN(sec)) {
      return Math.floor(sec);
    }
  }

  let ms = parseMs(value, path);
  return Math.floor(ms / 1000);
}
