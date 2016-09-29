import forOwn from "lodash/forOwn";
import appendCacheControl from "./headers/appendCacheControl";
import appendContentEncoding from "./headers/appendContentEncoding";
import appendContentType from "./headers/appendContentType";

/**
 * Add raw headers defined as key=string in options.
 */
function appendRaw(file: Object, options: Object) {
  forOwn(options.headers, (value, key) => {
    if (typeof value === "string") {
      // Copy "as is" only when string
      file.headers.values[key] = value;
    }
  });
}

/**
 * @param file
 * @param options File options (normalized only with valid values).
 */
export default function appendHeaders(file: Object, options: Object) {

  if (options.headers) {
    appendRaw(file, options);
    appendCacheControl(file, options);
  }

  appendContentEncoding(file);
  appendContentType(file);
}
