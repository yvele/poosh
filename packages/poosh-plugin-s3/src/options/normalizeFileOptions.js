import Joi from "joi";
import PooshError from "poosh-common/lib/errors/PooshError";

const OPTIONS_SCHEMA = Joi.object().keys({
  acl : Joi.any().valid([
    "private",
    "public-read",
    "public-read-write",
    "authenticated-read",
    "aws-exec-read",
    "bucket-owner-read",
    "bucket-owner-full-control"
  ]),
  storageClass : Joi.any().valid([
    "STANDARD",
    "REDUCED_REDUNDANCY",
    "STANDARD_IA"])
});

const JOI_OPTIONS = {
  abortEarly  : false,
  convert     : false,
  noDefaults  : true
};

/**
 * Validate and normalize file's remote options.
 *
 * @param options
 * @returns Normalized file's remote options.
 */
export default function normalizeFileOptions(options: Object) {

  options = Object.assign({}, options);

  // Default
  if (!options.acl) {
    options.acl = "public-read";
  }

  const error = Joi.validate(options, OPTIONS_SCHEMA, JOI_OPTIONS).error;
  if (error) {
    throw new PooshError(`Invalid file's remote S3 options: ${error}`);
  }

  return options;
}
