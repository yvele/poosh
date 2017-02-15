import LocalStatus from "poosh-common/lib/file/LocalStatus";

/**
 * Get local status based on cache.
 */
function getStatus(localHash: string, cacheHash: ?string): string {
  if (!cacheHash) {
    return LocalStatus.New;
  }

  return localHash === cacheHash
    ? LocalStatus.Unchanged
    : LocalStatus.Changed;
}

/**
 * Get cache status from local items (content, headers, remote).
 */
function getCacheStatus(file: Object): string {
  return [
    file.content.status,
    file.headers.status,
    file.remote.status
  ].reduce((prev, cur) => {
    const unchanged = cur === prev && (prev === LocalStatus.New || prev === LocalStatus.Unchanged);
    return unchanged ? prev : LocalStatus.Changed;
  });
}

/**
 * Append content, headers and remote local statuses.
 */
export default function appendLocalStatuses(file: Object) {
  file.content.status = getStatus(file.content.hash, file.cache.content);
  file.headers.status = getStatus(file.headers.hash, file.cache.headers);
  file.remote.status = getStatus(file.remote.hash, file.cache.remote);
  file.cache.status = getCacheStatus(file);
}
