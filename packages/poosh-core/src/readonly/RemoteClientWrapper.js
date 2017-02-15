/**
 * Wrap a remote client in a read-only version.
 */
export default class RemoteClientWrapper {

  /**
   * @param inner Inner RemoteClient object to be wrapped.
   */
  constructor(inner: Object) {
    this._inner = inner;
  }

  get rough() {
    return this._inner.rough;
  }

  /**
   * @param file
   * @returns
   */
  async getStatus(file: Object): Object {
    return this._inner.getStatus(file);
  }

  /**
   *
   */
  async upload() {}

  /**
   * @param iteratee The function invoked per iteration.
   * Iteratee functions may exit iteration early by explicitly returning false.
   */
  async list(iteratee: Function) {
    await this._inner.list(iteratee);
  }

  /**
   * @param file
   * @returns Files that has been deleted. Or undefined if not.
   */
  async pushDelete(file: Object): Array<Object> {
    return [file];
  }

 /**
  * Flush remaining deletions.
  * @returns Files that has been deleted. Or undefined if not.
  */
  async flushDelete() {
    return null;
  }

  /**
   * This method doesn't make any request to remote host.
   */
  getBaseDestination(): string {
    return this._inner.getBaseDestination();
  }

  normalizeFileRemoteOptions(...args) {
    return this._inner.normalizeFileRemoteOptions(...args);
  }

}
