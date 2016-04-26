import Joi from "joi";
import PooshError from "poosh-common/lib/errors/PooshError";
import resolve from "poosh-common/lib/module/resolve";

const NAME_PREFIX = "poosh-plugin-";

const PLUGIN_SCHEMA = Joi.object({
  remote: Joi.array().items(Joi.object({
    id: Joi.string().trim().required(),
    getRemoteClient: Joi.func().required()
  })),
  remoteString: Joi.array().items(Joi.object({
    id: Joi.string().trim().required(),
    parse: Joi.func().required()
  })),
  pipe: Joi.array().items(Joi.object({
    id: Joi.string().trim().required(),
    process: Joi.func().required()
  })),
  cache: Joi.array().items(Joi.object({
    id: Joi.string().trim().required(),
    getCacheClient: Joi.func().required()
  })),
  validation: Joi.array().items(Joi.object({
    id: Joi.string().trim().required(),
    mutateJoiSchema: Joi.func().required()
  }))
});

const JOI_OPTIONS = {
  abortEarly  : false,
  convert     : false,
  noDefaults  : true
};

/**
 * Resole vand validate plugin.
 *
 * @param name Plugin name (can be specified with or without prefix).
 * @param dirname The directory where to resolve the plugin from.
 * @returns The plugin object.
 * @static
 * @private
 */
function resolvePlugin (name: string, dirname: string): Object {

  // Resolve with prefix first, then without if needed
  let pluginLoc = resolve(`${NAME_PREFIX}${name}`, dirname)
    || resolve(name, dirname);

  if (!pluginLoc) {
    throw new PooshError(
      `Unable to resolve plugin "${name}" within "${dirname}".`
    );
  }

  let initFunction = require(pluginLoc).init;
  if (typeof initFunction !== "function") {
    throw new PooshError(
      `Plugin "${name}" is invalid: It doesn't have an init function.`
    );
  }

  let plugin = initFunction();
  if (!plugin) {
    throw new PooshError(
      `Plugin "${name}" is invalid: Initialization has returned nothing.`
    );
  }

  let error = Joi.validate(plugin, PLUGIN_SCHEMA, JOI_OPTIONS).error;
  if (error) {
    throw new PooshError(
      `Plugin "${name}" is invalid: Init method has returned an invalid object ${error}`
    );
  }

  return plugin;
}

/**
 * Add a plugin from it's name.
 *
 * @param name Plugin name (can be specified with or without prefix).
 * @param dirname The directory where to resolve the plugin from.
 * @this PluginCollection
 * @private
 */
function addSingle (name: string, dirname: string) {

  let plugin = resolvePlugin(name, dirname);

  if (plugin.remote) {
    plugin.remote.forEach(p => this._plugins.remote[p.id] = p);
  }

  if (plugin.remoteString) {
    this._plugins.remoteString.push(...plugin.remoteString);
  }

  if (plugin.pipe) {
    this._plugins.pipe.push(...plugin.pipe);
  }

  if (plugin.cache) {
    plugin.remote.forEach(p => this._plugins.cache[p.id] = p);
  }

  if (plugin.validation) {
    this._plugins.validation.push(...plugin.validation);
  }
}

/**
 * Used to build the normalized option's "plugins" property.
 */
export default class PluginCollection {

  _plugins: Object;

  constructor () {
    this._plugins = {
      remote: {},
      remoteString: [],
      pipe: [],
      cache: {},
      validation: []
    };
  }

  /**
   * Add plugins from their names.
   *
   * @param names Plugin names (can be individually specified with or without prefix).
   * @param dirname The directory where to resolve the plugin from.
   * If not specified, cwd will be taken into account.
   */
  add (names: Array<string>, dirname: ?string) {
    if (!names || names.length === 0) {
      return;
    }

    dirname = dirname || process.cwd();
    names.forEach(name => this::addSingle(name, dirname));
  }

  get () {
    return this._plugins;
  }
}
