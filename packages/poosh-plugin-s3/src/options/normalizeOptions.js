import Joi from "joi";
import parseMs from "poosh-common/lib/options/parseMs";
import PooshError from "poosh-common/lib/errors/PooshError";
import parseRemoteOptions from "./parseRemoteOptions";

const stringTrim = Joi.string().trim();

/** 3 minutes */
const DEFAULT_TIMEOUT = 180000;

const OPTIONS_SCHEMA = Joi.object().keys({
  type: Joi.string().valid("s3"),

  region: stringTrim,
  bucket: stringTrim,
  basePath: stringTrim,

  absolute: stringTrim,

  accessKeyId: stringTrim,
  secretAccessKey: stringTrim,

  maxRetries: Joi.number().integer().positive(),

  proxy: stringTrim.uri(),
  timeout: [stringTrim, Joi.number().integer().positive()]
});

const JOI_OPTIONS = {
  abortEarly  : false,
  convert     : false,
  noDefaults  : true
};

/**
 * Validate and normalize options.
 *
 * @param options
 * @returns Normalized options.
 */
export default function normalizeOptions(options: Object) {

  options = Object.assign({}, options);

  let error = Joi.validate(options, OPTIONS_SCHEMA, JOI_OPTIONS).error;
  if (error) {
    throw new PooshError(`Invalid S3 options: ${error}`);
  }

  if (options.timeout) {
    options.timeout = parseMs(options.timeout);
  } else {
    options.timeout = DEFAULT_TIMEOUT;
  }

  if (options.absolute) {
    let parsed = parseRemoteOptions(options.absolute);
    if (!parsed) {
      throw new PooshError(
        `Invalid S3 options: absolute value "${options.absolute}" cannot be parsed`
      );
    }

    Object.assign(options, parsed);
  }

  return options;
}
