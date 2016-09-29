/**
 * Append content infos that does not require buffer to be processed.
 */
export default function appendContentMeta(file, options) {
  file.content.type = options.gzip ? "gzip" : "raw";
}
