export default function appendContentEncoding(file) {

  if (file.headers.values["content-encoding"]) {
    // Value already exists
    return;
  }

  if (file.content.type === "gzip") {
    file.headers.values["content-encoding"] = "gzip";
  }
}
