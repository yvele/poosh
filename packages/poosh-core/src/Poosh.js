import EventEmitter from "events";
import PooshError from "poosh-common/lib/errors/PooshError";
import RemoteStatus from "poosh-common/lib/file/RemoteStatus";
import LocalStatus from "poosh-common/lib/file/LocalStatus";
import ActionStatus from "poosh-common/lib/file/ActionStatus";
import GlobMatcher from "./helpers/GlobMatcher";
import FileProvider from "./FileProvider";
import RemoteClientProvider from "./RemoteClientProvider";
import LocalCache from "./LocalCache";
import CacheWrapper from "./readonly/CacheWrapper";
import shiftTuples from "./shiftTuples";
import Pipeline from "./pipeline/Pipeline";

/**
 * Get remote ID from file options.
 *
 * @param options File options.
 * @returns An ID as a string, or undefined if not set.
 * @static
 * @private
 */
function getFileRemoteId(options: Object): string {
  const { remote } = options;
  if (!remote) {
    return undefined;
  }

  return typeof remote === "string" ? remote : remote.id;
}

/**
 * @param options File options.
 * @returns The remote client instance.
 * @this Poosh
 * @private
 */
function getFileRemoteClient(options: Object): Object {
  const remoteId = getFileRemoteId(options) || "default";
  const remoteClient = this._remoteClientProvider.get(remoteId);
  if (!remoteClient) {
    throw new PooshError(
      `Unable to found remote options associated with ID "${remoteId}"`
    );
  }
  return remoteClient;
}

/**
 * @param task
 * @param files
 * @param done
 * @param total
 * @this Poosh
 * @private
 */
function emitProgress(task: string, files: Array, done: number, total: number) {

  /**
   * Progress event.
   *
   * @event Poosh#progress
   * @param task {string}
   * @param files {Array<Object>}
   * @param done {number}
   * @param total {number}
   */
  this.emit("progress", task, files, done, total);
}

/**
 * Handle deleted files.
 * @this Poosh
 * @private
 * @fires Poosh#progress
 */
function onDeleted(files: Array<Object>) {
  if (!files) {
    return;
  }

  this._cache.remove(files); // No await on purpose
  files.forEach((file) => {
    file.status = ActionStatus.Deleted;
  });
  this::emitProgress("delete", files, 0, 1);
}

/**
 * This method mutates file oject.
 *
 * @param file File object.
 * @param options File options.
 * @this Poosh
 * @private
 */
async function processFile(file: Object, options: Object) {

  // 0. Get remote client
  const remoteClient = this::getFileRemoteClient(options);

  // 1. Pipeline processing (basic informations + pipe plugins)
  await this._pipeline.processFile(file, options, remoteClient);

  // 2. Release memory pressure ASAP
  file.src.buffer = undefined;

  // 3. If we already know, from cache, that nothing has changed
  if (file.cache.status === LocalStatus.Unchanged && !this._options.force.cache) {
    file.content.buffer = undefined; // Release memory pressure ASAP
    file.status = ActionStatus.Unchanged;
    return;
  }

  // 4. Remote status
  if (!this._options.force.remote) {
    const status = await remoteClient.getStatus(file);
    file.dest.status = status.status;
    file.dest.statusDetails = status.statusDetails;
  }

  // 5. Remote upload
  if (file.dest.status !== RemoteStatus.Same) {
    await remoteClient.upload(file);
    file.status = file.dest.status === RemoteStatus.Missing
      ? ActionStatus.Created
      : ActionStatus.Updated;
  } else {
    file.status = ActionStatus.Identical;
  }

  // 6. Release memory pressure ASAP
  file.content.buffer = undefined;

  // 7. Add in cache (no await on purpose)
  this._cache.add(file);
}

/**
 * @param processedDestinations
 * @this Poosh
 * @private
 * @fires Poosh#progress
 */
async function deleteUnprocessedFiles(processedDestinations: Set<string>) {
  this::emitProgress("delete", null, 0, 1);

  // eslint-disable-next-line no-restricted-syntax
  for (const remoteClient of this._remoteClientProvider.getAll()) {
    // eslint-disable-next-line no-await-in-loop
    await remoteClient.list(async (file) => {

      // 0. Ignore
      const ignore = this._matcher.matchAny(file.dest.relative, this._options.ignore);
      if (ignore) {
        return; // Totally ignore
      }

      // 1. Has been processed
      const processed = processedDestinations.has(file.dest.absolute);
      if (processed) {
        return;
      }

      // 2. Deletion
      // eslint-disable-next-line no-await-in-loop
      const deleted = await remoteClient.pushDelete(file);
      this::onDeleted(deleted);

    });

    const deleted = await remoteClient.flushDelete();
    this::onDeleted(deleted);
  }

  this::emitProgress("delete", null, 1, 1);
}

/**
 * @this Poosh
 * @private
 * @returns Set of processed destinations.
 * @fires Poosh#progress
 */
async function uploadCore(): Set {

  // 1. Get and order source files
  const tuples = await this._fileProvider.getSorted(this._options.baseDir);
  const total = tuples.length;

  // 2. Upload files
  this::emitProgress("match", null, 0, total);

  // 3. Processing
  const processedDestinations = new Set();

  let current = 0;
  await shiftTuples(tuples, async (file, options) => {

    await this::processFile(file, options);
    processedDestinations.add(file.dest.absolute);
    this::emitProgress("match", [file], ++current, total);
  }, this._options.concurrency);

  return processedDestinations;
}

export default class Poosh extends EventEmitter {

  /**
   * @param options Normalized options.
   */
  constructor(options: Object) {
    super();

    this._options = options;

    this._matcher = new GlobMatcher();
    this._fileProvider = new FileProvider(options);
    this._remoteClientProvider = new RemoteClientProvider(options);

    let cache = new LocalCache();
    if (this._options.readonly.cache) {
      cache = new CacheWrapper(cache);
    }
    this._cache = cache;
    this._pipeline = new Pipeline(this._options, this._cache);
  }

  /**
   * Upload files.
   *
   * @fires Poosh#progress
   */
  async upload() {
    await this::uploadCore();
    this._cache.flush();
  }

  /**
   * Sync files.
   *
   * @fires Poosh#progress
   */
  async sync() {
    const processedDestinations = await this::uploadCore();
    await this::deleteUnprocessedFiles(processedDestinations);
    this._cache.flush();
  }

}
