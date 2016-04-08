import forEach from "lodash/forEach";
import isArray from "lodash/isArray";
import isObjectLike from "lodash/isObjectLike";

function compactArrayCore (obj: Array, ignore: Function): ?Array {
  let ret;
  forEach(obj, function (value) {
    // eslint-disable-next-line no-use-before-define
    const compactedValue = compact(value, ignore);
    if (compactedValue === undefined) {
      return;
    }

    if (ret) {
      ret.push(compactedValue);
    } else {
      ret = [compactedValue];
    }
  });
  return ret;
}

function compactObjectCore (obj: Object, ignore: Function): ?Object {
  let ret;
  forEach(obj, function (value, key) {
    // eslint-disable-next-line no-use-before-define
    let compactedValue = compact(value, ignore);
    if (compactedValue === undefined) {
      return;
    }

    if (!ret) {
      ret = {};
    }

    ret[key] = compactedValue;
  });
  return ret;
}

/**
 * Compact an object.
 *
 * @param obj
 * @param ignore
 * @returns
 */
export default function compact (obj: any, ignore: Function): any {
  if (ignore && ignore(obj)) {
    return;
  }

  // Array
  if (isArray(obj)) {
    return compactArrayCore(obj, ignore);
  }

  // Object
  if (isObjectLike(obj)) {
    return compactObjectCore(obj, ignore);
  }

  return obj;
}
