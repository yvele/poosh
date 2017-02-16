/* eslint-disable no-magic-numbers */
import Joi from "joi";

const JOI_OPTIONS = {
  abortEarly  : false,
  convert     : false,
  noDefaults  : true
};

/**
 * @return Joi Schema.
 */
function createSchema(): Object {
  const stringTrim = Joi.string().trim();
  const stringTrimNull = stringTrim.allow(null);

  const headersSchema = Joi.object({
    "content-disposition" : stringTrimNull,
    "content-encoding"    : stringTrimNull,
    "content-language"    : stringTrimNull,
    "content-length"      : Joi.number().allow(null),
    "content-md5"         : stringTrimNull,
    "content-type"        : stringTrimNull,
    expires               : stringTrimNull,
    location              : stringTrimNull.uri(),
    "cache-control"       : [stringTrimNull,
      Joi.object({
        maxAge      : [stringTrimNull, Joi.number().integer().positive()],
        cacheable   : stringTrimNull.valid("public", "private", "no-cache"),
        noTransform : Joi.boolean(),
        immutable   : Joi.boolean()
      })
    ]
  });

  /* const remoteSchema = Joi.object().pattern(/^[a-z0-9]+$/i, Joi.object({
    type: stringTrim.required(),
    basePath: stringTrim
  }).unknown());*/

  const remoteSchema = Joi.object({
    type      : stringTrim.required(),
    basePath  : stringTrim
  }).unknown();

  const schema = Joi.object({
    plugins : Joi.array().unique().items(
      // https://docs.npmjs.com/files/package.json
      stringTrim.lowercase().min(1).max(214).required()
    ),

    baseDir : stringTrim.required(),

    remote : Joi.alternatives().try(
      stringTrim,
      remoteSchema,
      Joi.object().pattern(/^[a-z0-9]+$/i, remoteSchema)
    ).required(),

    concurrency : Joi.number().integer().positive().min(1),

    readonly : [Joi.boolean(), Joi.object({
      cache   : Joi.boolean(),
      remote  : Joi.boolean()
    })],

    force : [Joi.boolean(), Joi.object({
      cache   : Joi.boolean(),
      remote  : Joi.boolean()
    })],

    cache : Joi.object({
      type      : stringTrim,
      location  : stringTrim,
      file      : stringTrim
    }).unknown(),

    // For each local files that matches
    each : Joi.array().items(Joi.object({
      match    : [
        stringTrim,
        Joi.array().items(stringTrim)
      ],
      priority : Joi.number().allow(null),
      gzip     : Joi.boolean(),
      headers  : headersSchema,
      remote   : [
        stringTrimNull,
        Joi.object({ id: stringTrim }).unknown()
      ]
    })).required(),

    // Ignore locations where files cannot be added, updated or deleted
    ignore : Joi.alternatives().try(
      stringTrim,
      Joi.array().items(stringTrim)
    )

  }).with("plugins", "baseDir", "remote", "each");

  return schema;
}

/**
 * @static
 * @private
 */
function convertError(joiError: Object) {
  return joiError
    ? joiError.details.map(detail => `${detail.path}: ${detail.message}`)
    : undefined;
}

export default class OptionValidator {

  /* static async validate (options) {
    return await Joi.validateAsync(options, schema, JOI_OPTIONS);
  }*/

  /**
   * @param options Raw options.
   * @param plugins
   * @returns Error if validation failed.
   */
  static validateSync(options: Object, plugins: Object): ?Object {

    // 1. Get a brand new schema
    const schema = createSchema();

    // 2. Allow plugins to modify the schema
    plugins.validation.forEach(plugin => plugin.mutateJoiSchema(schema, Joi));

    // 3. Validation
    const error = Joi.validate(options, schema, JOI_OPTIONS).error;
    return convertError(error);
  }

}
