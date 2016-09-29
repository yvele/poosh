import extractLocation from "../lib/extractLocation";

/**
 * @param file File object.
 * @param options File options object.
 */
export default function process(file: Object, options: Object) {
  if (file.headers.values.location) {
    // location header already exists
    return;
  }

  if (!options.headers.location || !options.headers.location.fromContent) {
    // plugin should be explicitly enabled
    return;
  }

  let location = extractLocation(file.src.buffer);
  if (location) {
    file.headers.values.location = location;
  }
}
