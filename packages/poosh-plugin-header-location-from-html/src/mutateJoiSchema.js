function getLocationSchema(Joi: Object) {
  return Joi.object({
    fromContent: Joi.boolean()
  });
}

/**
 * Mutate the validation schema.
 *
 * @param schema The Joi schema to mutate.
 * @param Joi The Joi object.
 */
export default function mutateJoiSchema(schema: Object, Joi: Object) {

  // eslint-disable-next-line no-underscore-dangle
  let eachSchema = Joi.reach(schema, "each")._inner.items[0];

  let headersSchema = Joi.reach(eachSchema, "headers");

  // eslint-disable-next-line no-underscore-dangle
  let locationChild = headersSchema._inner.children
    .find(child => child.key === "location");

  // Append a new location schema to the existing one
  locationChild.schema = Joi.alternatives().try(
    locationChild.schema,
    getLocationSchema(Joi)
  );
}
