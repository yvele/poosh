import path from "path";

const SEP = path.sep;

/**
 * Convert a path name to an URL.
 */
export default function fromPath(pathName?: string): ?string {
  if (!pathName) {
    return pathName;
  }

  // Sometimes path separator is something else ¯\(ツ)/¯
  return SEP !== "/"
    ? pathName.split(SEP).join("/")
    : pathName;
}
