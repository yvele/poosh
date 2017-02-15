import process from "./process";
import mutateJoiSchema from "./mutateJoiSchema";

const ID = "header-location-content";

/**
 * Initialize plugins object.
 *
 * @returns Plugins object.
 */
export function init() {
  return {
    pipe : [{ id: ID, process }],
    validation : [{ id: ID, mutateJoiSchema }]
  };
}
