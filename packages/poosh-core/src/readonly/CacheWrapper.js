/**
 * Wrap a cache instance in a read-only version.
 */
export default class CacheWrapper {

  /**
   * @param inner Inner Cache object to be wrapped.
   */
  constructor(inner: Object) {
    this._inner = inner;
  }

  /**
   * Get file hashes from cache.
   *
   * @param file
   * @returns Hashes (content, headers and remote).
   */
  async get(file: Object): ?Object {
    await this._inner.get(file);
  }

  /**
   * @param file
   */
  async add() {}

  /**
   *
   */
  flush() {}

  /**
   * @param files
   * @returns Number of removed items.
   * @this LocalCache
   * @private
   */
  async remove(): number {
    return 0;
  }

}
