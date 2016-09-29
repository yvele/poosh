import micromatch from "micromatch";

/**
 * Check that a file name matches a glob pattern.
 *
 * @param fileName File name to check.
 * @param pattern Glob pattern.
 * @returns True if the file name pattern the pattern. Otherwise false.
 * @this GlobMatcher
 * @private
 */
function checkSingle(fileName: string, pattern: string): boolean {

  // Cache the micropatch "pattern parsing"
  let isMatch = this._cache[pattern];
  if (!isMatch) {
    isMatch = micromatch.matcher(pattern);
    this._cache[pattern] = isMatch;
  }

  return isMatch(fileName);
}

/**
 * A glob matcher with cache.
 */
export default class GlobMatcher {

  _cache: Object;

  constructor() {
    this._cache = {};
  }

  /**
   * Check that a file name matches some glob patterns.
   *
   * @param fileName File name to check.
   * @param patterns Glob patterns.
   * @returns True if the file name matches all the provided patterns. Otherwise false.
   */
  check(fileName: string, patterns: Array<string> | string): boolean {
    return Array.isArray(patterns)
      ? patterns.every(pattern => this::checkSingle(fileName, pattern))
      : this::checkSingle(fileName, patterns);
  }
}
