/**
 * Default empty properties.
 */
export default function appendStructure (file: Object) {
  file.dest = {};
  file.content = {};
  file.remote = { values: {} };
  file.headers = { values: {} };
  file.cache = {};
}
