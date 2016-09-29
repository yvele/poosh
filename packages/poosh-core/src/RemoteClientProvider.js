import Joi from "joi";
import mapValues from "lodash/mapValues";
import PooshError from "poosh-common/lib/errors/PooshError";
import RemoteClientWrapper from "./readonly/RemoteClientWrapper";

const JOI_OPTIONS = {
  abortEarly  : false,
  convert     : false,
  noDefaults  : true
};

const remotePluginSchema = Joi.object({
  getStatus: Joi.func().required(),
  upload: Joi.func().required(),
  list: Joi.func().required(),
  pushDelete: Joi.func().required(),
  flushDelete: Joi.func().required(),
  getBaseDestination: Joi.func().required(),
  normalizeFileRemoteOptions: Joi.func().required()
}).unknown();

function validateRemoteClient(remoteClient: Object, plugin: Object) {
  let error = Joi.validate(remoteClient, remotePluginSchema, JOI_OPTIONS).error;
  if (error) {
    throw new PooshError(
      `Plugin "${plugin.id}" is invalid: getRemoteClient returned an invalid object ${error}`
    );
  }
}

/**
 * Initialize map.
 *
 * @param options Normalized options object.
 * @param readonly readonly mode.
 * @static
 * @private
 */
function getMap(options: Object): { [key: string]: Object } {
  let readonly = options.readonly.remote;
  return mapValues(options.remote, remoteOptions => {

    // Find first remote plugin that matches the remote type
    let type = remoteOptions.type;
    let plugin = options.plugins.remote[type];
    if (!plugin) {
      throw new PooshError(
        `No remote plugin found that matches remote type "${type}"`
      );
    }

    let remoteClient = plugin.getRemoteClient(remoteOptions);
    validateRemoteClient(remoteClient, plugin);

    return readonly ? new RemoteClientWrapper(remoteClient) : remoteClient;
  });
}

export default class RemoteClientProvider {

  _readonly: boolean;
  _map: { [key: string]: Object };

  /**
   * @param options Normalized options object.
   */
  constructor(options: Object) {
    this._readonly = options.readonly.remote;
    this._map = getMap(options);
  }

  /**
   * Get remote client from it's ID.
   *
   * @param id Remote ID.
   * @returns The remote client instance or null if not found.
   */
  get(id: string): Object {
    if (!id) {
      id = "default";
    }

    let remoteClient = this._map[id];
    if (!remoteClient) {
      throw new PooshError(
        `No remote options found that matches remote ID "${id}"`
      );
    }

    return remoteClient;
  }

  /**
   * Get all RemoteClient instances that are referenced in remote section of options.
   */
  getAll(): Array<Object> {
    return Object.values(this._map);
  }
}
