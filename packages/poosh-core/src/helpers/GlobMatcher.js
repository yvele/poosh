import micromatch from "micromatch";

/**
 * A glob matcher with cache.
 */
export class GlobMatcher {

  _cache: Object;

  constructor () {
    this._cache = {};
  }

  /**
   * Check that a file name match a glob pattern.
   *
   * @param fileName File name to check.
   * @param match Glob pattern.
   * @returns True if the file name match the pattern. Otherwise false.
   */
  check (fileName: string, match: string): boolean {

    // Cache the micropatch pattern parsing
    let isMatch = this._cache[match];
    if (!isMatch) {
      isMatch = micromatch.matcher(match);
      this._cache[match] = isMatch;
    }

    return isMatch(fileName);
  }
}
