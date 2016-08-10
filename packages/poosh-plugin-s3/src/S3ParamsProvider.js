import set from "lodash/set";
import pick from "lodash/pick";
import forOwn from "lodash/forOwn";
import joinUrl from "poosh-common/lib/url/join";
import parseMs from "poosh-common/lib/options/parseMs";
import RemoteStatus from "poosh-common/lib/file/RemoteStatus";
import { HEADERS_TO_PARAMS_MAP } from "./helpers/convertion";
import { FILE_REMOTE_TO_PARAMS_MAP } from "./helpers/convertion";

type RemoteOptions = {
  region: string,
  bucket: string,
  dir: string,
  endpoint: string,
  accessKeyId: string,
  secretAccessKey: string,
  maxRetries: number,
  proxy: string,
  timeout: number | string
};

const AS_IS_CONSTRUCTOR_OPTIONS = [
  "accessKeyId", "secretAccessKey", "region", "maxRetries"
];

/**
 * Append S3 headers params.
 *
 * @static
 * @private
 * @param params
 * @param headers
 * @returns Params.
 */
function appendParamsFromHeaders (params: Object, headers: Object): Object {
  if (!headers.values) {
    return;
  }

  forOwn(headers.values, (value, key) => {

    let paramKey = HEADERS_TO_PARAMS_MAP[key];
    if (!paramKey) {
      //TODO: Dedicated error
      throw new Error(`File option "headers.${key}" is not supported by S3`);
    }

    params[paramKey] = value;
  });

  return params;
}

/**
 * @static
 * @private
 * @param params
 * @param remote File remote options.
 * @returns Params.
 */
function appendParamsFromFileRemote (params: Object, remote: Object): Object {
  if (!remote.values) {
    return;
  }

  forOwn(remote.values, (value, key) => {

    let paramKey = FILE_REMOTE_TO_PARAMS_MAP[key];
    if (!paramKey) {
      //TODO: Dedicated error
      throw new Error(`File option "remote.${key}" is not supported by S3`);
    }

    params[paramKey] = value;
  });

  return params;
}

export default class S3ParamsProvider {

  _options: RemoteOptions;

  constructor (options: RemoteOptions) {
    this._options = options;
  }

  /**
   * Build S3 constructor options.
   *
   * @param options Remote options.
   * @returns S3 constructor options.
   */
  getConstructorOptions (): Object {
    let options = this._options;
    let ret = pick(options, AS_IS_CONSTRUCTOR_OPTIONS);

    // Bucket is set at constructor level
    ret.params = { Bucket: options.bucket };

    if (options.proxy) {
      set(ret, "httpOptions.proxy", options.proxy);
    }

    if (options.timeout) {
      set(ret, "httpOptions.timeout", parseMs(options.timeout, "remote.timeout"));
    }

    return ret;
  }

  /**
   * Build S3 headObject params.
   *
   * @param file
   * @returns Params.
   */
  getHeadObjectParams (file: Object): Object {
    return this.getParamsWithKey(file);
  }

  /**
   * Build S3 putObject params.
   *
   * @param file
   * @returns Params.
   */
  getPutObjectParams (file: Object): Object {
    let params = this.getParamsWithKey(file);
    appendParamsFromHeaders(params, file.headers);
    params.Body = file.content.buffer;
    appendParamsFromFileRemote(params, file.remote);
    return params;
  }

  /**
   * Build S3 listObjects params.
   *
   * @returns Params.
   */
  getListObjectsParams (): Object {
    const basePath = this._options.basePath;
    return basePath ? { Prefix: basePath } : {};
  }

  /**
   * Build S3 deleteObjects params.
   *
   * @param files
   * @returnss Params.
   */
  getDeleteObjectsParams (files: Array<Object>): Object {
    return {
      Delete: {
        Objects: files.map(file => this.getParamsWithKey(file))
      }
    };
  }

  /**
   * Build S3 copyObject params to make a self copy.
   *
   * @param file
   * @returns Params.
   */
  getSelfCopyObjectParams (file: Object): Object {
    let params = this.getParamsWithKey(file);

    // Self copy
    params.CopySource = this._options.bucket + "/" + params.Key;

    // Only append header params if something has changed
    if (file.dest.statusDetails.headers === RemoteStatus.Different) {
      appendParamsFromHeaders(params, file.headers);

      // ContentLength is not part of CopyObject params
      Reflect.deleteProperty(params, "ContentLength");

      // ContentType is considered a metadata
      // https://github.com/aws/aws-sdk-js/issues/1092
      if ("ContentType" in params) {
        params.MetadataDirective = "REPLACE";
      }
    }

    // Only append file-remote params if something has changed
    if (file.dest.statusDetails.remote === RemoteStatus.Different) {
      appendParamsFromFileRemote(params, file.remote);
    }

    return params;
  }

  /**
   * Build S3single item request params.
   *
   * @param file
   * @returns Params.
   */
  getParamsWithKey (file: Object): Object {
    return {
      Key: joinUrl(this._options.basePath, file.dest.relative)
    };
  }
}
