import RemoteClient from "./RemoteClient";
import normalizeOptions from "./options/normalizeOptions";
import parseRemoteOptions from "./options/parseRemoteOptions";

/**
 * Initialize plugins object.
 *
 * @returns Plugins object.
 */
export function init() {
  return {
    remote: [{
      id: "s3",
      getRemoteClient: options => new RemoteClient(normalizeOptions(options))
    }],
    remoteString: [{
      id: "s3",
      parse: parseRemoteOptions
    }]
  };
}
