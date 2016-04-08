import omit from "lodash/omit";

export default function appendRemote (file: Object, options: Object, remoteClient: Object) {

  if (options.remote) {
    file.remote.values = omit(options.remote, "id");
  }

  // Validation and normalization
  file.remote.values = remoteClient.normalizeFileRemoteOptions(file.remote.values);
}
