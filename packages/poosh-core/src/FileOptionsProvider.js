import merge from "poosh-common/lib/options/merge";
import { isNullOrUndefined } from "poosh-common/lib/lang";
import GlobMatcher from "./helpers/GlobMatcher";

export default class FileOptionsProvider {

  constructor(options) {
    this.options = options;
    this.matcher = new GlobMatcher();
  }

  /**
   * Get matching options for a specific file.
   *
   * @param {string} fileName Relative file path.
   * @returns {Object} Matching file options
   */
  getOptions(fileName) {
    const { options, matcher } = this;

    // 0. Ignore
    if (matcher.matchAny(fileName, options.ignore)) {
      return undefined; // Totally ignore
    }

    // 1. Get applicable options for this file (no match defined, and options that matches)
    const optionsList = options.each.filter(
      item => isNullOrUndefined(item.match) || matcher.matchEvery(fileName, item.match)
    );

    // 2. Matching
    // No pattern means that options are applicable but does not count as a match
    const matches = optionsList.filter(item => !isNullOrUndefined(item.match)).length;
    if (matches < 1) {
      return undefined; // No matches
    }

    // 3. Merge applicable options
    const fileOptions = merge({}, ...optionsList);

    // 4. cleanup
    Reflect.deleteProperty(fileOptions, "match");

    return fileOptions;
  }

}
