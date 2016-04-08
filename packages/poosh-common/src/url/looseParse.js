import url from "url";
import trimStart from "lodash/trimStart";

/**
 * Loosely parse an URL that don't necessarily need a protocol part.
 *
 * @param value
 * @param defaultProtocol
 * @returns An URL object or nothing.
 */
export default function looseParse (value: string, defaultProtocol: ?string): Object {
  if (!value) {
    return;
  }

  let res = url.parse(value);
  return res.protocol
    ? res
    : url.parse((defaultProtocol || "http://") + trimStart(value, " :/"));
}
