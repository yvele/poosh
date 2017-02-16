import micromatch from "micromatch";
import { isNullOrUndefined } from "poosh-common/lib/lang";

/**
 * A glob matcher with cache.
 */
export default class GlobMatcher {

  constructor() {
    /** @private */
    this.cache = {};
  }

  /**
   * Check that a file name matches a glob pattern.
   *
   * @param {string} fileName The file path to test
   * @param {string} pattern A single glob pattern
   * @returns {boolean} True if the file path matches given pattern
   */
  matchSingle(fileName, pattern) {
    if (!pattern) {
      return false;
    }

    // Cache the micropatch "pattern parsing"
    let isMatch = this.cache[pattern];
    if (!isMatch) {
      isMatch = micromatch.matcher(pattern);
      this.cache[pattern] = isMatch;
    }

    return isMatch(fileName);
  }

  /**
   * Returns true if a file path matches every given patterns
   *
   * @param {string} fileName The file path to test
   * @param {string|Array} patterns One or more glob patterns
   * @returns {boolean} True if the file path matches every given patterns
   */
  matchEvery(fileName, patterns) {
    if (isNullOrUndefined(patterns)) {
      return false;
    }

    return Array.isArray(patterns)
      ? patterns.every(pattern => this.matchSingle(fileName, pattern))
      : this.matchSingle(fileName, patterns);
  }

  /**
   * Returns true if a file path matches any of the given patterns
   *
   * @param {string} fileName The file path to test
   * @param {string|Array} patterns One or more glob patterns
   * @returns {boolean} True if the file path matches any of the given patterns
   */
  matchAny(fileName, patterns) {
    if (isNullOrUndefined(patterns)) {
      return false;
    }

    return Array.isArray(patterns)
      ? patterns.some(pattern => this.matchSingle(fileName, pattern))
      : this.matchSingle(fileName, patterns);
  }

}
