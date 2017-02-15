import trim from "lodash/trim";

const TRIM_CHARS = "/ ";

/**
 * Join parts of an URL.
 */
export default function join(...parts: Array<string>) {
  if (!parts || parts.length === 0) {
    return undefined;
  }

  return parts
    .filter(Boolean)
    .map(part => trim(part, TRIM_CHARS))
    .join("/");
}
