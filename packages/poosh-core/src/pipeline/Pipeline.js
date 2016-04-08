import appendCache from "./appendCache";
import appendContentBuffer from "./appendContentBuffer";
import appendContentMeta from "./appendContentMeta";
import appendDestination from "./appendDestination";
import appendHashes from "./appendHashes";
import appendHeaderContentLength from "./appendHeaderContentLength";
import appendHeaders from "./appendHeaders";
import appendLocalStatuses from "./appendLocalStatuses";
import appendRemote from "./appendRemote";
import appendSource from "./appendSource";
import appendStructure from "./appendStructure";

export default class Pipeline {

  _options: Object;
  _cache: Object;

  /**
   * @param options Normalized poosh options.
   */
  constructor (options: Object, cache: Object) {
    this._options = options;
    this._cache = cache;
  }

  /**
   * Process file. This method mutates file oject.
   *
   * @param file File object (that is gonna be mutated).
   * @param options File options.
   * @param remoteClient Remote Client.
   */
  async processFile (file: Object, options: Object, remoteClient: Object) {

    // 1. Basic informations
    appendStructure(file);
    await appendSource(file);
    appendDestination(file, remoteClient.getBaseDestination());
    await appendCache(file, this._cache);
    appendContentMeta(file, options);
    appendHeaders(file, options);
    appendRemote(file, options, remoteClient);

    // 2. Pipe plugins
    for (let plugin of this._options.plugins.pipe) {
      await plugin.process(file, options);
    }

    // 3. Meta informations
    appendHashes(file);
    appendLocalStatuses(file);

    // 4. Meta dependent informations
    await appendContentBuffer(file, remoteClient.rough,
      this._options.force.cache || this._options.force.remote);
    appendHeaderContentLength(file);
  }

}
