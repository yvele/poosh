import get from "lodash/get";
import parseSeconds from "poosh-common/lib/options/parseSeconds";

function addCacheableDirective(directives, params) {
  if (params.cacheable) {
    directives.push(params.cacheable);
  }
}

function addMaxAgeDirective(directives, params) {
  if (params.maxAge) {
    const maxAge = parseSeconds(params.maxAge, "headers.cache-control.maxAge");
    directives.push(`max-age=${maxAge}`);
  }
}

function addNoTransformDirective(directives, params) {
  if (params.noTransform) {
    directives.push("no-transform");
  }
}

function addImmutableDirective(directives, params) {
  if (params.immutable) {
    directives.push("immutable");
  }
}

/**
 * @param file
 * @param options File options (normalized only with valid values).
 */
export default function appendCacheControl(file, options) {

  if (file.headers.values["content-encoding"]) {
    // Value already exists
    return;
  }

  const params = get(options, "headers.cache-control");
  if (!params) {
    return;
  }

  const directives = [];
  addMaxAgeDirective(directives, params);
  addCacheableDirective(directives, params);
  addNoTransformDirective(directives, params);
  addImmutableDirective(directives, params);

  if (directives.length > 0) {
    file.headers.values["cache-control"] = directives.join(", ");
  }
}
