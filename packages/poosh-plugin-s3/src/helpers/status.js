import mapKeys from "lodash/mapKeys";
import isEqual from "lodash/isEqual";
import pick from "lodash/pick";
import RemoteStatus from "poosh-common/lib/file/RemoteStatus";
import compactOptions from "poosh-common/lib/options/compact";
import { HEADERS_TO_PARAMS_MAP, etagToMd5 } from "./convertion";

const HEADERS_PARAMS = Object.values(HEADERS_TO_PARAMS_MAP);

function isUndefinedOrNull (value: any): boolean {
  return value === undefined || value === null;
}

function sameToStatus (same: boolean) {
  return same ? RemoteStatus.Same : RemoteStatus.Different;
}

export function isSameContent (file: Object, data: Object): boolean {
  return file.content.md5 === etagToMd5(data.ETag);
}

export function areSameHeaders (file: Object, data: Object): boolean {
  let fileHeaders = mapKeys(file.headers.values,
    (value, key) => HEADERS_TO_PARAMS_MAP[key]);

  let dataHeaders = pick(data, HEADERS_PARAMS);

  return isEqual(compactOptions(fileHeaders), compactOptions(dataHeaders));
}

export function isSameRemote (file: Object, data: Object): boolean {
  // ACL is ignored because headObject doesn't return ACL
  // and getObjectAcl is not (yet?) handled
  return isUndefinedOrNull(file.remote.values.storageClass)
    && isUndefinedOrNull(data.StorageClass)
    || file.remote.values.storageClass === data.StorageClass;
}

/**
 * @param file
 * @param data S3 results of an head query.
 * @returns Status details object.
 */
export function getStatusDetails (file: Object, data: Object): Object {
  return {
    content: sameToStatus(isSameContent(file, data)),
    headers: sameToStatus(areSameHeaders(file, data)),
    remote: sameToStatus(isSameRemote(file, data))
  };
}
