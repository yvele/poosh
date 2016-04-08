/**
 *
 */
export default async function appendCache (file: Object, cacheClient: Object) {

  let hashes = await cacheClient.get(file);
  if (hashes) {
    file.cache.content = hashes.content;
    file.cache.headers = hashes.headers;
    file.cache.remote = hashes.remote;
  }
}
