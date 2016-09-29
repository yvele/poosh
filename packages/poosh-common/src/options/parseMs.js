import ms from "ms";
import InvalidOptions from "../errors/InvalidOptions";

/**
 * Parse milliseconds from a string or a number.
 *
 * @param value The value to parse.
 * @param path Option path from where the value come from. This value is used if error is thrown.
 * @returns Milliseconds as an integer.
 * @throws { InvalidOptions } Value cannot be parsed.
 */
export default function parseMs(value: number|string, path?: string): number {

  if (typeof value === "number") {
    // TODO: Throw if NaN or someting strange..

    // Value already is milliseconds
    return Math.floor(value);
  }

  const parsed = ms(value);
  if (typeof parsed === "undefined") {
    throw new InvalidOptions(
      `Failed to parse "${path}" option. Value "${value}" is invalid.`
    );
  }

  return parsed;
}
