import path from "path";
import fs from "fs";
import json5 from "json5";
import findup from "findup-sync";
import PooshError from "poosh-common/lib/errors/PooshError";
import merge from "poosh-common/lib/options/merge";
import pushNonFalsy from "poosh-common/lib/array/pushNonFalsy";
import OptionValidator from "./OptionValidator";
import PluginCollection from "./helpers/options/PluginCollection";

const CONF_FILENAME = ".poosh.json5";

/**
 * Normalize readonly and force options objects.
 *
 * @param value Raw options.
 * @return Normalized options.
 * @static
 * @private
 */
function normalizeCacheRemote (value: Object|boolean): Object {
  if (value === true || !value) {
    return { cache: !!value, remote: !!value };
  }

  return value;
}

/**
 * @param value Raw remote options.
 * @param remoteStringPlugins Remote string plugins.
 * @return Normalized remote options.
 * @throws PooshError If unable to parse string.
 */
function normalizeRemote (value: Object|string, remoteStringPlugins: Array): Object {

  // Parse string with plugins
  if (typeof value === "string") {

    let parsed = remoteStringPlugins.reduce(
      (prev, plugin) => pushNonFalsy(plugin.parse(value), prev),
      null
    );

    if (!parsed || parsed.length === 0) {
      throw new PooshError(`Invalid options: Unable to parse remote string "${value}"`);
    }

    return { "default": parsed[0] };
  }

  // Single default object
  if (value.type) {
    return { "default": value };
  }

  return value;
}

export default class OptionManager {

  _options: Object;
  _plugins: PluginCollection;

  constructor () {
    this._options = { plugins: [] };
    this._plugins = new PluginCollection();
  }

  /**
   * Add raw options.
   *
   * @param rawOpts Raw options.
   * @param dirname Directory name (used to resolve plugins relative to it).
   * @returns Poosh
   */
  addOptions (rawOpts?: Object, dirname?: string) {
    if (!rawOpts) {
      return this;
    }

    this._plugins.add(rawOpts.plugins, dirname);
    merge(this._options, rawOpts);
    return this;
  }

  /**
   * Add a JSON configuration file.
   *
   * @param location File location. Can be either relative or absolute.
   * @returns Poosh
   */
  addConfigFile (location?: string) {

    //TODO: Dedicated function!
    if (!location) {
      location = findup(CONF_FILENAME, {
        cwd: process.cwd(),
        nocase: true
      });

      if (!location) {
        throw new PooshError("Configuration file not found");
      }
    }

    let content = fs.readFileSync(location, "utf8");
    let rawOpts;

    try {
      rawOpts = json5.parse(content);
    } catch (err) {

      // TODO: Dedicated PooshError with inner error
      err.message = `${location}: Error while parsing JSON - ${err.message}`;
      throw err;
    }

    let dirname = path.dirname(location);

    this.addOptions(rawOpts, dirname);
    return this;
  }

  /**
   * Get normalized options, ready to use for Poosh constructor.
   * @returns Normalized and validated options.
   * @throws Error
   */
  getNormalized (): Object {

    let plugins = this._plugins.get();

    // Clone merged raw options
    let options = Object.assign({}, this._options);

    // Make sure MERGED raw options are valid
    let error = OptionValidator.validateSync(options, plugins);
    if (error) {
      // TODO: Throw a custom error (eg OptionValidationError)
      throw error;
    }

    // Default values
    if (!options.concurrency) {
      options.concurrency = 3;
    }

    // Normalization
    options.plugins = plugins;
    options.readonly = normalizeCacheRemote(options.readonly);
    options.force = normalizeCacheRemote(options.force);
    options.remote = normalizeRemote(options.remote, options.plugins.remoteString);

    return options;
  }
}
