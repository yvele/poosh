import hashOptions from "../helpers/options/hash";

/**
 * Append content, headers and remote hashes.
 */
export default function appendHashes(file: Object) {

  file.content.hash = file.content.type === "gzip"
    ? file.src.md5 + "GZ"
    : file.src.md5;

  file.headers.hash = hashOptions(file.headers.values);
  file.remote.hash = hashOptions(file.remote.values);
}
