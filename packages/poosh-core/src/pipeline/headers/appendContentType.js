import mime from "mime";

export default function appendContentType(file) {

  if (file.headers.values["content-type"]) {
    // Value already exists
    return;
  }

  // Get directives from file extension
  const mimeType = mime.lookup(file.src.relative);
  const charset = mime.charsets.lookup(mimeType);

  let contentType;
  if (charset) {
    contentType = `${mimeType}; charset=${charset.toLowerCase()}`;
  } else {
    contentType = mimeType;
  }

  file.headers.values["content-type"] = contentType;
}
