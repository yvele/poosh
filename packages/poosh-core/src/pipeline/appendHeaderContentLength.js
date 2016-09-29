/**
 *
 */
export default function appendHeaderContentLength(file: Object) {

  let headerValues = file.headers.values;

  if (headerValues["content-length"]) {
    // Header has already been added
    return;
  }

  if (file.content.size !== undefined) {
    headerValues["content-length"] = file.content.size.toString();
  }
}
